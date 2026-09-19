import { useRef, useState } from "react";
import { UseAnimation } from "../context/AnimationContext";
import { UseNotifications } from "../context/NotificationsContext";
import { useDismissMenu } from "../hooks/useDismissMenu";
import { useNavigate } from "react-router-dom";

function NotificationsTypeMenu({ isPage }: { isPage?: boolean }) {
  const {
    notifications,
    onUnreadNotifications,
    getNotifications,
    getNotificatationsByType,
  } = UseNotifications();
  const { activeAnimation, animate } = UseAnimation();
  const menuBtnRef = useRef<HTMLDivElement | null>(null);
  const [menuIsVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();

  const { type } = notifications;

  const notificationType =
    type === "all"
      ? "Todo"
      : type === "comment"
        ? "Comentarios"
        : type === "like"
          ? "Me gustas"
          : type === "new_post"
            ? "Publicaciones"
            : type === "un_read"
              ? "No leidos"
              : type === "follow"
                ? "Seguidores"
                : "something ";

  useDismissMenu({
    menuRef: menuBtnRef,
    isOpen: menuIsVisible,
    onClose: () => setMenuVisible(false),
  });

  return (
    <>
      <button
        id="NotificationTypeMenuBtn"
        className={`ml-2 p-1 px-6 bg-linear-to-tl from-[#fff1] to-[#fff14] rounded-xl cursor-pointer hover:opacity-45 duration-300 ${animate === "NotificationTypeMenuBtn" && `animate-[spanIn_400ms_ease]`}`}
        onClick={() => {
          activeAnimation("NotificationTypeMenuBtn");
          setMenuVisible(true);
        }}
      >
        {notificationType}
      </button>
      {menuIsVisible && (
        <div
          id="notificationTypeMenu"
          className={`absolute right-6 top-8 bg-linear-to-tl from-[#191919] to-[#161616] rounded-xl w-50 flex flex-col justify-center items-center p-1 py-2 gap-2 z-50 animate-[fadeIn_400ms_ease]`}
          ref={menuBtnRef}
        >
          <button
            id="NotificationTypeMenu-todo"
            className={`cursor-pointer rounded-md px-2 p-2 w-[95%] text-white font-semibold text-start text-[15px] hover:bg-white/3 flex justify-between items-center ${animate === "NotificationTypeMenu-todo" && "animate-[spanIn_400ms_ease]"}`}
            onClick={async () => {
              activeAnimation("NotificationTypeMenu-todo");
              await getNotifications();
              if (isPage) navigate(`/activity/all`);
            }}
          >
            Todo{" "}
            {notificationType === "Todo" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#fff"
                viewBox="0 0 24 24"
              >
                <path d="M9 15.59 4.71 11.3 3.3 12.71l5 5c.2.2.45.29.71.29s.51-.1.71-.29l11-11-1.41-1.41L9.02 15.59Z"></path>
              </svg>
            )}
          </button>
          <button
            id="NotificationTypeMenu-unRead"
            className={`cursor-pointer rounded-md px-2 p-2 w-[95%] text-white font-semibold text-start text-[15px] hover:bg-white/3 flex justify-between items-center ${animate === "NotificationTypeMenu-unRead" && "animate-[spanIn_400ms_ease]"}`}
            onClick={async () => {
              activeAnimation("NotificationTypeMenu-unRead");
              await onUnreadNotifications();
              if (isPage) navigate(`/activity/un_read`);
            }}
          >
            No leidos{" "}
            {notificationType === "No leidos" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#fff"
                viewBox="0 0 24 24"
              >
                <path d="M9 15.59 4.71 11.3 3.3 12.71l5 5c.2.2.45.29.71.29s.51-.1.71-.29l11-11-1.41-1.41L9.02 15.59Z"></path>
              </svg>
            )}
          </button>
          <button
            id="NotificationTypeMenu-liked"
            className={`cursor-pointer rounded-md px-2 p-2 w-[95%] text-white font-semibold text-start text-[15px] hover:bg-white/3 flex justify-between items-center ${animate === "NotificationTypeMenu-liked-unRead" && "animate-[spanIn_400ms_ease]"}`}
            onClick={async () => {
              activeAnimation("NotificationTypeMenu-liked");
              await getNotificatationsByType("like");
              if (isPage) navigate(`/activity/like`);
            }}
          >
            Me gustas{" "}
            {notificationType === "Me gustas" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#fff"
                viewBox="0 0 24 24"
              >
                <path d="M9 15.59 4.71 11.3 3.3 12.71l5 5c.2.2.45.29.71.29s.51-.1.71-.29l11-11-1.41-1.41L9.02 15.59Z"></path>
              </svg>
            )}
          </button>
          <button
            id="NotificationTypeMenu-commented"
            className={`cursor-pointer rounded-md px-2 p-2 w-[95%] text-white font-semibold text-start text-[15px] hover:bg-white/3 flex justify-between items-center ${animate === "NotificationTypeMenu-commented" && "animate-[spanIn_400ms_ease]"}`}
            onClick={async () => {
              activeAnimation("NotificationTypeMenu-commented");
              getNotificatationsByType("comment");
              if (isPage) navigate(`/activity/comment`);
            }}
          >
            Comentados{" "}
            {notificationType === "Comentarios" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#fff"
                viewBox="0 0 24 24"
              >
                <path d="M9 15.59 4.71 11.3 3.3 12.71l5 5c.2.2.45.29.71.29s.51-.1.71-.29l11-11-1.41-1.41L9.02 15.59Z"></path>
              </svg>
            )}
          </button>
          <button
            id="NotificationTypeMenu-new_post"
            className={`cursor-pointer rounded-md px-2 p-2 w-[95%] text-white font-semibold text-start text-[15px] hover:bg-white/3 flex justify-between items-center ${animate === "NotificationTypeMenu-new_post" && "animate-[spanIn_400ms_ease]"}`}
            onClick={async () => {
              activeAnimation("NotificationTypeMenu-new_post");
              getNotificatationsByType("new_post");
              if (isPage) navigate(`/activity/new_post`);
            }}
          >
            Publicaciones{" "}
            {notificationType === "Publicaciones" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#fff"
                viewBox="0 0 24 24"
              >
                <path d="M9 15.59 4.71 11.3 3.3 12.71l5 5c.2.2.45.29.71.29s.51-.1.71-.29l11-11-1.41-1.41L9.02 15.59Z"></path>
              </svg>
            )}
          </button>{" "}
          <button
            id="NotificationTypeMenu-followers"
            className={`cursor-pointer rounded-md px-2 p-2 w-[95%] text-white font-semibold text-start text-[15px] hover:bg-white/3 flex justify-between items-center ${animate === "NotificationTypeMenu-followers" && "animate-[spanIn_400ms_ease]"}`}
            onClick={async () => {
              activeAnimation("NotificationTypeMenu-followers");
              getNotificatationsByType("follow");
              if (isPage) navigate(`/activity/follow`);
            }}
          >
            Seguidores{" "}
            {notificationType === "Seguidores" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#fff"
                viewBox="0 0 24 24"
              >
                <path d="M9 15.59 4.71 11.3 3.3 12.71cccl5 5c.2.2.45.29.71.29s.51-.1.71-.29l11-11-1.41-1.41L9.02 15.59Z"></path>
              </svg>
            )}
          </button>
        </div>
      )}
    </>
  );
}

export default NotificationsTypeMenu;
