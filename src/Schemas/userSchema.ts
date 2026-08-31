import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  user_name: z.string().nullable(),
  presentation: z.string().nullable(),
});

export const userRetrivedSchema = z.object({
  message: z.string(),
  token: z.string(),
  user: userSchema,
});

export const userRetrivedByUserNameSchema = z.object({
  user: userSchema,
});

export type User = z.infer<typeof userSchema>;
export type UserRetrivedByUserName = z.infer<
  typeof userRetrivedByUserNameSchema
>;
export type UserRetrived = z.infer<typeof userRetrivedSchema>;
