import { z } from "zod";
import { dateRegex, timeRegex } from "../utils";

export const medicationIdParamsSchema = z.object({
  id: z.string().min(1, "id is required"),
});

export const createMedicationSchema = z.object({
  name: z.string().min(1, "name is required"),
  dosage: z.string().min(1, "dosage is required"),
  frequency: z.string().min(1, "frequency is required"),
  scheduleTimes: z
    .array(
      z.string().regex(timeRegex, "each schedule time must be in HH:mm format"),
    )
    .min(1, "at least one schedule time is required"),
  startDate: z
    .string()
    .regex(dateRegex, "startDate must be in YYYY-MM-DD format"),
  endDate: z
    .string()
    .regex(dateRegex, "endDate must be in YYYY-MM-DD format")
    .optional(),
  notes: z
    .string()
    .max(500, "notes must have at most 500 characters")
    .optional(),
});

export const updateMedicationSchema = createMedicationSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "at least one field must be provided for update",
  });

export type CreateMedicationInput = z.infer<typeof createMedicationSchema>;
export type UpdateMedicationInput = z.infer<typeof updateMedicationSchema>;
export type MedicationIdParams = z.infer<typeof medicationIdParamsSchema>;

export const medicationPayloadExamples = {
  create: {
    name: "Losartana",
    dosage: "50mg",
    frequency: "2x ao dia",
    scheduleTimes: ["08:00", "20:00"],
    startDate: "2026-05-20",
    endDate: "2026-12-31",
    notes: "Tomar após o café da manhã e após o jantar.",
  },
  update: {
    dosage: "100mg",
    scheduleTimes: ["09:00", "21:00"],
    notes: "Dose ajustada após consulta.",
  },
} as const;
