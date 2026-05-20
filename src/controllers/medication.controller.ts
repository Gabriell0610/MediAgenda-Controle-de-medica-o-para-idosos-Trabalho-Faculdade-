import type { FastifyReply, FastifyRequest } from "fastify";
import {
  createMedicationSchema,
  medicationIdParamsSchema,
  updateMedicationSchema,
} from "../schemas/medication.schema";
import {
  createMedication,
  deleteMedication,
  listMedications,
  updateMedication,
} from "../services/medication.service";

export async function createMedicationController(
  request: FastifyRequest<{ Body: unknown }>,
  reply: FastifyReply,
) {
  const body = createMedicationSchema.parse(request.body);
  const medication = await createMedication(body);

  return reply.status(201).send(medication);
}

export async function listMedicationsController(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  const medications = await listMedications();
  return reply.status(200).send(medications);
}

export async function updateMedicationController(
  request: FastifyRequest<{ Params: unknown; Body: unknown }>,
  reply: FastifyReply,
) {
  const { id } = medicationIdParamsSchema.parse(request.params);
  const body = updateMedicationSchema.parse(request.body);
  const medication = await updateMedication(id, body);

  return reply.status(200).send(medication);
}

export async function deleteMedicationController(
  request: FastifyRequest<{ Params: unknown }>,
  reply: FastifyReply,
) {
  const { id } = medicationIdParamsSchema.parse(request.params);
  await deleteMedication(id);

  return reply.status(204).send();
}
