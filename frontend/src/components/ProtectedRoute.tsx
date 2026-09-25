import type React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { loggedUser } = useAuth();

  if (!loggedUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
