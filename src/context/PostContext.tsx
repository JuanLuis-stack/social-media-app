import React, { createContext, useContext, useEffect, useState } from "react";
import {
  postsRetrivedSchema,
  type Post,
  type Posts,
} from "../Schemas/postSchema";
import { useAuth } from "./AuthContext";
import { getPosts } from "../services/postsService";

type PostContextType = {
  posts: Posts | null;
  setPosts: React.Dispatch<React.SetStateAction<Posts | null>>;
  loadPosts: () => void;
};

const PostContext = createContext<PostContextType | null>(null);

export function PostsProvider({ children }: { children: React.ReactNode }) {
  const { setLoggedUser } = useAuth();
  const [posts, setPosts] = useState<Post[] | null>(null);

  const { loggedUser } = useAuth();

  async function loadPosts() {
    try {
      if (!loggedUser) throw new Error("Unthorizate");

      const response = await getPosts(loggedUser.token);
      const data = postsRetrivedSchema.parse(response);

      setPosts(data.posts);
    } catch (error) {
      console.log(error);
      setLoggedUser(null);
      window.localStorage.href = "/login";
    }
  }

  useEffect(() => {
    loadPosts();
  }, [loggedUser]);

  return (
    <PostContext.Provider value={{ posts, setPosts, loadPosts }}>
      {children}
    </PostContext.Provider>
  );
}

export function UsePostContext() {
  const context = useContext(PostContext);

  if (!context) {
    throw new Error("context have to be a used as jsx");
  }

  return context;
}
