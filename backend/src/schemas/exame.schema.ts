import { z } from "zod";
import { dateRegex, timeRegex } from "../utils";

export const examIdParamsSchema = z.object({
  id: z.string().min(1, "id is required"),
});

export const createExamSchema = z.object({
  name: z.string().min(1, "name is required"),

  date: z.string().regex(dateRegex, "date must be YYYY-MM-DD"),

  time: z.string().regex(timeRegex, "time must be HH:mm"),

  address: z.string().min(1, "address is required"),

  preparation: z
    .string()
    .max(500, "preparation must have at most 500 characters")
    .optional(),

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

export const examPayloadExamples = {
  create: {
    name: "Hemograma",
    date: "2026-06-10",
    time: "08:00",
    address: "Laboratório Central",
    preparation: "Jejum de 8 horas",
    notes: "Levar documento com foto",
  },

  update: {
    time: "09:30",
    preparation: "Jejum alterado para 10 horas",
  },
} as const;
