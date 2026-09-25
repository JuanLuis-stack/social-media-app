// AuthContext.tsx

import React, { createContext, useContext } from "react";
import type { UserRetrived } from "../Schemas/userSchema";

export type AuthContextType = {
  loggedUser: UserRetrived | null;
  setLoggedUser: React.Dispatch<React.SetStateAction<UserRetrived | null>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
