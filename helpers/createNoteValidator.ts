import { z } from "zod";

export const NoteSchema = z.object({
  title: z
    .string()
    .nonempty("Title cannot be empty")
    .max(20, "Title cannot exceed 20 characters")
    .refine((value) => value.trim().length > 0, {
      message: "Title cannot consist of just empty spaces",
    }),
  content: z
    .string()
    .max(200, "Content cannot exceed 200 characters")
    .transform((value) => value.trim()),
});
