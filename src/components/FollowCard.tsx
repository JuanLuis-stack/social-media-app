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
  const { mainUserProfile, userProfile, isFollowing, follow, unFollow } =
    useUserProfile(user_name);

  if (!isFollowCardVisible) return null;

  return (
    <Overlay closerFunction={onUnVisibleFollowCard}>
      <div className="w-96 max-h-120 min-h-40 animate-[fadeIn_250ms_ease] backdrop-blur-3xl bg-black/20 border rounded-2xl border-[#333] border-l-white/30 border-t-white/30 p-6">
        <UserProfileHeader user={userProfile}></UserProfileHeader>
        <div className="w-full flex pt-4">
          {mainUserProfile ? (
            <button className="border border-white/30 rounded-md px-2 py-1.5 flex justify-center items-center w-full text-white text-sm font-semibold cursor-pointer hover:opacity-70">
              ver mi perfil
            </button>
          ) : (
            <div className="w-full">
              <FollowButton
                isFollowing={isFollowing}
                onFollow={follow}
                onUnFollow={unFollow}
              ></FollowButton>
            </div>
          )}
        </div>
      </div>
    </Overlay>
  );
}

export default FollowCard;
