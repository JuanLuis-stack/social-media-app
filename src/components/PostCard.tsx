// RenderPost.tsx

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import type { Post } from "../Schemas/postSchema";
import setTimeAgo from "../utils/setTimeAgo";
import VideoPlayer from "./VideoPlayer";
import ImagePlayer from "./ImagePlayer";
import FollowCard from "./FollowCard";
import { UseFollowProvider } from "../context/FollowContext";
// import { useNavigate } from "react-router-dom";
import UserName from "./UserName";
import ActionPostButtons from "./ActionPostButtons";
import { UseColumn } from "../context/ColumnContext";

type RenderPostProps = {
  post: Post;
  onUpdatedPost?: (updatedPost: Post) => void;
};

function PostCard({ post, onUpdatedPost }: RenderPostProps) {
  const { loggedUser } = useAuth();
  const [isFollowCardVisible, setIsFollowCardVisible] = useState(false);
  const { isFollowing } = UseFollowProvider();
  // const navigate = useNavigate();
  const { openPostDetail } = UseColumn();

  return (
    <div
      className="@container flex border-b border-white/20 px-4 my-3"
      onClick={() => openPostDetail(post.user_name, post.id)}
    >
      <div
        className="group relative h-7"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation();
          setIsFollowCardVisible(true);
        }}
      >
        <img
          src="https://marketplace.canva.com/N2Y1c/MAEbiyN2Y1c/1/tl/canva-user-profile-avatar-MAEbiyN2Y1c.png"
          alt=""
          className="h-8.5  mr-2.5 items-bottom cursor-pointer"
        />
        <div className="bg-white rounded-full absolute left-5 border-2 p-0.5 border-black -bottom-3 cursor-pointer duration-250 group-hover:scale-110">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="11"
            fill="black"
            viewBox="0 0 24 24"
          >
            <path
              d={
                loggedUser?.user.user_name === post.user_name
                  ? "M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5m0-8c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3M4 22h16c.55 0 1-.45 1-1v-1c0-3.86-3.14-7-7-7h-4c-3.86 0-7 3.14-7 7v1c0 .55.45 1 1 1m6-7h4c2.76 0 5 2.24 5 5H5c0-2.76 2.24-5 5-5"
                  : isFollowing?.[post.user_name]
                    ? "M9 15.59 4.71 11.3 3.3 12.71l5 5c.2.2.45.29.71.29s.51-.1.71-.29l11-11-1.41-1.41L9.02 15.59Z"
                    : "M3 13h8v8h2v-8h8v-2h-8V3h-2v8H3z"
              }
            ></path>
          </svg>
        </div>
        <div onClick={(e: React.MouseEvent) => e.stopPropagation()}>
          {isFollowCardVisible && (
            <FollowCard
              user_name={post.user_name}
              isFollowCardVisible={isFollowCardVisible}
              onUnVisibleFollowCard={() => setIsFollowCardVisible(false)}
            ></FollowCard>
          )}
        </div>
      </div>
      <div className="flex-1">
        <header className="flex">
          <UserName user_name={post.user_name}></UserName>
          <p className="pl-2 font-semibold">{setTimeAgo(post.created_at)}</p>
        </header>
        <div>
          <p className="font-semibold text-md text-white">{post.title}</p>
          <p className="font-light text-sm text-white">{post.content}</p>
        </div>

        {post.media_url &&
          post.media_type &&
          (post.media_type?.startsWith("image") ? (
            <ImagePlayer post={post}></ImagePlayer>
          ) : (
            <VideoPlayer
              videoUrl={post?.media_url}
              videoType={post.media_type}
            />
          ))}

        <div className="py-2">
          <ActionPostButtons
            post={post}
            onUpdatedPost={onUpdatedPost}
          ></ActionPostButtons>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
