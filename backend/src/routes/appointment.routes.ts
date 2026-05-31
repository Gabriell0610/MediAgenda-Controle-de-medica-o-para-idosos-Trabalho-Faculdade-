import type { FastifyInstance } from "fastify";
import {
  createAppointmentController,
  deleteAppointmentController,
  listAppointmentsController,
  listAppointmentsTodayController,
  updateAppointmentController,
} from "../controllers/appointment.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export async function appointmentRoutes(app: FastifyInstance) {
  app.addHook("preHandler", authMiddleware);
  app.post("/appointments", createAppointmentController);
  app.get("/appointments", listAppointmentsController);
  app.get("/appointments/today", listAppointmentsTodayController);
  app.put("/appointments/:id", updateAppointmentController);
  app.delete("/appointments/:id", deleteAppointmentController);
}
