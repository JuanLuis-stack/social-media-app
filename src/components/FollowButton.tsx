import type React from "react";

function FollowButton({
  isFollowing,
  onFollow,
  onUnFollow,
}: {
  isFollowing: boolean;
  onFollow: () => void;
  onUnFollow: () => void;
}) {
  return isFollowing ? (
    <button
      className="border bg-transparent border-white/30 rounded-xl px-2 py-1.5 flex justify-center items-center w-[92%] text-white text-sm font-semibold cursor-pointer hover:opacity-70 mr-2"
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onUnFollow();
      }}
    >
      siguiendo
    </button>
  ) : (
    <button
      className="border bg-white border-white/30 rounded-xl px-2 py-1.5 flex justify-center items-center w-[92%] text-black text-sm font-semibold cursor-pointer hover:opacity-70 mr-2"
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onFollow();
      }}
    >
      Seguir
    </button>
  );
}

export default FollowButton;
