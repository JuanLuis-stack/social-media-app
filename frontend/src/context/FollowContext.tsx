import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { followUser, unFollowUser } from "../services/userService";
import { followsRetrievedSchema } from "../Schemas/followsSchema";
import { getUserFollowers } from "../services/followService";

const FollowContext = createContext<{
  isFollowing: Record<string, boolean>;
  follow: (user_name: string) => Promise<void>;
  unFollow: (user_name: string) => Promise<void>;
} | null>(null);

export function FollowProvider({ children }: { children: React.ReactNode }) {
  const { loggedUser } = useAuth();
  const [isFollowing, setIsFollowing] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function fetchFollowedUsers() {
      if (!loggedUser?.token) return;
      try {
        const followedUsersData = await getUserFollowers(loggedUser.token);

        const followedUsers = followsRetrievedSchema.parse(followedUsersData);

        setIsFollowing(
          followedUsers.followed.reduce<Record<string, boolean>>(
            (acc, user) => {
              acc[user.user_name] = true;

              return acc;
            },
            {},
          ),
        );
      } catch (error) {
        console.log(error);
      }
    }

    fetchFollowedUsers();
  }, [loggedUser?.token]);

  async function follow(user_name: string) {
    if (!loggedUser?.token) return;
    if (!user_name) return;

    await followUser(loggedUser.token, user_name);
    setIsFollowing((prev) => ({ ...prev, [user_name]: true }));
  }

  async function unFollow(user_name: string) {
    if (!loggedUser?.token) return;
    if (!user_name) return;

    await unFollowUser(loggedUser.token, user_name);
    setIsFollowing((prev) => {
      const followers = { ...prev };
      delete followers[user_name];
      return followers;
    });
  }

  return (
    <FollowContext.Provider value={{ isFollowing, follow, unFollow }}>
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
