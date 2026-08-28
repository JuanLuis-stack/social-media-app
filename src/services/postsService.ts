import { api } from "./apiService";

export async function getPosts(token: string) {
  const response = api("/posts", {
    headers: {
      "Content-Type": "Aplication/json",
      authorization: `Bearer ${token}`,
    },
  });

  return response;
}

export async function getPostsByUserName(token: string, user_name: string) {
  const response = api(`/users/${user_name}/posts`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  return response;
}

export async function submitPost(token: string, data: FormData) {
  const response = api("/users/me/posts", {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: data,
  });

  return response;
}

export async function likePost(token: string, id: number) {
  const response = api(`/posts/${id}/likes`, {
    method: "POST",
    headers: {
      "Content-type": "Aplication/json",
      authorization: `Bearer ${token}`,
    },
  });

  return response;
}

export async function getComments(token: string, id: number) {
  const response = api(`/posts/${id}/comments`, {
    headers: {
      "Content-type": "aplication/json",
      authorization: `Bearer ${token}`,
    },
  });

  return response;
}

export async function submitComment(
  token: string,
  id: number,
  content: string,
) {
  console.log({ content });
  const response = api(`/posts/${id}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  });

  return response;
}
