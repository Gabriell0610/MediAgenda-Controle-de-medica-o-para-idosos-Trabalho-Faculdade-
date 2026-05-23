import type { FastifyInstance } from "fastify";
import { createUserController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export async function userRoutes(app: FastifyInstance) {
  app.addHook("preHandler", authMiddleware);
  app.post("/users", createUserController);
}
