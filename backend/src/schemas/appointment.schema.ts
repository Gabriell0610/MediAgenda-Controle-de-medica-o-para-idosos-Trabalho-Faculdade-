import { z } from "zod";
import { dateRegex, timeRegex } from "../utils";

export const appointmentIdParamsSchema = z.object({
  id: z.string().min(1, "id is required"),
});

export const createAppointmentSchema = z.object({
  doctorName: z.string().min(1, "doctorName is required"),
  specialty: z.string().min(1, "specialty is required"),
  date: z.string().regex(dateRegex, "date must be YYYY-MM-DD"),
  time: z.string().regex(timeRegex, "time must be HH:mm"),
  address: z.string().min(1, "address is required"),
  notes: z
    .string()
    .max(500, "notes must have at most 500 characters")
    .optional(),
});

export const updateAppointmentSchema = createAppointmentSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "at least one field must be provided",
  });

export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>;
export type UpdateAppointmentInput = z.infer<typeof updateAppointmentSchema>;

export const appointmentPayloadExamples = {
  create: {
    doctorName: "Dr. João",
    specialty: "Cardiologia",
    date: "2026-06-10",
    time: "14:30",
    address: "Hospital Central",
    notes: "Levar exames anteriores",
  },

  update: {
    time: "16:00",
    notes: "Consulta remarcada",
  },
} as const;
