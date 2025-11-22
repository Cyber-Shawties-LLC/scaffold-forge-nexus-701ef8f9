import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

// Utility function to log security admin actions
const logSecurityAudit = async (
  username: string,
  actionType: string,
  status: string,
  metadata?: Record<string, any>
) => {
  try {
    await supabase.from('security_audit_logs').insert({
      username,
      action_type: actionType,
      resource_path: '/security-admin',
      status,
      ip_address: 'client-side',
      user_agent: navigator.userAgent,
      metadata
    });
  } catch (error) {
    console.error('Failed to log security audit:', error);
  }
};

interface SecurityAuthContextType {
  isAuthenticated: boolean;
  authToken: string | null;
  username: string;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  setAuthToken: (token: string | null) => void;
  setIsAuthenticated: (value: boolean) => void;
}

const SecurityAuthContext = createContext<SecurityAuthContextType | undefined>(undefined);

export const SecurityAuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Check for stored auth token on mount
    const storedToken = localStorage.getItem("securityAuthToken");
    const storedUsername = localStorage.getItem("securityUsername");
    if (storedToken && storedUsername) {
      setAuthToken(storedToken);
      setUsername(storedUsername);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      // -------------------------------------------
      // 🔥 DEV OVERRIDE: always accept admin/admin
      // -------------------------------------------
      if (username === "admin" && password === "admin") {
        console.log("Using local admin override");

        setAuthToken("local-dev-token");
        setUsername("admin");
        setIsAuthenticated(true);

        localStorage.setItem("securityAuthToken", "local-dev-token");
        localStorage.setItem("securityUsername", "admin");

        // Log successful login
        await logSecurityAudit("admin", "LOGIN", "SUCCESS", {
          method: "local-override"
        });

        return; // Skip backend entirely
      }

      // -------------------------------------------
      // 🔥 Otherwise continue with backend login
      // -------------------------------------------
      console.log("Attempting login via edge function proxy");

      const { data, error } = await supabase.functions.invoke("wazuh-proxy", {
        body: {
          username,
          password,
          path: "/security/user/authenticate",
        },
      });

      if (error) {
        console.error("Login failed:", error);
        throw new Error("Invalid credentials or server error");
      }

      if (data.success === false) {
        console.error("Wazuh API error:", data);
        if (data.status === 401) {
          throw new Error("Invalid credentials. Please check your username and password.");
        }
        throw new Error(data.message || "Authentication failed");
      }

      // Extract token
      const token = data.data?.token || data.data?.auth_token || data.token;

      if (!token) {
        console.error("No token in response:", data);
        throw new Error("No authentication token received from server");
      }

      setAuthToken(token);
      setUsername(username);
      setIsAuthenticated(true);

      localStorage.setItem("securityAuthToken", token);
      localStorage.setItem("securityUsername", username);

      // Log successful login
      await logSecurityAudit(username, "LOGIN", "SUCCESS", {
        method: "wazuh-api"
      });
    } catch (err: any) {
      console.error("Login error:", err);

      // Log failed login attempt
      await logSecurityAudit(username, "LOGIN", "FAILURE", {
        error: err.message,
        method: "wazuh-api"
      });

      if (err.message === "Failed to fetch" || err.name === "TypeError") {
        throw new Error(
          "Cannot connect to AWS backend. Please verify:\n" +
            "1. VITE_WAZUH_API_URL is set correctly in .env\n" +
            "2. Backend is running and accessible\n" +
            "3. CORS is properly configured",
        );
      }

      throw new Error(err.message || "Login failed. Please try again.");
    }
  };

  const logout = async () => {
    const currentUsername = username;

    // Log logout
    if (currentUsername) {
      await logSecurityAudit(currentUsername, "LOGOUT", "SUCCESS", {});
    }

    setAuthToken(null);
    setUsername("");
    setIsAuthenticated(false);
    localStorage.removeItem("securityAuthToken");
    localStorage.removeItem("securityUsername");
  };

  return (
    <SecurityAuthContext.Provider
      value={{
        isAuthenticated,
        authToken,
        username,
        login,
        logout,
        setAuthToken,
        setIsAuthenticated,
      }}
    >
      {children}
    </SecurityAuthContext.Provider>
  );
};

export const useSecurityAuth = () => {
  const context = useContext(SecurityAuthContext);
  if (context === undefined) {
    throw new Error("useSecurityAuth must be used within a SecurityAuthProvider");
  }
  return context;
};
