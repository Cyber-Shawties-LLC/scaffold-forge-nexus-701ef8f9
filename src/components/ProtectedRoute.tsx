import { Navigate } from 'react-router-dom';
import { useSecurityAuth } from '@/contexts/SecurityAuthContext';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useSecurityAuth();

  if (!isAuthenticated) {
    return <Navigate to="/security-admin/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

