import { z } from "zod";

export const commentSchema = z.object({
  id: z.number(),
  content: z.string(),
  post_id: z.number(),
  created_at: z.string(),
  user_id: z.number(),
  author: z.string(),
});

export const commentsSchema = z.array(commentSchema); // Not secure yet

export const renderCommentsSchema = z.object({
  message: z.string(),
  comment: commentsSchema,
  comments: z.number(),
});

export type CommentProps = z.infer<typeof commentsSchema>; // Not secure yet

export type CommentsProp = {
  comments: CommentProps;
};

export type RenderCommentProps = z.infer<typeof renderCommentsSchema>;
export type Comment = z.infer<typeof commentSchema>;
