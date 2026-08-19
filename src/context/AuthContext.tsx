// AuthContext.tsx

import React, { createContext, useContext } from "react";

export type LoggedUser = {
  message: string;
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
};

export type AuthContextType = {
  loggedUser: LoggedUser | null;
  setLoggedUser: React.Dispatch<React.SetStateAction<LoggedUser | null>>;
  animate: string;
  setAnimate: React.Dispatch<React.SetStateAction<string>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
