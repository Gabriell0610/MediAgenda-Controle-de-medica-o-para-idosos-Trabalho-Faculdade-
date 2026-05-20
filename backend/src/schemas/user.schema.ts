import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3, "name is required"),
  email: z.email("invalid email"),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
