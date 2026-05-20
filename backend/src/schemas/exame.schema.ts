import { z } from "zod";
import { dateRegex } from "../utils";

export const examIdParamsSchema = z.object({
  id: z.string().min(1, "id is required"),
});

export const createExamSchema = z.object({
  name: z.string().min(1, "name is required"),

  date: z.string().regex(dateRegex, "date must be YYYY-MM-DD"),

  place: z.string().min(1, "place is required"),

  notes: z
    .string()
    .max(500, "notes must have at most 500 characters")
    .optional(),
});

export const updateExamSchema = createExamSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "at least one field must be provided",
  });

export type CreateExamInput = z.infer<typeof createExamSchema>;
export type UpdateExamInput = z.infer<typeof updateExamSchema>;
