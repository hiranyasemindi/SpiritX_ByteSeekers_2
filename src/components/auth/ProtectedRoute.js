import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");
  const tokenExpiration = localStorage.getItem("tokenExpiration");

  if (!token || !tokenExpiration || Date.now() > tokenExpiration) {
    return <Navigate to="/admin" />;
  }

  return children;
};

export default ProtectedRoute;
