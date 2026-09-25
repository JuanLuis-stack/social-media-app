// schemas/commentSchema.js

const { z } = require("zod");

const commentSchema = z.object({
    content: z.string().min(1),
})

module.exports = commentSchema;