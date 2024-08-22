import React from "react";
import { Navigate } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

type PrivateRouteProps = {
  children: JSX.Element;
  requiredRole?: string;
};

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  requiredRole,
}) => {
  const auth = useAuthUser<{ role: string }>();

  if (!auth) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && auth.role !== requiredRole) {
    return <Navigate to="/access-denied" />;
  }

  return children;
};
