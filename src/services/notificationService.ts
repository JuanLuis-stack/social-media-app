import type { Notification } from "../Schemas/notificationsSchema";
import { api } from "./apiService";

export async function getUserNotifications(token: string) {
  const response = await api(`/users/me/notifications`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  return response;
}

export async function getUnreadUserNotifications(token: string) {
  const response = await api(`/users/me/unread/notifications`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  return response;
}
export async function getUserNotificationsByType(
  token: string,
  type: Notification["type"] | "all" | "un_read",
) {
  const response = await api(`/users/me/${type}/notifications`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  return response;
}
export async function deleteNotificationById(token: string, id: number) {
  const response = await api(`/notifications/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  return response;
}
