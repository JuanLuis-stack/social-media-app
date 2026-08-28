// AuthProvider.tsx

import { useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { UserRetrived } from "../Schemas/userSchema";

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [loggedUser, setLoggedUser] = useState<UserRetrived | null>(() => {
    const user = localStorage.getItem("user");

    return user ? JSON.parse(user) : null;
  });

  return (
    <AuthContext.Provider
      value={{
        loggedUser,
        setLoggedUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
