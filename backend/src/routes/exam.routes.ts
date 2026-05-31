import type { FastifyInstance } from "fastify";
import {
  createExamController,
  deleteExamController,
  listExamsController,
  listExamsControllerToday,
  updateExamController,
} from "../controllers/exam.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export async function examRoutes(app: FastifyInstance) {
  app.addHook("preHandler", authMiddleware);
  app.post("/exams", createExamController);
  app.get("/exams", listExamsController);
  app.get("/exams/today", listExamsControllerToday);
  app.put("/exams/:id", updateExamController);
  app.delete("/exams/:id", deleteExamController);
}
