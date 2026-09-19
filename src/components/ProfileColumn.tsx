import { useEffect, useState } from "react";
import { UseFollowProvider } from "../context/FollowContext";
import { UsePostContext } from "../context/PostContext";
import useUserProfile from "../hooks/useUserProfile";
import FollowButton from "./FollowButton";
import RenderPosts from "./RenderPosts";
import ScrollerContainer from "./ScrollerContainer";
import SubmitterPostCard from "./SubmitterPostCard";
import UserProfileHeader from "./UserProfileHeader";
import type { Posts } from "../Schemas/postSchema";

function ProfileColumn({ user_name }: { user_name: string | undefined }) {
  const { mainUserProfile, userProfile } = useUserProfile(user_name);
  const { isFollowing, follow, unFollow } = UseFollowProvider();
  const [posts, setPosts] = useState<Posts>();
  const { retrievePostsByUserName } = UsePostContext();

  useEffect(() => {
    async function retrievePosts() {
      if (!user_name) return;
      const result = await retrievePostsByUserName(user_name);
      if (!result) return;
      setPosts(result);
    }

    retrievePosts();
  }, [user_name, retrievePostsByUserName]);

  if (!posts || !user_name) return <p>Something went wrong</p>;

  return (
    <ScrollerContainer>
      <div className="px-7 py-7">
        <UserProfileHeader user={userProfile}></UserProfileHeader>
      </div>
      <div className="w-full flex justify-center gap-1 px-5">
        {mainUserProfile ? (
          <button className="border border-white/30 rounded-md px-2 py-1.5 flex justify-center items-center w-[92%] text-white text-sm font-semibold cursor-pointer hover:opacity-70">
            Editar perfil
          </button>
        ) : (
          <>
            <FollowButton
              user_name={user_name}
              isFollowing={isFollowing[user_name] ?? false}
              onFollow={() => follow(user_name)}
              onUnFollow={() => unFollow(user_name)}
            ></FollowButton>
            <button className="border border-white/30 rounded-md px-2 py-1.5 flex justify-center items-center w-[92%] text-white text-sm font-semibold cursor-pointer hover:opacity-70 ">
              Enviar mensage
            </button>
          </>
        )}
      </div>
      <div>
        <div className="w-full pt-6 flex justify-center items-center border-b border-white/30">
          <p className="text-white pb-2 px-4 border-b font-semibold h-full">
            Publicaciones
          </p>
        </div>
        {mainUserProfile && <SubmitterPostCard></SubmitterPostCard>}
        <RenderPosts posts={posts}></RenderPosts>
      </div>
    </ScrollerContainer>
  );
}

export default ProfileColumn;
