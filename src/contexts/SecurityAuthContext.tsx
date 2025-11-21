import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Check for stored auth token on mount
    const storedToken = localStorage.getItem('securityAuthToken');
    const storedUsername = localStorage.getItem('securityUsername');
    if (storedToken && storedUsername) {
      setAuthToken(storedToken);
      setUsername(storedUsername);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const WAZUH_API_URL = import.meta.env.VITE_WAZUH_API_URL || 'https://api.uminur.app/wazuh';
      
      const response = await fetch(`${WAZUH_API_URL}/api/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'osd-xsrf': 'true',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      const token = data.data?.token || data.token;
      
      if (!token) {
        throw new Error('No token received from server');
      }

      setAuthToken(token);
      setUsername(username);
      setIsAuthenticated(true);
      
      // Store in localStorage
      localStorage.setItem('securityAuthToken', token);
      localStorage.setItem('securityUsername', username);
    } catch (err: any) {
      throw new Error(err.message || 'Login failed. Please try again.');
    }
  };

  const logout = () => {
    setAuthToken(null);
    setUsername('');
    setIsAuthenticated(false);
    localStorage.removeItem('securityAuthToken');
    localStorage.removeItem('securityUsername');
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
    throw new Error('useSecurityAuth must be used within a SecurityAuthProvider');
  }
  return context;
};

