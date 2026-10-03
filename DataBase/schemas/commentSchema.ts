// schemas/commentSchema.js

import z from "zod";

const commentSchema = z.object({
  content: z.string().min(1),
});

export { commentSchema };
