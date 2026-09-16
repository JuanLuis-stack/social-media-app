import type React from "react";
import type { Post } from "../Schemas/postSchema";
import { UseAnimation } from "../context/AnimationContext";
import { UsePostContext } from "../context/PostContext";

function ActionPostButtons({
  post,
  onUpdatedPost,
}: {
  post: Post;
  onUpdatedPost?: (unpdatedPost: Post) => void;
}) {
  const { likeEvent } = UsePostContext();
  const { animate, activeAnimation } = UseAnimation();

  return (
    <div className="py-2 flex justify-around @max-[350px]:justify-start">
      <button
        id={`like-${post.id}-Btn`}
        className={`flex justify-center items-center w-1/3 @max-[350px]:w-fit hover:bg-white/15 duration-200 cursor-pointer rounded-xl p-1 @max-[350px]:mx-1 @max-[350px]:px-1 h-9 
            ${animate == `like-${post.id}-Btn` && "animate-[spanIn_400ms_ease]"}`}
        onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          await likeEvent(post.id, post, onUpdatedPost);
          activeAnimation(`like-${post.id}-Btn`);
        }}
      >
        {post.liked_by_current_user ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            fill="#f11"
            viewBox="2 2 20 20"
            className="mr-2 aling-center"
          >
            <path d="M11.29 20.69c.2.2.45.29.71.29s.51-.1.71-.29l7.5-7.5c2.35-2.35 2.35-6.05 0-8.41-2.29-2.29-5.84-2.35-8.21-.2-2.36-2.15-5.91-2.09-8.21.2-2.35 2.36-2.35 6.06 0 8.41z"></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            fill="currentColor"
            viewBox="2 2 20 20"
            className="mr-2 aling-center"
          >
            <path d="M11.29 20.66c.2.2.45.29.71.29s.51-.1.71-.29l7.5-7.5c2.35-2.35 2.35-6.05 0-8.41-2.3-2.28-5.85-2.35-8.21-.2-2.36-2.15-5.91-2.09-8.21.2-2.35 2.36-2.35 6.06 0 8.41zM5.21 6.16C6 5.38 7 4.99 8.01 4.99s2.01.39 2.79 1.17l.5.5c.39.39 1.02.39 1.41 0l.5-.5c1.56-1.56 4.02-1.56 5.59 0 1.56 1.57 1.56 4.02 0 5.58l-6.79 6.79-6.79-6.79a3.91 3.91 0 0 1 0-5.58Z"></path>
          </svg>
        )}
        <p className="hidden md:block px-1 @max-[500px]:hidden"> Me gustas</p>
        {post.likes}
      </button>
      <button
        id={`comment-${post.id}-Btn`}
        className={`flex justify-center items-center w-1/3 hover:bg-white/15 duration-200 cursor-pointer rounded-xl p-1 @max-[350px]:px-1 @max-[350px]:mx-2 h-9 @max-[350px]:w-fit 
            ${animate == `comment-${post.id}-Btn` && "animate-[spanIn_400ms_ease]"}`}
        onClick={() => {
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
        <p className="hidden md:block px-1 @max-[500px]:hidden"> Comentar</p>
        {post.comments}
      </button>
    </div>
  );
}
export default ActionPostButtons;
