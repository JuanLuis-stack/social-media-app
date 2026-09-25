const { z } = require("zod")

const userEditSchema = z.object({
    name: z.string().trim().min(1).optional(),
    email: z.string().email().optional(),
})

module.exports = userEditSchema