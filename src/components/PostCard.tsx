// RenderPost.tsx

import React from "react";
import { useAuth } from "../context/AuthContext";
import { likeSchema } from "../Schemas/likeSchema";
import type { Post } from "../Schemas/postSchema";
import { likePost } from "../services/postsService";
import setTimeAgo from "../utils/setTimeAgo";
import VideoPlayer from "./VideoPlayer";
import { UseAnimation } from "../context/AnimationContext";
import ImagePlayer from "./ImagePlayer";
import { UsePostContext } from "../context/PostContext";
import { Link } from "react-router-dom";

type RenderPostProps = {
  post: Post;
  setSeletedPost: React.Dispatch<React.SetStateAction<Post | null>>;
};

function PostCard({ post, setSeletedPost }: RenderPostProps) {
  const { loggedUser } = useAuth();
  const { animate, activeAnimation } = UseAnimation();
  const { setPosts } = UsePostContext();

  async function likeEvent(id: number) {
    if (!loggedUser) return;
    const response = await likePost(loggedUser?.token, id);
    const liked = likeSchema.parse(response);

    setPosts((prev) =>
      !prev
        ? null
        : prev.map((post) =>
            post.id === id
              ? {
                  ...post,
                  liked_by_current_user: liked.liked_by_current_user,
                  likes: liked.likes,
                }
              : post,
          ),
    );
  }

  return (
    <div className="flex border-b border-white/20 px-4 my-3">
      <img
        src="https://marketplace.canva.com/N2Y1c/MAEbiyN2Y1c/1/tl/canva-user-profile-avatar-MAEbiyN2Y1c.png"
        alt=""
        className="h-7  mr-2.5 items-bottom"
      />
      <div className="flex-1">
        <header className="flex">
          <Link
            to={`/profile/${post.user_name}`}
            className="font-semibold text-white hover:underline"
          >
            {post.name}
          </Link>
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

        <div className="py-2 flex justify-around">
          <button
            id={`like-${post.id}-Btn`}
            className={`flex justify-center items-center w-1/3 hover:bg-white/15 duration-200 cursor-pointer rounded-xl p-1 h-9
            ${animate == `like-${post.id}-Btn` && "animate-[spanIn_400ms_ease]"}`}
            onClick={() => {
              likeEvent(post.id);
              activeAnimation(`like-${post.id}-Btn`);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              fill="currentColor"
              viewBox="2 2 20 20"
              className="mr-2 aling-center"
            >
              <path
                d={
                  post.liked_by_current_user
                    ? "M11.29 20.69c.2.2.45.29.71.29s.51-.1.71-.29l7.5-7.5c2.35-2.35 2.35-6.05 0-8.41-2.29-2.29-5.84-2.35-8.21-.2-2.36-2.15-5.91-2.09-8.21.2-2.35 2.36-2.35 6.06 0 8.41z"
                    : "M11.29 20.66c.2.2.45.29.71.29s.51-.1.71-.29l7.5-7.5c2.35-2.35 2.35-6.05 0-8.41-2.3-2.28-5.85-2.35-8.21-.2-2.36-2.15-5.91-2.09-8.21.2-2.35 2.36-2.35 6.06 0 8.41zM5.21 6.16C6 5.38 7 4.99 8.01 4.99s2.01.39 2.79 1.17l.5.5c.39.39 1.02.39 1.41 0l.5-.5c1.56-1.56 4.02-1.56 5.59 0 1.56 1.57 1.56 4.02 0 5.58l-6.79 6.79-6.79-6.79a3.91 3.91 0 0 1 0-5.58Z"
                }
              ></path>
            </svg>
            <p className="hidden md:block px-1"> Me gustas</p>
            {post.likes}
          </button>
          <button
            id={`comment-${post.id}-Btn`}
            className={`flex justify-center items-center w-1/3 hover:bg-white/15 duration-200 cursor-pointer rounded-xl p-1 h-9 
            ${animate == `comment-${post.id}-Btn` && "animate-[spanIn_400ms_ease]"}`}
            onClick={() => {
              setSeletedPost(post);
              activeAnimation(`comment-${post.id}-Btn`);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              fill="currentColor"
              viewBox="2 2 20 20"
              className="mr-2 aling-center"
            >
              <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10h9c.37 0 .71-.21.89-.54.17-.33.15-.73-.06-1.03l-1.75-2.53a10 10 0 0 0 1.93-5.9c0-5.51-4.49-10-10-10Zm6 16.43L19.09 20H12c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8c0 1.91-.69 3.75-1.93 5.21-.3.34-.32.85-.06 1.22Z"></path>
            </svg>
            <p className="hidden md:block px-1">Comentar</p> {post.comments}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
