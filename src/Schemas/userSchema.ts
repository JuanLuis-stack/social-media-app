import { z } from "zod";

export const userRetrivedSchema = z.object({
  message: z.string(),
  token: z.string(),
  user: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    user_name: z.string().nullable(),
    presentation: z.string().nullable(),
  }),
});

export const userSchema = userRetrivedSchema.pick({
  user: true,
});

export type User = z.infer<typeof userSchema>;
export type UserRetrived = z.infer<typeof userRetrivedSchema>;
