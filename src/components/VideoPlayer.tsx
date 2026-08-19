import { useEffect, useRef, useState } from "react";
import { UseAnimation } from "../context/AnimationContext";

type VideoPlayerType = {
  videoUrl: string;
  videoType: string;
};

function VideoPlayer({ videoUrl, videoType }: VideoPlayerType) {
  const { animate, activeAnimation } = UseAnimation();
  const [muted, setMuted] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      },
      {
        threshold: 0.7,
      },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  function toggleMuted() {
    const video = videoRef.current;

    if (!video) return;

    setMuted((prevVideo) => !prevVideo);
  }

  function activeFullScreen() {
    const video = videoRef.current;
    if (!video) return;

    setTimeout(() => {
      video.requestFullscreen();
    }, 400);
  }

  return (
    <div
      id={`video-${videoUrl}-Container`}
      className={`w-fit relative ${animate === `video-${videoUrl}-Container` && "animate-[spanIn_400ms_ease]"}`}
      onClick={() => {
        activeAnimation(`video-${videoUrl}-Container`);
        activeFullScreen();
      }}
    >
      <video
        muted={muted}
        loop
        className="max-h-100 rounded-2xl p-2"
        ref={videoRef}
      >
        <source
          src={`${import.meta.env.VITE_SERVER_URL}/uploads/${videoUrl}`}
          type={videoType}
        />
        Your browser does not support the video tag.
      </video>
      <svg
        id="volumeIcon"
        onClick={(e) => {
          e.stopPropagation();
          activeAnimation("volumeIcon");
          toggleMuted();
        }}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
        className={`absolute bottom-4 bg-black/65 right-4 cursor-pointer hover:bg-black/30 p-1 rounded-full duration-300 scale-120 ${animate === "volumeIcon" && "animate-[spanIn_400ms_ease]"}`}
      >
        {muted ? (
          <path d="M22 12c0-4.09-2.47-7.61-6-9.16v2.24c2.39 1.39 4 3.96 4 6.92 0 1.85-.64 3.54-1.69 4.89l-1.42-1.42c.7-.98 1.12-2.17 1.12-3.47 0-1.77-.78-3.36-2-4.46v7.05l-2-2V4c0-.37-.2-.71-.53-.88s-.72-.15-1.03.05L7.73 6.32 2.71 1.29 1.3 2.7l4.29 4.29L14 15.4l2.9 2.9 1.42 1.42 2.97 2.97 1.41-1.41-2.98-2.98a9.94 9.94 0 0 0 2.27-6.32ZM2 9v6c0 1.1.9 2 2 2h2.7l5.75 3.83c.17.11.36.17.55.17.16 0 .32-.04.47-.12.33-.17.53-.51.53-.88v-1.76L3.02 7.27C2.41 7.61 2 8.26 2 9"></path>
        ) : (
          <>
            <path d="M4 17h2.7l5.75 3.83c.17.11.36.17.55.17.16 0 .32-.04.47-.12.33-.17.53-.51.53-.88V4c0-.37-.2-.71-.53-.88s-.72-.15-1.03.05L6.69 7h-2.7c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2Zm18-5c0-4.09-2.47-7.61-6-9.16v2.24c2.39 1.39 4 3.96 4 6.92s-1.61 5.53-4 6.92v2.24c3.53-1.55 6-5.07 6-9.16"></path>
            <path d="M18 12c0-1.77-.78-3.36-2-4.46v8.92c1.22-1.1 2-2.69 2-4.46"></path>
          </>
        )}
      </svg>
    </div>
  );
}

export default VideoPlayer;
