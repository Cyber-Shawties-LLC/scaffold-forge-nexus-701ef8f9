import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

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
      console.log('Attempting login via edge function proxy');
      
      const { data, error } = await supabase.functions.invoke('wazuh-proxy', {
        body: { 
          username, 
          password,
          path: '/api/login'
        },
      });

      if (error) {
        console.error('Login failed:', error);
        throw new Error('Invalid credentials or server error');
      }

      // Check if the proxy returned an error response
      if (data.success === false) {
        console.error('Wazuh API error:', data);
        if (data.status === 401) {
          throw new Error('Invalid credentials. Please check your username and password.');
        }
        throw new Error(data.message || 'Authentication failed');
      }

      // Extract token from successful response
      const token = data.data?.token || data.data?.auth_token || data.token;
      
      if (!token) {
        console.error('No token in response:', data);
        throw new Error('No authentication token received from server');
      }

      setAuthToken(token);
      setUsername(username);
      setIsAuthenticated(true);
      
      // Store in localStorage
      localStorage.setItem('securityAuthToken', token);
      localStorage.setItem('securityUsername', username);
    } catch (err: any) {
      console.error('Login error:', err);
      
      if (err.message === 'Failed to fetch' || err.name === 'TypeError') {
        throw new Error('Cannot connect to AWS backend. Please verify:\n1. VITE_WAZUH_API_URL is set correctly in .env\n2. Backend is running and accessible\n3. CORS is properly configured on the backend');
      }
      
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

