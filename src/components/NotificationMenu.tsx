import React, { useRef, useState } from "react";
import { UseAnimation } from "../context/AnimationContext";
import { UseNotifications } from "../context/NotificationsContext";
import { useDismissMenu } from "../hooks/useDismissMenu";

function NotificationMenu({ id, is_read }: { id: number; is_read: boolean }) {
  const { animate, activeAnimation } = UseAnimation();
  const onNotificationMenuRef = useRef<HTMLDivElement | null>(null);
  const { deleteNotification, readNotificationAction } = UseNotifications();
  const [menuVisible, setMenuVisible] = useState(false);

  useDismissMenu({
    menuRef: onNotificationMenuRef,
    isOpen: menuVisible,
    onClose: () => setMenuVisible(false),
  });

  return (
    <>
      <button
        id={`notificationMenu-menuIcon-${id}`}
        className={`flex items-center justify-center cursor-pointer hover:bg-white/12 h-8 w-8 p-1 rounded-full hover:scale-107 duration-300 ${animate === `notificationMenu-menuIcon-${id}` && "animate-[spanIn_400ms_ease]"}`}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          setMenuVisible(true);
          activeAnimation(`notificationMenu-menuIcon-${id}`);
        }}
      >
        <p>...</p>
      </button>
      {menuVisible && (
        <div
          className="absolute right-6 top-6 z-10 bg-linear-to-tl gap-1 px-1 from-[#171717] to-[#222] rounded-xl w-50 flex flex-col justify-center items-center h-fit py-2"
          ref={onNotificationMenuRef}
        >
          {!is_read && (
            <button
              id={`MarkAsReadNotification-${id}`}
              className={`cursor-pointer rounded-md px-2 p-2 w-[95%] text-white font-semibold text-start text-xs hover:bg-white/3 flex justify-between items-center ${animate === `MarkAsReadNotification-${id}` && "animate-[spanIn_400ms_ease]"}`}
              onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                readNotificationAction(id);
                activeAnimation(`MarkAsReadNotification-${id}`);
                setMenuVisible(false);
              }}
            >
              <p className=" font-semibold">Marcar como leido</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#29f"
                viewBox="0 0 24 24"
              >
                <path d="M13.29 7.29 7 13.58l-2.29-2.29L3.3 12.7l3 3c.2.2.45.29.71.29s.51-.1.71-.29l7-7-1.41-1.41Zm-.29 6.3-.79-.79-1.41 1.41 1.5 1.5c.2.2.45.29.71.29s.51-.1.71-.29l7-7-1.41-1.41-6.29 6.29Z"></path>
              </svg>
            </button>
          )}
          <button
            id={`DeleteNotification-${id}`}
            className={`cursor-pointer rounded-md px-2 p-2 w-[95%] text-white font-semibold text-start text-xs hover:bg-white/3 flex justify-between items-center ${animate === `DeleteNotification-${id}` && "animate-[spanIn_400ms_ease]"}`}
            onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              activeAnimation(`DeleteNotification-${id}`);
              deleteNotification(id);
              setMenuVisible(false);
            }}
          >
            <p className="text-red-500 font-bold">Eliminar notificacion</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#f11"
              viewBox="0 0 24 24"
              className="hover:scale-115 duration-300"
            >
              <path d="M17 6V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H2v2h2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8h2V6zM9 4h6v2H9zM6 20V8h12v12z"></path>
              <path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
            </svg>
          </button>
        </div>
      )}
    </>
  );
}

export default NotificationMenu;
