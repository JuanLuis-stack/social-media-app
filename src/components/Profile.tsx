import { useAuth } from "../context/AuthContext";
import ScrollerContainer from "./ScrollerContainer";
import UserProfileHeader from "./UserProfileHeader";
import SubmitterPostCard from "./SubmitterPostCard";
import RenderPosts from "./RenderPosts";
import { useEffect, useState } from "react";
import { postsRetrivedSchema, type Posts } from "../Schemas/postSchema";
import { getPostsByUserName } from "../services/postsService";
import { useNavigate, useParams } from "react-router-dom";
import { userSchema, type User } from "../Schemas/userSchema";
import { getUserData } from "../services/userService";

function Profile() {
  const navigate = useNavigate();
  const { user_name } = useParams();
  const { loggedUser } = useAuth();

  const [userPosts, setUserPosts] = useState<Posts | null>(null);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [mainUserPerfil, setMainUserPerfil] = useState(false);

  useEffect(() => {
    async function getCurrentUserProfile() {
      if (!loggedUser?.token) return;
      if (!user_name) return;

      if (loggedUser.user.user_name === user_name) {
        setMainUserPerfil(true);
      } else {
        setMainUserPerfil(false);
      }

      try {
        setLoading(true);
        const response = await getUserData(loggedUser.token, user_name);

        const data = userSchema.parse(response);
        setUserProfile(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getCurrentUserProfile();
  }, [user_name]);

  useEffect(() => {
    async function getUserPosts() {
      if (!loggedUser) return;
      if (!user_name) return;
      try {
        setLoading(true);

        const response = await getPostsByUserName(loggedUser.token, user_name);

        const data = postsRetrivedSchema.parse(response);
        setUserPosts(data.posts);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getUserPosts();
  }, [user_name]);

  if (!userProfile) return;

  if (loading) return <p>loading...</p>;
  return (
    <div className="w-full h-screen flex justify-between flex-col">
      <div className="h-[10%] flex items-center pl-7">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="cursor-pointer"
          onClick={() => navigate("/", { replace: true })}
        >
          <path d="M9 13h7v-2H9V7l-6 5 6 5z"></path>
          <path d="M19 3h-7v2h7v14h-7v2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2"></path>
        </svg>
        <p className="font-semibold text-xl text-white pl-3">
          {userProfile.user.name}
        </p>
      </div>
      <div className="w-screen md:w-[75%] h-[90%]">
        <ScrollerContainer>
          <UserProfileHeader user={userProfile.user}></UserProfileHeader>
          <div className="w-full flex justify-center gap-1 px-5">
            {mainUserPerfil ? (
              <button className="border border-white/30 rounded-md px-2 py-1.5 flex justify-center items-center w-[92%] text-white text-sm font-semibold cursor-pointer hover:opacity-70">
                Editar perfil
              </button>
            ) : (
              <>
                <button className="border bg-white border-white/30 rounded-md px-2 py-1.5 flex justify-center items-center w-[92%] text-black text-sm font-semibold cursor-pointer hover:opacity-70 mx-2">
                  Seguir
                </button>
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
            {mainUserPerfil && <SubmitterPostCard></SubmitterPostCard>}
            <RenderPosts posts={userPosts}></RenderPosts>
          </div>
        </ScrollerContainer>
      </div>
    </div>
  );
}

export default Profile;
