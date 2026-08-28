import { api } from "./apiService";

export async function getUserData(token: string, name: string) {
  const response = await api(`/users/${name}`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  return response;
}
