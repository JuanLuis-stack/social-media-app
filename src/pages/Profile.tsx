import { useAuth } from "../context/AuthContext";
import ScrollerContainer from "../components/ScrollerContainer";
import UserProfileHeader from "../components/UserProfileHeader";
import SubmitterPostCard from "../components/SubmitterPostCard";
import RenderPosts from "../components/RenderPosts";
import { useEffect, useState } from "react";
import { postsRetrivedSchema, type Posts } from "../Schemas/postSchema";
import { getPostsByUserName } from "../services/postsService";
import { useNavigate, useParams } from "react-router-dom";
import useUserProfile from "../hooks/useUserProfile";
import FollowButton from "../components/FollowButton";
import { UseFollowProvider } from "../context/FollowContext";

function Profile() {
  const navigate = useNavigate();
  const { user_name } = useParams();
  const { loggedUser } = useAuth();
  const [userPosts, setUserPosts] = useState<Posts | null>(null);
  const { loading, mainUserProfile, userProfile } = useUserProfile(user_name);
  const { isFollowing, follow, unFollow } = UseFollowProvider();

  useEffect(() => {
    async function getUserPosts() {
      if (!loggedUser) return;
      if (!user_name) return;
      try {
        const response = await getPostsByUserName(loggedUser.token, user_name);

        const data = postsRetrivedSchema.parse(response);
        setUserPosts(data.posts);
      } catch (error) {
        console.log(error);
      }
    }
    getUserPosts();
  }, [user_name, loggedUser]);

  if (!user_name || !userProfile || userProfile.user_name === null) {
    return <p className="text-red-500 font-bold">Something went wrong</p>;
  }

  if (loading) return <p>loading...</p>;

  return (
    <div className="flex justify-center xl:justify-start w-full h-screen">
      <div className="overflow-hidden flex flex-col justify-between">
        <div className="h-[10%] flex items-center justify-start pl-7">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="cursor-pointer"
            onClick={() => {
              if (window.history.length > 1) {
                navigate(-1);
              } else {
                navigate(`/`);
              }
            }}
          >
            <path d="M9 13h7v-2H9V7l-6 5 6 5z"></path>
            <path d="M19 3h-7v2h7v14h-7v2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2"></path>
          </svg>
          <p className="font-semibold text-xl text-white pl-3">
            {userProfile.name}
          </p>
        </div>
        <div className="w-screen md:w-xl h-[90%] rounded-t-3xl overflow-hidden">
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
              <RenderPosts posts={userPosts}></RenderPosts>
            </div>
          </ScrollerContainer>
        </div>
      </div>
    </div>
  );
}

export default Profile;
