// apiService.ts

// const API_URL = "http://localhost:3000";
const API_URL = import.meta.env.VITE_SERVER_URL;

export async function api<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, options);

  if (response.status === 401) {
    window.localStorage.href = "/login";
    throw new Error("unauthorizated");
  }

  if (!response.ok) {
    throw new Error(`request failed ${response.status}`);
  }

  return response.json();
}
