import Fastify from "fastify";
import cors from "@fastify/cors";
import { registerErrorHandler } from "../middlewares/error-handler";
import { registerRoutes } from "../routes";

export const app = Fastify();

app.register(cors, {
  origin: true,
});

app.get("/health", async () => {
  return {
    status: "ok",
  };
});

registerRoutes(app);
registerErrorHandler(app);
