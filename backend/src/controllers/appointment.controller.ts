import type { FastifyReply, FastifyRequest } from "fastify";
import {
  appointmentIdParamsSchema,
  createAppointmentSchema,
  updateAppointmentSchema,
} from "../schemas/appointment.schema";
import {
  createAppointment,
  deleteAppointment,
  listAppointments,
  updateAppointment,
} from "../services/appointment.service";

export async function createAppointmentController(
  request: FastifyRequest<{ Body: unknown }>,
  reply: FastifyReply,
) {
  const body = createAppointmentSchema.parse(request.body);
  const appointment = await createAppointment(body, request.user.uid);

  return reply.status(201).send(appointment);
}

export async function listAppointmentsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const appointments = await listAppointments(request.user.uid);
  return reply.status(200).send(appointments);
}

export async function updateAppointmentController(
  request: FastifyRequest<{ Params: unknown; Body: unknown }>,
  reply: FastifyReply,
) {
  const { id } = appointmentIdParamsSchema.parse(request.params);
  const body = updateAppointmentSchema.parse(request.body);
  const appointment = await updateAppointment(request.user.uid, id, body);

  return reply.status(200).send(appointment);
}

export async function deleteAppointmentController(
  request: FastifyRequest<{ Params: unknown }>,
  reply: FastifyReply,
) {
  const { id } = appointmentIdParamsSchema.parse(request.params);
  await deleteAppointment(request.user.uid, id);

  return reply.status(204).send();
}
