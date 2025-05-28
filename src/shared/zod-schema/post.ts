import { z } from "zod";

const titleSchema = z.string().min(1).max(100);

const postSchema = z.object({
  title: titleSchema,
  content: z.string().min(1),
  author: z.string().min(1).max(100),
  board: z.string(),
});

export { postSchema, titleSchema };
