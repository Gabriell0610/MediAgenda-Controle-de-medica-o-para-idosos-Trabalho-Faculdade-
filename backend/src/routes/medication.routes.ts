import type { FastifyInstance } from "fastify";
import {
  createMedicationController,
  deleteMedicationController,
  listMedicationsController,
  updateMedicationController,
} from "../controllers/medication.controller";

export async function medicationRoutes(app: FastifyInstance): Promise<void> {
  app.post("/medications", createMedicationController);
  app.get("/medications", listMedicationsController);
  app.put("/medications/:id", updateMedicationController);
  app.delete("/medications/:id", deleteMedicationController);
}
