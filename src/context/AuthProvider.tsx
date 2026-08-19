// AuthProvider.tsx

import { useState, type ReactNode } from "react";
import { AuthContext, type LoggedUser } from "./AuthContext";

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [loggedUser, setLoggedUser] = useState<LoggedUser | null>(() => {
    const user = localStorage.getItem("user");

    return user ? JSON.parse(user) : null;
  });
  const [animate, setAnimate] = useState<string>("");

  return (
    <AuthContext.Provider
      value={{
        loggedUser,
        setLoggedUser,
        animate,
        setAnimate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
