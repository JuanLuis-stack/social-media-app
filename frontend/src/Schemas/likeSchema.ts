import { z } from "zod";

export const likeSchema = z.object({
  post_id: z.number(),
  liked_by_current_user: z.boolean(),
  likes: z.string(),
});

export type Like = z.infer<typeof likeSchema>;
