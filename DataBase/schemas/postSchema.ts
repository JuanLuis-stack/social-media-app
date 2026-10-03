// schemas/postSchema.js

import { z } from "zod";

const postSchema = z.object({
  title: z.string().trim().min(1),
  content: z.string().trim().min(1),
});

export default postSchema;
