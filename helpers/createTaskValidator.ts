import { z } from "zod";

export const TaskSchema = z.object({
  uid: z.string(),
  taskId: z.string(),
  title: z
    .string()
    .min(1, "Title cannot be empty")
    .max(20, "Title cannot exceed 20 characters")
    .refine((value) => value.trim().length > 0, {
      message: "Title cannot consist of just empty spaces",
    }),
  date: z.string().min(1, "Date cannot be empty"),
  hour: z.string().min(1, "Hour cannot be empty"),
});
