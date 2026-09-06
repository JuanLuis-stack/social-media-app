import { api } from "./apiService";

export async function getUserFollowers(token: string) {
  const response = await api(`/follow/followers`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  return response;
}
