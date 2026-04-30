import { z } from "zod";

const titleField = z
  .string()
  .min(1, "Title cannot be empty")
  .max(20, "Title cannot exceed 20 characters")
  .refine((value) => value.trim().length > 0, {
    message: "Title cannot consist of just empty spaces",
  });

export const NoteSchema = z.object({
  title: titleField,
  content: z
    .string()
    .max(200, "Content cannot exceed 200 characters")
    .transform((value) => value.trim()),
});

export const QuestSchema = z.object({
  title: titleField,
  status: z.string(),
  uid: z.string(),
  type: z.string(),
});

export const TaskSchema = z.object({
  uid: z.string(),
  taskId: z.string(),
  title: titleField,
  date: z.string().min(1, "Date cannot be empty"),
  hour: z.string().min(1, "Hour cannot be empty"),
});
