import { z } from "zod";

const titleSchema = z.string().min(1).max(100);

const postSchema = z.object({
  title: titleSchema,
  content: z.string().min(1),
  author: z.string().min(1).max(100),
  c_type: z.string(),
});

export { postSchema, titleSchema };
