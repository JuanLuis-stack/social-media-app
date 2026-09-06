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

export async function followUser(token: string, user_name: string) {
  const response = await api(`/users/me/follow`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      following_userName: user_name,
    }),
  });

  return response;
}

export async function unFollowUser(token: string, user_name: string) {
  const response = await api(`/users/me/unfollow`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      following_userName: user_name,
    }),
  });

  return response;
}
