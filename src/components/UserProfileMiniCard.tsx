import { UseFollowProvider } from "../context/FollowContext";
import useUserProfile from "../hooks/useUserProfile";
import FollowButton from "./FollowButton";
import UserProfileHeader from "./UserProfileHeader";

function UserProfileMiniCard({
  user_name,
  cardPlacement,
  onCloseMiniProfileCard,
}: {
  user_name: string;
  cardPlacement: "below" | "above";
  onCloseMiniProfileCard: () => void;
}) {
  const { mainUserProfile, userProfile } = useUserProfile(user_name);
  const { isFollowing, follow, unFollow } = UseFollowProvider();

  return (
    <div
      className={`w-73 max-h-70 min-h-40 animate-[fadeIn_400ms_ease] absolute ${cardPlacement === "above" ? "bottom-[55%] mb-2" : "top-full"} -left-6 z-10 bg-linear-to-tr from-[#111] via-[#191919] to-[#111] border-t border-l rounded-2xl border-l-white/25 border-t-white/25 p-5`}
    >
      {!userProfile ? (
        <div className="w-full h-full mt-6 flex flex-col justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="#f11"
            viewBox="2 2 20 20"
          >
            <path d="M11 7h2v6h-2zm0 8h2v2h-2z"></path>
            <path d="M12 22c5.51 0 10-4.49 10-10S17.51 2 12 2 2 6.49 2 12s4.49 10 10 10m0-18c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8"></path>
          </svg>
          <p className="text-red-500 font-bold">Something went wrong...</p>
        </div>
      ) : (
        <>
          <UserProfileHeader user={userProfile}></UserProfileHeader>
          <div className="w-full flex pt-2">
            {mainUserProfile ? (
              <button className="border border-white/30 rounded-md px-2 py-1.5 flex justify-center items-center w-full text-white text-sm font-semibold cursor-pointer hover:opacity-70">
                View my profile
              </button>
            ) : (
              <div className="h-8 w-full flex">
                <FollowButton
                  user_name={user_name}
                  isFollowing={isFollowing[user_name] ?? false}
                  onFollow={() => follow(user_name)}
                  onUnFollow={() => unFollow(user_name)}
                  onConfirmationComplete={onCloseMiniProfileCard}
                ></FollowButton>
                <button className="border border-white/30 rounded-xl px-2 py-1.5 flex justify-center items-center w-[92%] text-white text-xs font-semibold cursor-pointer hover:opacity-70 ">
                  Send message
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default UserProfileMiniCard;
