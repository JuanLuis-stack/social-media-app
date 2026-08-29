import { useEffect, useState } from "react";
import { userSchema, type User } from "../Schemas/userSchema";
import { getUserData } from "../services/userService";
import { useAuth } from "../context/AuthContext";

function useUserProfile(user_name: string | undefined) {
  const { loggedUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [mainUserProfile, setMainUserProfile] = useState(false);
  const [userProfile, setUserProfile] = useState<User | null>(null);

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

        const data = userSchema.parse(response);
        setUserProfile(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getCurrentUserProfile();
  }, [user_name, loggedUser]);

  return {
    userProfile,
    mainUserProfile,
    loading,
  };
}

export default useUserProfile;
