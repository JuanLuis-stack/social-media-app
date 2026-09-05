import type React from "react";
import { useState } from "react";
import UnfollowConfirmation from "./UnfollowConfirmation";

function FollowButton({
  user_name,
  isFollowing,
  onFollow,
  onUnFollow,
  onUnFollowComplete,
}: {
  user_name: string;
  isFollowing: boolean;
  onFollow: () => void;
  onUnFollow: () => void;
  onUnFollowComplete?: () => void;
}) {
  const [unFollowCardVisible, setUnFollowCardVisible] = useState(false);

  return isFollowing ? (
    <>
      <button
        className="border bg-transparent border-white/30 rounded-xl px-2 py-1.5 flex justify-center items-center w-full text-white text-sm font-semibold cursor-pointer hover:opacity-70 mr-2"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          setUnFollowCardVisible(true);
        }}
      >
        siguiendo
      </button>
      {unFollowCardVisible && (
        <UnfollowConfirmation
          user_name={user_name}
          onConfirm={async () => {
            await onUnFollow();
            setUnFollowCardVisible(false);
            onUnFollowComplete?.();
          }}
          onCancel={() => {
            setUnFollowCardVisible(false);
            onUnFollowComplete?.();
          }}
        ></UnfollowConfirmation>
      )}
    </>
  ) : (
    <button
      className="border bg-white border-white/30 rounded-xl px-2 py-1.5 flex justify-center items-center w-full text-black text-sm font-semibold cursor-pointer hover:opacity-70 mr-2"
      onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await onFollow();
      }}
    >
      Seguir
    </button>
  );
}

export default FollowButton;
