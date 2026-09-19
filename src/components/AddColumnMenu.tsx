import { useRef, useState } from "react";
import { UseAnimation } from "../context/AnimationContext";
import { UseNotifications } from "../context/NotificationsContext";
import { useDismissMenu } from "../hooks/useDismissMenu";
import { UseColumnNavigation } from "../context/ColumnNavigationContext";

function AddColumnMenu() {
  const { animate, activeAnimation } = UseAnimation();
  const { onNotificationColumnVisible } = UseNotifications();
  const { addColumn } = UseColumnNavigation();
  const notificationMenuRef = useRef<HTMLDivElement | null>(null);

  const [notificationsMenuVisible, setNotificationsMenuVisible] =
    useState(false);

  useDismissMenu({
    menuRef: notificationMenuRef,
    isOpen: notificationsMenuVisible,
    onClose: () => setNotificationsMenuVisible(false),
  });

  return (
    <div className="relative" onClick={() => setNotificationsMenuVisible(true)}>
      <svg
        id="notifications-icon"
        onClick={() => activeAnimation("notifications-icon")}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
        className={`cursor-pointer hover:bg-white/20 hover:scale-108 duration-300 h-8 w-8 p-1 rounded-full mt-10 ${animate === "notifications-icon" && "animate-[spanIn_400ms_ease]"}`}
      >
        <path d="M13.5 6h-2v3h-3v2h3v3h2v-3h3V9h-3z"></path>
        <path d="M20 2H6C4.35 2 3 3.35 3 5v14c0 1.65 1.35 3 3 3h15v-2H6c-.55 0-1-.45-1-1s.45-1 1-1h14c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1m-6 14H6c-.35 0-.69.07-1 .18V5c0-.55.45-1 1-1h13v12z"></path>
      </svg>
      {notificationsMenuVisible && (
        <div
          className="absolute right-7 top-14 bg-linear-to-tl from-[#191919] to-[#161616] rounded-xl w-50 flex flex-col justify-start items-start px-1 p-1"
          ref={notificationMenuRef}
        >
          <p className="text-xs text-white/30 p-1 pb-2">Añadir columna</p>
          <button
            id="openNotificationsColumn"
            className={`cursor-pointer rounded-xl p-2 w-full text-white font-semibold text-start text-xs hover:bg-white/3 flex justify-between items-center ${animate === "openNotificationsColumn" && "animate-[spanIn_400ms_ease]"}`}
            onClick={() => {
              activeAnimation("openNotificationsColumn");
              onNotificationColumnVisible();
              setNotificationsMenuVisible(false);
              addColumn("activity");
            }}
          >
            <p>actividad</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="hover:scale-115 duration-300"
            >
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2M5 19V5h14v14z"></path>
              <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4z"></path>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default AddColumnMenu;
