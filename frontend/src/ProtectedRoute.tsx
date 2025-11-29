import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = useAuthStore((state) => state.token);

  if (!token) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

export default PrivateRoute;
