import { z } from "zod";

export const followsRetrievedSchema = z.object({
  message: z.string(),
  followed: z.array(
    z.object({
      user_name: z.string(),
    }),
  ),
});

export type Follow = {
  id: number;
  follower_id: number;
  following_id: number;
  created_at: string;
};
