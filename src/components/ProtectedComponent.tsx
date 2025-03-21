import { getAuthToken } from "@/utils/auth";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router";

interface ProtectedRouteProps {
  redirectPath?: string;
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectPath = "/",
  children,
}) => {
  const location = useLocation();
  const isUserAuthenticated = getAuthToken();

  if (!isUserAuthenticated) {
    return (
      <Navigate 
        to={redirectPath} 
        state={{ from: location.pathname }} 
        replace 
      />
    );
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;