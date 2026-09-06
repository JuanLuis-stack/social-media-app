import { UseFollowProvider } from "../context/FollowContext";
import useUserProfile from "../hooks/useUserProfile";
import FollowButton from "./FollowButton";
import UserProfileHeader from "./UserProfileHeader";

function UserProfileMiniCard({
  user_name,
  onCloseMiniProfileCard,
}: {
  user_name: string;
  onCloseMiniProfileCard: () => void;
}) {
  const { mainUserProfile, userProfile } = useUserProfile(user_name);
  const { isFollowing, follow, unFollow } = UseFollowProvider();

  return (
    <div className="w-77  max-h-70 min-h-40 animate-[fadeIn_400ms_ease] absolute top-6 z-10  backdrop-blur-3xl bg-black/60 border rounded-2xl border-[#333] p-6">
      {!userProfile ? (
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-red-500 font-bold">Something went wrong...</p>
        </div>
      ) : (
        <>
          <UserProfileHeader user={userProfile}></UserProfileHeader>
          <div className="w-full flex pt-4">
            {mainUserProfile ? (
              <button className="border border-white/30 rounded-md px-2 py-1.5 flex justify-center items-center w-full text-white text-sm font-semibold cursor-pointer hover:opacity-70">
                ver mi perfil
              </button>
            ) : (
              <>
                <FollowButton
                  user_name={user_name}
                  isFollowing={isFollowing[user_name] ?? false}
                  onFollow={() => follow(user_name)}
                  onUnFollow={() => unFollow(user_name)}
                  onConfirmationComplete={onCloseMiniProfileCard}
                ></FollowButton>
                <button className="border border-white/30 rounded-xl px-2 py-1.5 flex justify-center items-center w-[92%] text-white text-sm font-semibold cursor-pointer hover:opacity-70 ">
                  Enviar mensage
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default UserProfileMiniCard;
