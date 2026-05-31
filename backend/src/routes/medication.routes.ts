import type { FastifyInstance } from "fastify";
import {
  createMedicationController,
  deleteMedicationController,
  listMedicationsController,
  listMedicationsTodayController,
  updateMedicationController,
} from "../controllers/medication.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export async function medicationRoutes(app: FastifyInstance) {
  app.addHook("preHandler", authMiddleware);
  app.post("/medications", createMedicationController);
  app.get("/medications", listMedicationsController);
  app.get("/medications/today", listMedicationsTodayController);
  app.put("/medications/:id", updateMedicationController);
  app.delete("/medications/:id", deleteMedicationController);
}
