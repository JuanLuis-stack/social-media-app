import { z } from "zod";

export const followsRetrievedSchema = z.object({
  message: z.string(),
  followed: z.array(
    z.object({
      user_name: z.string(),
    }),
  ),
});
