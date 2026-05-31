import type { FastifyReply, FastifyRequest } from "fastify";
import {
  createExamSchema,
  examIdParamsSchema,
  updateExamSchema,
} from "../schemas/exame.schema";
import {
  createExam,
  deleteExam,
  listExams,
  listExamsToday,
  updateExam,
} from "../services/exam.service";

export async function createExamController(
  request: FastifyRequest<{ Body: unknown }>,
  reply: FastifyReply,
) {
  const body = createExamSchema.parse(request.body);
  const exam = await createExam(body, request.user.uid);

  return reply.status(201).send(exam);
}

export async function listExamsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const exams = await listExams(request.user.uid);
  return reply.status(200).send(exams);
}
export async function listExamsControllerToday(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const exams = await listExamsToday(request.user.uid);
  return reply.status(200).send(exams);
}

export async function updateExamController(
  request: FastifyRequest<{ Params: unknown; Body: unknown }>,
  reply: FastifyReply,
) {
  const { id } = examIdParamsSchema.parse(request.params);
  const body = updateExamSchema.parse(request.body);
  const exam = await updateExam(request.user.uid, id, body);

  return reply.status(200).send(exam);
}

export async function deleteExamController(
  request: FastifyRequest<{ Params: unknown }>,
  reply: FastifyReply,
) {
  const { id } = examIdParamsSchema.parse(request.params);
  await deleteExam(request.user.uid, id);

  return reply.status(204).send();
}
