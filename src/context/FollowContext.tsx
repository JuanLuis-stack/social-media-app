import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { followUser, unFollowUser } from "../services/userService";
import { followsRetrievedSchema } from "../Schemas/followsSchema";
import { getUserFollowers } from "../services/followService";

const FollowContext = createContext<{
  isFollowing: Record<string, boolean> | null;
  setIsFollowing: React.Dispatch<
    React.SetStateAction<Record<string, boolean> | null>
  >;
  follow: (user_name: string) => Promise<void>;
  unFollow: (user_name: string) => Promise<void>;
} | null>(null);

export function FollowProvider({ children }: { children: React.ReactNode }) {
  const { loggedUser } = useAuth();
  const [isFollowing, setIsFollowing] = useState<Record<
    string,
    boolean
  > | null>(null);

  useEffect(() => {
    if (!loggedUser?.token) return;

    async function fetchFollowedUsers() {
      if (!loggedUser?.token) return;
      const followedUsersData = await getUserFollowers(loggedUser.token);

      const followedUsers = followsRetrievedSchema.parse(followedUsersData);

      setIsFollowing(
        followedUsers.followed.reduce<Record<string, boolean>>((acc, user) => {
          acc[user.user_name] = true;

          return acc;
        }, {}),
      );
    }

    fetchFollowedUsers();
  }, [loggedUser?.token]);

  async function follow(user_name: string) {
    if (!loggedUser?.token) return;
    if (!user_name) return;

    console.log("follow", user_name);
    await followUser(loggedUser.token, user_name);
    setIsFollowing((prev) => ({ ...prev, [user_name]: true }));
  }
  async function unFollow(user_name: string) {
    if (!loggedUser?.token) return;
    if (!user_name) return;

    console.log("unFollow", user_name);
    await unFollowUser(loggedUser.token, user_name);
    setIsFollowing((prev) => ({ ...prev, [user_name]: false }));
  }

  return (
    <FollowContext.Provider
      value={{ isFollowing, setIsFollowing, follow, unFollow }}
    >
      {children}
    </FollowContext.Provider>
  );
}

export function UseFollowProvider() {
  const context = useContext(FollowContext);

  if (!context) {
    throw new Error("useFollowProvider must be used inside FollowProvider");
  }
  return context;
}
