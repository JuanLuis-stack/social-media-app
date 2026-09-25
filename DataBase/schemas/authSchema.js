// schemas/authSchema.js

const { z } = require("zod");

const resgisterSchema = z.object({
  name: z.string().trim().min(1),
  user_name: z.string().trim().min(1),
  email: z.email(),
  password: z.coerce.string().min(8),
});

const loginSchema = z.object({
  email: z.email(),
  password: z.coerce.string().min(8),
});

module.exports = { resgisterSchema, loginSchema };
