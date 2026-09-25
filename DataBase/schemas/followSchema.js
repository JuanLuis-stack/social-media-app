const { z } = require("zod");

const followSchema = z.object({
  following_userName: z.string(),
});

module.exports = followSchema;
