import useUserProfile from "../hooks/useUserProfile";
import FollowButton from "./FollowButton";
import UserProfileHeader from "./UserProfileHeader";

function UserProfileMiniCard({
  user_name,
  isVisible,
}: {
  user_name: string;
  isVisible: boolean;
}) {
  const { mainUserProfile, userProfile, isFollowing, follow, unFollow } =
    useUserProfile(user_name);

  if (!isVisible) return null;

  return (
    <div className="w-77  max-h-120 min-h-40 animate-[fadeIn_250ms_ease] absolute top-6 z-10  backdrop-blur-3xl bg-black/60 border rounded-2xl border-[#333] p-6">
      <UserProfileHeader user={userProfile}></UserProfileHeader>
      <div className="w-full flex pt-4">
        {mainUserProfile ? (
          <button className="border border-white/30 rounded-md px-2 py-1.5 flex justify-center items-center w-full text-white text-sm font-semibold cursor-pointer hover:opacity-70">
            ver mi perfil
          </button>
        ) : (
          <>
            <FollowButton
              isFollowing={isFollowing}
              onFollow={follow}
              onUnFollow={unFollow}
            ></FollowButton>
            <button className="border border-white/30 rounded-xl px-2 py-1.5 flex justify-center items-center w-[92%] text-white text-sm font-semibold cursor-pointer hover:opacity-70 ">
              Enviar mensage
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default UserProfileMiniCard;
