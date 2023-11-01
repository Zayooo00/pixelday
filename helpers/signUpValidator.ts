import { z } from "zod";

export const SignUpSchema = z.object({
  email: z
    .string()
    .min(1, "Email field can't be empty")
    .email("Invalid email address"),
  username: z
    .string()
    .min(4, "Username must be longer than 4 characters")
    .regex(/^[a-zA-Z0-9]+$/, "Username can't have special characters"),
  password: z.string().min(8, "Password must have at least 8 characters"),
});
