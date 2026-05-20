import type { FastifyInstance } from "fastify";
import { medicationRoutes } from "./medication.routes";

export function registerRoutes(app: FastifyInstance): void {
  app.register(medicationRoutes);
}
