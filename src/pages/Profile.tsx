import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import useUserProfile from "../hooks/useUserProfile";
import { Column } from "../context/ColumnContext";
import GoBackArrow from "../components/GoBackArrow";
import ProfileColumn from "../components/ProfileColumn";

function Profile() {
  const { user_name } = useParams();
  const { loggedUser } = useAuth();
  const { loading, mainUserProfile, userProfile } = useUserProfile(user_name);

  if (!userProfile || userProfile.user_name === null)
    return <p className="text-red-500 font-bold">Something went wrong</p>;

  if (loading) return <p>loading...</p>;

  return (
    <Column id="profile">
      <div className="flex justify-center xl:justify-start w-full h-screen">
        <div className="overflow-hidden flex flex-col justify-between">
          {mainUserProfile ? (
            <div className="h-[13%] flex items-center pl-7">
              <p className="font-semibold text-xl text-white pl-3">
                {loggedUser?.user.user_name}
              </p>
            </div>
          ) : (
            <GoBackArrow name={userProfile.name}></GoBackArrow>
          )}
          <div className="w-screen md:w-xl h-[90%] rounded-t-3xl overflow-hidden">
            <ProfileColumn user_name={user_name}></ProfileColumn>
          </div>
        </div>
      </div>
    </Column>
  );
}

export default Profile;
