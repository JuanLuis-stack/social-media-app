import type { Post, Posts } from "../../../shared/Schemas/postSchema";

export type RenderPostsType = {
  posts: Posts | null;
  setPosts: React.Dispatch<React.SetStateAction<Posts | null>>;
};
export type RenderPostType = {
  post: Post;
  setPosts: React.Dispatch<React.SetStateAction<Posts | null>>;
};
