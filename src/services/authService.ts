// authService.ts

import { api } from "./apiService";

type User = {
  email: string;
  password: string;
};

export async function userGetter(user: User) {
  const response = await api("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  return response;
}
