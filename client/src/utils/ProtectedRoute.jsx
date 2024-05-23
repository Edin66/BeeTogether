import React, { useContext } from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../store/AuthProvider";

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  return token ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
