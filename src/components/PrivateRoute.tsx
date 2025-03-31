// PrivateRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
