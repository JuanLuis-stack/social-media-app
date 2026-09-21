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
import { Link } from "react-router-dom";

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

  if (!posts || !user_name)
    return (
      <ScrollerContainer>
        <div className="h-full w-full flex flex-col items-center justify-start md:p-20 @max-[400px]:p-10">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              fill="#f11"
              viewBox="0 0 24 24"
            >
              <path d="m20.42 6.11-7.97-4c-.28-.14-.62-.14-.9 0l-7.97 4c-.31.15-.51.45-.55.79-.01.11-.96 10.76 8.55 15.01a.98.98 0 0 0 .82 0C21.91 17.66 20.97 7 20.95 6.9a.98.98 0 0 0-.55-.79ZM12 19.9C5.26 16.63 4.94 9.64 5 7.64l7-3.51 7 3.51c.04 1.99-.33 9.02-7 12.26"></path>
              <path d="M11 11h2v6h-2zm0-4h2v2h-2z"></path>
            </svg>
          </div>
          <p className="text-red-500 text-sm max-w-md text-center">
            Something went wrong, most probably your token is expired, log in so
            you can keep using our app{" "}
            <Link to="/login" className="text-sm underline text-red-500">
              go back to log in.
            </Link>
          </p>
        </div>
      </ScrollerContainer>
    );

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
