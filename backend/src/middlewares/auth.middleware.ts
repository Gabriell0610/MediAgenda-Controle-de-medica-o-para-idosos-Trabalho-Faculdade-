import type { FastifyReply, FastifyRequest } from "fastify";
import { auth } from "../firebase/firebase";

export async function authMiddleware(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return reply.status(401).send({
        message: "Token not provided",
      });
    }

    const token = authHeader.replace("Bearer ", "");

    const decoded = await auth.verifyIdToken(token);

    request.user = {
      uid: decoded.uid,
      email: decoded.email,
    };
  } catch {
    return reply.status(401).send({
      message: "Invalid token",
    });
  }
}
