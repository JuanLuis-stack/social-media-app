// schemas/authSchema.js

import z from "zod";

const resgisterSchema = z.object({
  id: z.number(),
  name: z.string().trim().min(1),
  user_name: z.string().trim().min(1),
  email: z.email(),
  password: z.coerce.string().min(8),
});

const loginSchema = z.object({
  email: z.email(),
  password: z.coerce.string().min(8),
});

export { resgisterSchema, loginSchema };
