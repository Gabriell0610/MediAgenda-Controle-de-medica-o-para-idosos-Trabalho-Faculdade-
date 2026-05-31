import { db } from "../firebase/firebase";
import { AppError } from "../middlewares/app-error";
import type {
  CreateAppointmentInput,
  UpdateAppointmentInput,
} from "../schemas/appointment.schema";
import type { Appointment } from "../types/appointment.types";
import { getTodayBrazil } from "../utils";

const appointmentsCollection = db.collection("appointments");

function validateAppointment(
  doc: FirebaseFirestore.DocumentSnapshot,
): Appointment {
  const data = doc.data();

  if (!data) {
    throw new AppError("Appointment not found", 404);
  }

  return {
    id: doc.id,
    ...(data as Omit<Appointment, "id">),
  };
}

export async function createAppointment(
  input: CreateAppointmentInput,
  userId: string,
): Promise<Appointment> {
  const now = new Date().toISOString();

  const payload = {
    userId,
    ...input,
    createdAt: now,
    updatedAt: now,
  };

  const docRef = await appointmentsCollection.add(payload);
  const createdDoc = await docRef.get();

  return validateAppointment(createdDoc);
}

export async function listAppointments(userId: string): Promise<Appointment[]> {
  const snapshot = await appointmentsCollection
    .where("userId", "==", userId)
    .get();

  return snapshot.docs.map(validateAppointment);
}
export async function listAppointmentsToday(
  userId: string,
): Promise<Appointment[]> {
  const today = getTodayBrazil();
  const snapshot = await appointmentsCollection
    .where("userId", "==", userId)
    .where("date", "==", today)
    .get();

  const appointments = snapshot.docs.map(validateAppointment);

  return appointments.sort((a, b) => a.time.localeCompare(b.time));
}

export async function updateAppointment(
  userId: string,
  id: string,
  input: UpdateAppointmentInput,
): Promise<Appointment> {
  const docRef = appointmentsCollection.doc(id);
  const existingDoc = await docRef.get();

  if (!existingDoc.exists) {
    throw new AppError("Appointment not found", 404);
  }

  verifyOwnerAppointment(userId, existingDoc);

  await docRef.update({
    ...input,
    updatedAt: new Date().toISOString(),
  });

  const updatedDoc = await docRef.get();
  return validateAppointment(updatedDoc);
}

export async function deleteAppointment(
  userId: string,
  id: string,
): Promise<void> {
  const docRef = appointmentsCollection.doc(id);
  const existingDoc = await docRef.get();

  if (!existingDoc.exists) {
    throw new AppError("Appointment not found", 404);
  }

  verifyOwnerAppointment(userId, existingDoc);

  await docRef.delete();
}

const verifyOwnerAppointment = (
  userId: string,
  existingDoc: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>,
) => {
  const appointment = existingDoc.data();

  if (appointment?.userId !== userId) {
    throw new AppError("Forbidden", 403);
  }
};
