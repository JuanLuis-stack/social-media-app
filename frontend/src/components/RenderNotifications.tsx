import NotificationCard from "./NotificationCard";
import Spinner from "./Spinner";
import { UseNotifications } from "../context/NotificationsContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function RenderNotifications() {
  const { notifications, getNotifications, loading, error } =
    UseNotifications();

  useEffect(() => {
    getNotifications();
  }, []);

  if (loading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner></Spinner>
      </div>
    );

  return (
    <div className="@container h-full w-full">
      {error || !notifications.notifications ? (
        <div className="h-full w-full flex flex-col items-center justify-start md:p-20 @max-[400px]:p-10">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              fill="#f11"
              viewBox="0 0 24 24"
            >
              <path d="m20.42 6.11-7.97-4c-.28-.14-.62-.14-.9 0l-7.97 4c-.31.15-.51.45-.55.79-.01.11-.96 10.76 8.55 15.01a.98.98 0 0 0 .82 0C21.91 17.66 20.97 7 20.95 6.9a.98.98 0 0 0-.55-.79ZM12 19.9C5.26 16.63 4.94 9.64 5 7.64l7-3.51 7 3.51c.04 1.99-.33 9.02-7 12.26"></path>
              <path d="M11 11h2v6h-2zm0-4h2v2h-2z"></path>
            </svg>
          </div>
          <p className="text-red-500 text-sm max-w-md text-center">
            Something went wrong, most probably your token is expired, log in so
            you can keep using our app{" "}
            <Link to="/login" className="text-sm underline text-red-500">
              go back to log in.
            </Link>
          </p>
        </div>
      ) : notifications.notifications.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            fill="#fff"
            viewBox="0 0 24 24"
          >
            <path d="m20.29 2.29-3.4 3.4A8 8 0 0 0 11.99 4c-4.41 0-8 3.59-8 8 0 1.85.63 3.54 1.69 4.9l-3.4 3.4 1.41 1.41 3.4-3.4a8 8 0 0 0 4.9 1.69c4.41 0 8-3.59 8-8 0-1.85-.63-3.54-1.69-4.9l3.4-3.4zM6 12c0-3.31 2.69-6 6-6 1.29 0 2.49.42 3.47 1.11l-8.36 8.36C6.41 14.49 6 13.29 6 12m12 0c0 3.31-2.69 6-6 6-1.29 0-2.49-.42-3.47-1.11l8.36-8.36c.7.98 1.11 2.18 1.11 3.47"></path>
          </svg>
          <p className="text-sm text-white">No tienes ninguna notification</p>
        </div>
      ) : (
        notifications.notifications.map((notification) => (
          <NotificationCard notification={notification}></NotificationCard>
        ))
      )}
    </div>
  );
}

export default RenderNotifications;
