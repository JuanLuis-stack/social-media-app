import { useAuth } from "../context/AuthContext";
import { Link, useParams } from "react-router-dom";
import useUserProfile from "../hooks/useUserProfile";
import { Column } from "../context/ColumnContext";
import GoBackArrow from "../components/GoBackArrow";
import ProfileColumn from "../components/ProfileColumn";

function Profile() {
  const { user_name } = useParams();
  const { loggedUser } = useAuth();
  const { loading, mainUserProfile, userProfile } = useUserProfile(user_name);

  if (!userProfile || userProfile.user_name === null)
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center px-10  md:px-20">
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
    );

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
