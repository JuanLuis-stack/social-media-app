import { z } from "zod";

export const userSchema = z.object({
  message: z.string(),
  token: z.string(),
  user: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
  }),
});

export type User = z.infer<typeof userSchema>;
