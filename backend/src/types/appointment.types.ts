import type { CreateAppointmentInput } from "../schemas/appointment.schema";

export type Appointment = CreateAppointmentInput & {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};
