// postSchema.ts

import { z } from "zod";

const postSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  created_at: z.string(),
  user_name: z.string(),
  media_url: z.string().nullable(),
  media_type: z.string().nullable(),
  likes: z.string(),
  comments: z.string(),
  name: z.string(),
  liked_by_current_user: z.boolean(),
});

export const postRetrivedSchema = z.object({
  message: z.string(),
  user: postSchema.omit({
    likes: true,
    comments: true,
    name: true,
    liked_by_current_user: true,
  }),
});

export const postsSchema = z.array(postSchema);

export const postsRetrivedSchema = z.object({
  message: z.string(),
  posts: z.array(postSchema),
});

export type SubmitPostType = {
  title: string;
  content: string;
  media: File | null;
};

export type RenderPostsType = {
  posts: Posts | null;
  setPosts: React.Dispatch<React.SetStateAction<Posts | null>>;
};
export type RenderPostType = {
  post: Post;
  setPosts: React.Dispatch<React.SetStateAction<Posts | null>>;
};

export type Post = z.infer<typeof postSchema>;
export type Posts = z.infer<typeof postsSchema>;
export type PostsRetrived = z.infer<typeof postsRetrivedSchema>;

export type RenderPostProps = {
  post: Post;
};
export type RenderPostsProps = {
  posts: Posts;
};
