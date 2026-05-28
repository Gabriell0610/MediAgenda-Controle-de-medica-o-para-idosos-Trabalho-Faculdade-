import type { FastifyInstance } from "fastify";
import { ZodError } from "zod";
import { AppError } from "./app-error";
export function registerErrorHandler(app: FastifyInstance): void {
  app.setErrorHandler((error, request, reply) => {
    request.log.error(error);
    console.log("erro: ", error);

    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({
        message: error.message,
      });
    }

    if (error instanceof ZodError) {
      return reply.status(400).send({
        message: "Validation error",
        details: error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    return reply.status(500).send({
      message: `Internal server error ${error} `,
    });
  });
}
