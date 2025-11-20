import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";

interface SecurityAdminRouteProps {
  children: ReactNode;
}

/**
 * Protected route component for Security Admin Portal
 * 
 * Ensures only authenticated security-admin users can access
 * security admin routes. Patients and regular admins are blocked.
 */
const SecurityAdminRoute = ({ children }: SecurityAdminRouteProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("security-admin-authenticated");
    
    if (!isAuthenticated) {
      navigate("/security-admin/login");
    }
  }, [navigate]);

  const isAuthenticated = sessionStorage.getItem("security-admin-authenticated");
  
  if (!isAuthenticated) {
    return null; // Will redirect
  }

  return <>{children}</>;
};

export default SecurityAdminRoute;

