import Fastfy from "fastify";
import cors from "@fastify/cors";

export const app = Fastfy();

app.register(cors, {
  origin: true,
});

app.get("/health", async () => {
  return {
    status: "ok",
  };
});
