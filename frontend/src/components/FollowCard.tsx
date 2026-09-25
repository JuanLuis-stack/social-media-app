import { UseFollowProvider } from "../context/FollowContext";
import useUserProfile from "../hooks/useUserProfile";
import FollowButton from "./FollowButton";
import Overlay from "./Overlay";
import UserProfileHeader from "./UserProfileHeader";

function FollowCard({
  user_name,
  isFollowCardVisible,
  onUnVisibleFollowCard,
}: {
  user_name: string;
  isFollowCardVisible: boolean;
  onUnVisibleFollowCard: () => void;
}) {
  const { mainUserProfile, userProfile } = useUserProfile(user_name);
  const { isFollowing, follow, unFollow } = UseFollowProvider();

  if (!isFollowCardVisible) return null;

  return (
    <Overlay closerFunction={onUnVisibleFollowCard}>
      <div className="w-96 max-h-120 min-h-40 animate-[fadeIn_250ms_ease] bg-linear-to-tr from-[#111] via-[#191919] to-[#111] border-t border-l rounded-2xl border-l-white/25 border-t-white/25 p-6">
        <UserProfileHeader user={userProfile}></UserProfileHeader>
        <div className="w-full flex pt-3">
          {mainUserProfile ? (
            <button className="border border-white/30 rounded-md px-2 py-1.5 flex justify-center items-center w-full text-white text-sm font-semibold cursor-pointer hover:opacity-70">
              View my profile
            </button>
          ) : (
            <div className="w-full">
              <FollowButton
                user_name={user_name}
                isFollowing={isFollowing?.[user_name] || false}
                onFollow={() => follow(user_name)}
                onUnFollow={() => unFollow(user_name)}
              ></FollowButton>
            </div>
          )}
        </div>
      </div>
    </Overlay>
  );
}

export default FollowCard;
