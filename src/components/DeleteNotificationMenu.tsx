import { useRef, useState } from "react";
import { UseAnimation } from "../context/AnimationContext";
import { UseNotifications } from "../context/NotificationsContext";
import { useDismissMenu } from "../hooks/useDismissMenu";

function DeleteNotificationMenu({ id }: { id: number }) {
  const { animate, activeAnimation } = UseAnimation();
  const onNotificationMenuRef = useRef<HTMLDivElement | null>(null);
  const { deleteNotification } = UseNotifications();
  const [menuVisible, setMenuVisible] = useState(false);

  useDismissMenu({
    menuRef: onNotificationMenuRef,
    isOpen: menuVisible,
    onClose: () => setMenuVisible(false),
  });

  return (
    <>
      <button
        id={`deleteNotification-menuIcon-${id}`}
        className={`flex items-center justify-center cursor-pointer hover:bg-white/12 h-8 w-8 p-1 rounded-full hover:scale-107 duration-300 ${animate === `deleteNotification-menuIcon-${id}` && "animate-[spanIn_400ms_ease]"}`}
        onClick={() => {
          setMenuVisible(true);
          activeAnimation(`deleteNotification-menuIcon-${id}`);
        }}
      >
        <p>...</p>
      </button>
      {menuVisible && (
        <div
          className="absolute right-6 top-6 bg-[#241c1c] rounded-xl w-50 flex flex-col justify-center items-center h-10 py-6"
          ref={onNotificationMenuRef}
        >
          <button
            id={`DeleteNotification-${id}`}
            className={`cursor-pointer rounded-md px-2 p-2 w-[95%] text-white font-semibold text-start text-xs hover:bg-white/3 flex justify-between items-center ${animate === `DeleteNotification-${id}` && "animate-[spanIn_400ms_ease]"}`}
            onClick={async () => {
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

export default DeleteNotificationMenu;
