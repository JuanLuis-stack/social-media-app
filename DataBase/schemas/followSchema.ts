import z from "zod";

const followSchema = z.object({
  following_userName: z.string(),
});

export default followSchema;
