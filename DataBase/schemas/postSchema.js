// schemas/postSchema.js

const { z } = require("zod");

const postSchema = z.object({
    title: z.string().trim().min(1),
    content: z.string().trim().min(1),
})

module.exports = postSchema