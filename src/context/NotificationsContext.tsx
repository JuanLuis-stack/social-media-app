import React, { createContext, useContext, useEffect, useState } from "react";
import {
  retrieveNotifications,
  type Notification,
  type Notifications,
} from "../Schemas/notificationsSchema";
import {
  deleteNotificationById,
  getUnreadUserNotifications,
  getUserNotifications,
  getUserNotificationsByType,
  readNotification,
} from "../services/notificationService";
import { useAuth } from "./AuthContext";

type NotificationsProvider = {
  type: null | Notification["type"] | "all" | "un_read";
  notifications: null | Notifications;
};

type NotificationContextType = {
  notifications: NotificationsProvider;
  getNotifications: () => Promise<void>;
  onUnreadNotifications: () => Promise<void>;
  getNotificatationsByType: (
    type: Notification["type"] | "all" | "un_read",
  ) => void;
  loading: boolean;
  error: boolean;
  onNotificationColumnVisible: () => void;
  onUnNotificationColumnVisible: () => void;
  isNotificationColumnVisible: boolean;
  deleteNotification: (id: number) => Promise<void>;
  readNotificationAction: (id: number) => Promise<void>;
};

const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loggedUser } = useAuth();
  const [notifications, setNotifications] = useState<NotificationsProvider>({
    type: "all",
    notifications: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [activeNotificationsColumn, setActiveNotificationsColumn] =
    useState(false);

  useEffect(() => {
    setActiveNotificationsColumn(false);
  }, [loggedUser]);

  async function getNotifications() {
    if (!loggedUser) return;
    try {
      setLoading(true);
      const response = await getUserNotifications(loggedUser.token);

      const notifiticationsResponse = retrieveNotifications.parse(response);

      setNotifications({
        type: "all",
        notifications: notifiticationsResponse.notifications,
      });
      setError(false);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function onNotificationColumnVisible() {
    setActiveNotificationsColumn(true);
  }
  function onUnNotificationColumnVisible() {
    setActiveNotificationsColumn(false);
  }

  async function getNotificatationsByType(
    type: Notification["type"] | "all" | "un_read",
  ) {
    if (!loggedUser) return;
    try {
      const response = await getUserNotificationsByType(loggedUser.token, type);

      const data = retrieveNotifications.parse(response);

      setNotifications({
        type: type,
        notifications: data.notifications,
      });
      setError(false);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  }
  async function getUnreadNotifications() {
    if (!loggedUser) return;
    try {
      const response = await getUnreadUserNotifications(loggedUser.token);

      const data = retrieveNotifications.parse(response);

      setNotifications({
        type: "un_read",
        notifications: data.notifications,
      });
      setError(false);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  }
  async function deleteNotification(id: number) {
    try {
      if (!loggedUser) return;
      if (notifications === null) return;

      await deleteNotificationById(loggedUser?.token, id);

      setNotifications((prev) => {
        if (!prev.notifications) return prev;

        return {
          ...prev,
          notifications: prev.notifications.filter(
            (notification) => notification.id !== id,
          ),
        };
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function readNotificationAction(id: number) {
    try {
      if (!loggedUser?.token) return;

      await readNotification(loggedUser.token, id);

      setNotifications((prev) => {
        if (!prev.notifications) return prev;

        if (notifications.type === "un_read") {
          return {
            ...prev,
            notifications: prev.notifications.filter(
              (notification) => notification.id !== id,
            ),
          };
        }

        return {
          ...prev,
          notifications: prev.notifications.map((notification) =>
            notification.id === id
              ? { ...notification, is_read: true }
              : notification,
          ),
        };
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getNotifications();
  }, [loggedUser]);

  return (
    <NotificationContext.Provider
      value={{
        getNotifications,
        notifications,
        onUnreadNotifications: getUnreadNotifications,
        getNotificatationsByType,
        loading,
        error,
        onNotificationColumnVisible,
        onUnNotificationColumnVisible,
        isNotificationColumnVisible: activeNotificationsColumn,
        deleteNotification,
        readNotificationAction,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function UseNotifications() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("Something went wrong");
  }

  return context;
}
