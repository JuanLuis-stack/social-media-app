import { useEffect, useState } from "react";
import { userRetrivedByUserNameSchema, type User } from "../Schemas/userSchema";
import { followUser, getUserData, unFollowUser } from "../services/userService";
import { useAuth } from "../context/AuthContext";

function useUserProfile(user_name: string | undefined) {
  const { loggedUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [mainUserProfile, setMainUserProfile] = useState(false);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    async function getCurrentUserProfile() {
      if (!loggedUser?.token) return;
      if (!user_name) return;

      if (loggedUser.user.user_name === user_name) {
        setMainUserProfile(true);
      } else {
        setMainUserProfile(false);
      }

      try {
        setLoading(true);
        const response = await getUserData(loggedUser.token, user_name);

        const data = userRetrivedByUserNameSchema.parse(response);
        setUserProfile(data.user);
        setIsFollowing(data.user.is_current_user_following);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getCurrentUserProfile();
  }, [user_name, loggedUser]);

  async function follow() {
    if (!loggedUser?.token) return;
    if (!user_name) return;

    followUser(loggedUser.token, user_name);
    setIsFollowing(true);
  }
  async function unFollow() {
    if (!loggedUser?.token) return;
    if (!user_name) return;

    unFollowUser(loggedUser.token, user_name);
    setIsFollowing(false);
  }

  return {
    userProfile,
    mainUserProfile,
    loading,
    isFollowing,
    follow,
    unFollow,
  };
}

export default useUserProfile;
