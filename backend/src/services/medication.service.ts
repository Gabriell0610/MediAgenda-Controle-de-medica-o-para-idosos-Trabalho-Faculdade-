import { Timestamp } from "firebase-admin/firestore";
import { db } from "../firebase/firebase";
import type {
  CreateMedicationInput,
  UpdateMedicationInput,
} from "../schemas/medication.schema";
import type { Medication } from "../types/medication.types";
import { AppError } from "../middlewares/app-error";

const medicationsCollection = db.collection("medications");

function validateMedication(
  doc: FirebaseFirestore.DocumentSnapshot,
): Medication {
  const data = doc.data();

  if (!data) {
    throw new AppError("Medication not found", 404);
  }

  return {
    id: doc.id,
    ...(data as Omit<Medication, "id">),
  };
}

export async function createMedication(
  input: CreateMedicationInput,
  userId: string,
): Promise<Medication> {
  const payload = {
    userId,
    ...input,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const docRef = await medicationsCollection.add(payload);
  const createdDoc = await docRef.get();

  return validateMedication(createdDoc);
}

export async function listMedications(userId: string): Promise<Medication[]> {
  const snapshot = await medicationsCollection
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();
  return snapshot.docs.map(validateMedication);
}

export async function updateMedication(
  userId: string,
  id: string,
  input: UpdateMedicationInput,
): Promise<Medication> {
  const docRef = medicationsCollection.doc(id);
  const existingDoc = await docRef.get();

  if (!existingDoc.exists) {
    throw new AppError("Medication not found", 404);
  }

  verifyOwnerMedication(userId, existingDoc);

  await docRef.update({
    ...input,
    updatedAt: new Date().toISOString(),
  });

  const updatedDoc = await docRef.get();
  return validateMedication(updatedDoc);
}

export async function deleteMedication(
  userId: string,
  id: string,
): Promise<void> {
  const docRef = medicationsCollection.doc(id);
  const existingDoc = await docRef.get();

  if (!existingDoc.exists) {
    throw new AppError("Medication not found", 404);
  }

  verifyOwnerMedication(userId, existingDoc);

  await docRef.delete();
}

const verifyOwnerMedication = (
  userId: string,
  existingDoc: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>,
) => {
  const medication = existingDoc.data();

  if (medication?.userId !== userId) {
    throw new AppError("Forbidden", 403);
  }
};
