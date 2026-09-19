import React, { useRef, useState } from "react";
import { UseAnimation } from "../context/AnimationContext";
import { UseNotifications } from "../context/NotificationsContext";
import { useDismissMenu } from "../hooks/useDismissMenu";
import { UseColumnNavigation } from "../context/ColumnNavigationContext";

function CloseNotificationMenu() {
  const { animate, activeAnimation } = UseAnimation();
  const { onUnNotificationColumnVisible } = UseNotifications();
  const { removeColumn } = UseColumnNavigation();

  const onNotificationMenuRef = useRef<HTMLDivElement | null>(null);
  const [unNotificationsMenuVisible, setUnNotificationsMenuVisible] =
    useState(false);

  useDismissMenu({
    menuRef: onNotificationMenuRef,
    isOpen: unNotificationsMenuVisible,
    onClose: () => setUnNotificationsMenuVisible(false),
  });

  return (
    <>
      <svg
        id="closeNotifications-menuIcon"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
        className={`cursor-pointer hover:bg-white/20 h-8 w-8 p-1 rounded-full hover:scale-107 duration-300 ${animate === "closeNotifications-menuIcon" && "animate-[spanIn_400ms_ease]"}`}
        onClick={(e: React.MouseEvent<SVGSVGElement>) => {
          e.stopPropagation();
          setUnNotificationsMenuVisible(true);
          activeAnimation("closeNotifications-menuIcon");
        }}
      >
        <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8"></path>
        <path d="M12 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3m4.5 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3m-9 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3"></path>
      </svg>
      {unNotificationsMenuVisible && (
        <div
          className="absolute right-6 top-7 bg-linear-to-tl from-[#191919] to-[#161616] rounded-xl w-50 flex flex-col justify-center items-center h-10 py-6"
          ref={onNotificationMenuRef}
        >
          <button
            id="CloseNotificationsColumn"
            className={`cursor-pointer rounded-md px-2 p-2 w-[95%] text-white font-semibold text-start text-xs hover:bg-white/3 flex justify-between items-center ${animate === "CloseNotificationsColumn" && "animate-[spanIn_400ms_ease]"}`}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              activeAnimation("CloseNotificationsColumn");
              onUnNotificationColumnVisible();
              setUnNotificationsMenuVisible(false);
              removeColumn("activity");
            }}
          >
            <p>Suprimir columna</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="hover:scale-115 duration-300"
            >
              <path d="M14.83 7.76 12 10.59 9.17 7.76 7.76 9.17 10.59 12l-2.83 2.83 1.41 1.41L12 13.41l2.83 2.83 1.41-1.41L13.41 12l2.83-2.83z"></path>
              <path d="M12 2C9.33 2 6.82 3.04 4.93 4.93S2 9.33 2 12s1.04 5.18 2.93 7.07c1.95 1.95 4.51 2.92 7.07 2.92s5.12-.97 7.07-2.92S22 14.67 22 12s-1.04-5.18-2.93-7.07A9.93 9.93 0 0 0 12 2m5.66 15.66c-3.12 3.12-8.19 3.12-11.31 0-1.51-1.51-2.34-3.52-2.34-5.66s.83-4.15 2.34-5.66S9.87 4 12.01 4s4.15.83 5.66 2.34 2.34 3.52 2.34 5.66-.83 4.15-2.34 5.66Z"></path>
            </svg>
          </button>
        </div>
      )}
    </>
  );
}

export default CloseNotificationMenu;
