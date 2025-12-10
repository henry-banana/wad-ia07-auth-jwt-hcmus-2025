import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { LoadingSpinner } from "./ui/LoadingSpinner";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return <LoadingSpinner size="lg" text="Đang kiểm tra xác thực..." fullScreen />;
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Role-based access control
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = user?.role || "USER";
    if (!allowedRoles.includes(userRole)) {
      // User doesn't have required role - redirect to dashboard or unauthorized page
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <Outlet />;
}