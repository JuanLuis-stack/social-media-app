import { useRef } from "react";
import type { Post } from "../Schemas/postSchema";
import { UseAnimation } from "../context/AnimationContext";

function ImagePlayer({ post }: { post: Post }) {
  const imgContainerRef = useRef<HTMLDivElement>(null);

  const { animate, activeAnimation } = UseAnimation();

  async function activeFullScreen() {
    const container = imgContainerRef.current;
    if (!container) return;

    setTimeout(() => {
      container.requestFullscreen();
    }, 400);
  }

  function closeFullScreen() {
    document.exitFullscreen();
  }

  return (
    <div
      ref={imgContainerRef}
      className="relative group [&:fullscreen]:w-screen [&:fullscreen]:bg-gray-950 [&:fullscreen]:flex [&:fullscreen]:justify-center "
    >
      <img
        id={`image-${post.id}-container`}
        className={`rounded-xl p-1 group-[&:fullscreen]:min-h-screen group-[&:fullscreen]:rounded-none max-h-100 ${animate == `image-${post.id}-container` && "animate-[spanIn_400ms_ease]"}`}
        onClick={() => {
          activeAnimation(`image-${post.id}-container`);
          activeFullScreen();
        }}
        src={`${import.meta.env.VITE_SERVER_URL}/uploads/${post.media_url}`}
        alt=""
      />

      <button
        onClick={(e) => {
          e.stopPropagation();
          closeFullScreen();
        }}
        className="z-10 max-h-100 hidden group-[&:fullscreen]:inline absolute top-10 left-10 p-2 rounded-full cursor-pointer bg-white/7 scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="m9.88 12.71-4.95 4.95 1.41 1.41 2.83-2.83L12 13.41l2.12 2.13 3.54 3.53 1.41-1.41-4.95-4.95-.71-.71 5.66-5.66-1.41-1.41L12 10.59 6.34 4.93 4.93 6.34 10.59 12z"></path>
        </svg>
      </button>
    </div>
  );
}

export default ImagePlayer;
