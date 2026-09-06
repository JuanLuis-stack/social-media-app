import type React from "react";
import { useState } from "react";
import UnfollowConfirmation from "./UnfollowConfirmation";
import Spinner from "./Spinner";

function FollowButton({
  user_name,
  isFollowing,
  onFollow,
  onUnFollow,
  onConfirmationComplete,
}: {
  user_name: string;
  isFollowing: boolean;
  onFollow: () => Promise<void>;
  onUnFollow: () => Promise<void>;
  onConfirmationComplete?: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [unFollowCardVisible, setUnFollowCardVisible] = useState(false);

  async function handleOnFollow(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      setLoading(true);

      await onFollow();

      setError(null);
    } catch (error) {
      console.log(error);
      setError("Something went wrong...");
    } finally {
      setLoading(false);
    }
  }

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
            onConfirmationComplete?.();
          }}
          onCancel={() => {
            setUnFollowCardVisible(false);
            onConfirmationComplete?.();
          }}
        ></UnfollowConfirmation>
      )}
    </>
  ) : (
    <>
      <button
        disabled={loading}
        className={`border ${error ? "bg-red-500" : "bg-white"} border-white/30 rounded-xl px-2 py-1.5 flex justify-center items-center w-full ${error ? "text-white" : "text-black"} text-sm font-semibold ${error ? "cursor-not-allowed" : "cursor-pointer"} hover:opacity-70 mr-2 `}
        onClick={handleOnFollow}
      >
        {error ? (
          <p className="text-sm">Something went wrong</p>
        ) : loading ? (
          <Spinner />
        ) : (
          <p>seguir</p>
        )}
      </button>
    </>
  );
}

export default FollowButton;
