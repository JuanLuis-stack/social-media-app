import React, { createContext, useContext, useEffect, useState } from "react";
import {
  postRetrivedSchema,
  postsRetrivedSchema,
  type Post,
  type Posts,
} from "../Schemas/postSchema";
import { useAuth } from "./AuthContext";
import {
  getComments,
  getPostById,
  getPosts,
  getPostsByUserName,
  likePost,
} from "../services/postsService";
import { renderCommentsSchema, type Comments } from "../Schemas/commentSchema";
import { likeSchema } from "../Schemas/likeSchema";

type PostContextType = {
  posts: Posts | null;
  setPosts: React.Dispatch<React.SetStateAction<Posts | null>>;
  loadPosts: () => void;
  getPostById: (id: string) => Promise<Post | undefined>;
  getCommentsByUserId: (id: number) => Promise<Comments | undefined>;
  likeEvent: (
    id: number,
    post: Post,
    onUpdatedPost?: (updatedPost: Post) => void,
  ) => Promise<void>;
  retrievePostsByUserName: (user_name: string) => Promise<Posts | undefined>;
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

  async function retrievePostById(id: string) {
    try {
      if (!loggedUser) throw new Error("Unthorizate");

      const response = await getPostById(loggedUser.token, id);
      const data = postRetrivedSchema.parse(response);

      return data.post;
    } catch (error) {
      console.log(error);
    }
  }

  async function getCommentsByUserId(id: number) {
    if (!loggedUser?.token) return;

    try {
      const response = await getComments(loggedUser.token, id);
      const data = renderCommentsSchema.parse(response);

      setPosts((prev) =>
        !prev
          ? null
          : prev.map((currentPost) =>
              currentPost.id === id
                ? {
                    ...currentPost,
                    comments: String(data.comments),
                  }
                : currentPost,
            ),
      );

      return data.comment;
    } catch (error) {
      console.log(error);
    }
  }
  async function likeEvent(
    id: number,
    post: Post,
    onUpdatedPost?: (updatedPost: Post) => void,
  ) {
    if (!loggedUser) return;
    const response = await likePost(loggedUser?.token, id);
    const liked = likeSchema.parse(response);

    const updatedPost = {
      ...post,
      liked_by_current_user: liked.liked_by_current_user,
      likes: liked.likes,
    };

    setPosts((prev) =>
      !prev ? null : prev.map((post) => (post.id === id ? updatedPost : post)),
    );

    onUpdatedPost?.(updatedPost);
  }

  async function retrievePostsByUserName(user_name: string) {
    if (!loggedUser) return;
    if (!user_name) return;
    try {
      const response = await getPostsByUserName(loggedUser.token, user_name);

      const data = postsRetrivedSchema.parse(response);
      return data.posts;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadPosts();
  }, [loggedUser]);

  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
        loadPosts,
        getPostById: retrievePostById,
        getCommentsByUserId,
        likeEvent,
        retrievePostsByUserName,
      }}
    >
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
