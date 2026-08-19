import type React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { loggedUser } = useAuth();

  if (!loggedUser) {
    navigate("/login");
  }

  return children;
}

export default ProtectedRoute;
