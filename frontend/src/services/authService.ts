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

export async function userRegister(user: {
  name: string;
  user_name: string;
  email: string;
  password: string;
}) {
  const response = await api("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  return response;
}
