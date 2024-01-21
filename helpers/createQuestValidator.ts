import { z } from "zod";

export const QuestSchema = z.object({
  title: z
    .string()
    .nonempty("Title cannot be empty")
    .max(20, "Title cannot exceed 20 characters")
    .refine((value) => value.trim().length > 0, {
      message: "Title cannot consist of just empty spaces",
    }),
  status: z.string(),
  uid: z.string(),
  type: z.string(),
});
