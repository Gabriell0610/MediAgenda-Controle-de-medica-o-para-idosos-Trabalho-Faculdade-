import type { FastifyInstance } from "fastify";
import { appointmentRoutes } from "./appointment.routes";
import { examRoutes } from "./exam.routes";
import { medicationRoutes } from "./medication.routes";
import { userRoutes } from "./user.routes";

export function registerRoutes(app: FastifyInstance): void {
  app.register(appointmentRoutes);
  app.register(medicationRoutes);
  app.register(examRoutes);
  app.register(userRoutes);
}
