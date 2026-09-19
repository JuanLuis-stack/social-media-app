import { useEffect, useState } from "react";
import { type Notification } from "../Schemas/notificationsSchema";
import { getUserById } from "../services/userService";
import { useAuth } from "../context/AuthContext";
import { userRetrivedByUserNameSchema, type User } from "../Schemas/userSchema";
import UserName from "./UserName";
import setTimeAgo from "../utils/setTimeAgo";
import { type Post } from "../Schemas/postSchema";
import { UsePostContext } from "../context/PostContext";
import ActionPostButtons from "./ActionPostButtons";
import NotificationMenu from "./NotificationMenu";
import { UseColumn } from "../context/ColumnContext";
import { UseNotifications } from "../context/NotificationsContext";

function NotificationCard({ notification }: { notification: Notification }) {
  const { type, actor_id } = notification;
  const { loggedUser } = useAuth();
  const { getPostById } = UsePostContext();
  const { openPostDetail, openProfile } = UseColumn();
  const { readNotificationAction } = UseNotifications();

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);

  useEffect(() => {
    async function retreiveUser() {
      try {
        if (!loggedUser) return;
        const response = await getUserById(loggedUser.token, actor_id);
        const user = userRetrivedByUserNameSchema.parse(response);

        setCurrentUser(user.user);
      } catch (error) {
        console.log(error);
      }
    }
    retreiveUser();
  }, [loggedUser, actor_id]);

  useEffect(() => {
    if (notification.type === "follow") return;

    async function retrievePostById() {
      if (notification.post_id === null) return;
      const response = await getPostById(String(notification.post_id));

      if (!response) return;

      setCurrentPost(response);
    }
    retrievePostById();
  }, [notification]);

  if (!currentUser) return null;

  return type === "new_post" ? (
    <div
      className="flex"
      onClick={() => {
        if (currentPost) {
          openPostDetail(currentPost?.user_name, currentPost?.id);
        }
        readNotificationAction(notification.id);
      }}
      id={String(notification.id)}
    >
      <div className="group relative h-7 p-3">
        <img
          src="https://marketplace.canva.com/N2Y1c/MAEbiyN2Y1c/1/tl/canva-user-profile-avatar-MAEbiyN2Y1c.png"
          alt=""
          className="h-8.5 min-w-8.5 mr-2.5 items-bottom cursor-pointer"
        />
        <div className="rounded-full  bg-[#19f] absolute left-8 p-0.5 -bottom-6 flex items-center justify-center group-hover:scale-110 duration-250 cursor-pointer border-2 border-black/90">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="#fff"
            viewBox="0 0 24 24"
          >
            <path d="M20.56 3.17c-.29-.2-.67-.23-.99-.08l-17 8.01c-.36.17-.58.53-.57.92 0 .39.24.75.6.9l3.36 1.47L16 8l-7 8v6l5.46-3.9 4.14 1.81c.13.06.26.08.4.08.18 0 .36-.05.52-.15a.99.99 0 0 0 .48-.79l1-15c.02-.35-.14-.69-.43-.89Z"></path>
          </svg>
        </div>
      </div>
      <div className="w-full h-full pt-3 border-b border-white/15">
        {" "}
        <div>
          <div className="flex flex-wrap">
            <UserName user_name={currentUser.user_name}></UserName>
            <p className="pl-2">{setTimeAgo(notification.created_at)}</p>
          </div>
          <div>
            <p className="text-sm py-1">
              User @{currentUser.user_name} made a new post:
            </p>
            <div>
              {" "}
              <p>{currentPost?.title ?? ""}</p>
            </div>
            <div>
              <p className="text-sm">{currentPost?.content ?? ""}</p>
            </div>
            {currentPost?.media_url && (
              <p className="text-xl text-white">...</p>
            )}
            {currentPost && (
              <div className="@container py-1">
                <ActionPostButtons
                  post={currentPost}
                  onUpdatedPost={setCurrentPost}
                ></ActionPostButtons>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-[20%] pt-5 flex flex-col items-center justify-center relative">
        <div className="absolute top-1">
          <NotificationMenu
            id={notification.id}
            is_read={notification.is_read}
          ></NotificationMenu>
        </div>
        {!notification.is_read && (
          <div className="bg-green-500 w-2 h-2 rounded-full"></div>
        )}
      </div>
    </div>
  ) : type === "follow" ? (
    <div
      className="flex"
      onClick={() => {
        openProfile(currentUser.user_name);
        readNotificationAction(notification.id);
      }}
      id={String(notification.id)}
    >
      <div className="group relative h-7 p-3">
        <img
          src="https://marketplace.canva.com/N2Y1c/MAEbiyN2Y1c/1/tl/canva-user-profile-avatar-MAEbiyN2Y1c.png"
          alt=""
          className="h-8.5 min-w-8.5 mr-2.5 items-bottom cursor-pointer"
        />
        <div className="rounded-full  bg-[#6E3DEF] absolute left-8 p-0.5 -bottom-6 flex items-center justify-center group-hover:scale-110 duration-250 cursor-pointer border border-black/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="#fff"
            viewBox="0 0 24 24"
            className="p-px"
          >
            <path d="M12 2a5 5 0 1 0 0 10 5 5 0 1 0 0-10M4 22h16c.55 0 1-.45 1-1v-1c0-3.86-3.14-7-7-7h-4c-3.86 0-7 3.14-7 7v1c0 .55.45 1 1 1"></path>
          </svg>
        </div>
      </div>
      <div className="w-full h-full py-3 border-b border-white/15">
        {" "}
        <div>
          <div className="flex">
            <UserName user_name={currentUser.user_name}></UserName>
            <p className="pl-2">{setTimeAgo(notification.created_at)}</p>
          </div>
          <p className="text-sm py-1">
            user @{currentUser.user_name} started following you
          </p>
        </div>
      </div>
      <div className="w-[20%] pt-5 flex flex-col items-center justify-center relative">
        <div className="absolute top-1">
          <NotificationMenu
            id={notification.id}
            is_read={notification.is_read}
          ></NotificationMenu>
        </div>
        {!notification.is_read && (
          <div className="bg-green-500 w-2 h-2 rounded-full"></div>
        )}
      </div>
    </div>
  ) : type === "comment" ? (
    <div
      className="flex"
      onClick={() => {
        if (currentPost) {
          openPostDetail(currentPost?.user_name, currentPost?.id);
        }
        readNotificationAction(notification.id);
      }}
      id={String(notification.id)}
    >
      <div className="group relative h-7 p-3">
        <img
          src="https://marketplace.canva.com/N2Y1c/MAEbiyN2Y1c/1/tl/canva-user-profile-avatar-MAEbiyN2Y1c.png"
          alt=""
          className="h-8.5 min-w-8.5 mr-2.5 items-bottom cursor-pointer"
        />
        <div className="rounded-full  bg-[#16f] absolute left-8 border-3 border-[#16f] -bottom-6 flex items-center justify-center group-hover:scale-110 duration-250 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            fill="#fff"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10h9c.37 0 .71-.21.89-.54.17-.33.15-.73-.06-1.03l-1.75-2.53a10 10 0 0 0 1.93-5.9c0-5.51-4.49-10-10-10Z"></path>
          </svg>
        </div>
      </div>
      <div className="w-full h-full py-3 border-b border-white/15">
        {" "}
        <div>
          <div className="flex">
            <UserName user_name={currentUser.user_name}></UserName>
            <p className="pl-2">{setTimeAgo(notification.created_at)}</p>
          </div>
          <p className="text-sm py-1">
            user @{currentUser.user_name} commented your post
          </p>
        </div>
      </div>
      <div className="w-[20%] pt-5 flex flex-col items-center justify-center relative">
        <div className="absolute top-1">
          <NotificationMenu
            id={notification.id}
            is_read={notification.is_read}
          ></NotificationMenu>
        </div>
        {!notification.is_read && (
          <div className="bg-green-500 w-2 h-2 rounded-full"></div>
        )}
      </div>
    </div>
  ) : type === "like" ? (
    <div
      className="flex"
      onClick={() => {
        if (currentPost) {
          openPostDetail(currentPost?.user_name, currentPost?.id);
        }
        readNotificationAction(notification.id);
      }}
      id={String(notification.id)}
    >
      <div className="group relative h-7 p-3">
        <img
          src="https://marketplace.canva.com/N2Y1c/MAEbiyN2Y1c/1/tl/canva-user-profile-avatar-MAEbiyN2Y1c.png"
          alt=""
          className="h-8.5 min-w-8.5 mr-2.5 items-bottom cursor-pointer"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="#ff0000"
          viewBox="0 0 24 24"
          className="rounded-full absolute left-8 p-0.5 -bottom-6 cursor-pointer duration-250 group-hover:scale-110"
        >
          <path d="M11.29 20.69c.2.2.45.29.71.29s.51-.1.71-.29l7.5-7.5c2.35-2.35 2.35-6.05 0-8.41-2.29-2.29-5.84-2.35-8.21-.2-2.36-2.15-5.91-2.09-8.21.2-2.35 2.36-2.35 6.06 0 8.41z"></path>
        </svg>
      </div>
      <div className="w-full h-full py-3 border-b border-white/15">
        {" "}
        <div>
          <div className="flex">
            <UserName user_name={currentUser.user_name}></UserName>
            <p className="pl-2 text-sm">
              {setTimeAgo(notification.created_at)}
            </p>
          </div>
          <p className="text-sm py-1">
            user @{currentUser.user_name} liked your post
          </p>
        </div>
      </div>
      <div className="w-[20%] pt-5 flex flex-col items-center justify-center relative">
        <div className="absolute top-1">
          <NotificationMenu
            id={notification.id}
            is_read={notification.is_read}
          ></NotificationMenu>
        </div>
        {!notification.is_read && (
          <div className="bg-green-500 w-2 h-2 rounded-full"></div>
        )}
      </div>
    </div>
  ) : (
    <div className="p-3 border-t border-t-white/15">Not identfied</div>
  );
}

export default NotificationCard;
