// PrivateRoute.tsx
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

//props type for PrivateRoute
interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
