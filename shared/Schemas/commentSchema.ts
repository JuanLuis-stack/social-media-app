import { z } from "zod";

export const commentSchema = z.object({
  id: z.number(),
  content: z.string(),
  post_id: z.number(),
  created_at: z.string(),
  user_id: z.number(),
  author: z.string(),
});

export const commentsSchema = z.array(commentSchema);

export const renderCommentsSchema = z.object({
  message: z.string(),
  comment: commentsSchema,
  comments: z.number(),
});

export type Comments = z.infer<typeof commentsSchema>;

export type CommentsProp = {
  comments: Comments;
};

export type RenderCommentProps = z.infer<typeof renderCommentsSchema>;
export type Comment = z.infer<typeof commentSchema>;
