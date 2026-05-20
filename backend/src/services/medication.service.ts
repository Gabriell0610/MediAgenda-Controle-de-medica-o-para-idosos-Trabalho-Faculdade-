import { Timestamp } from "firebase-admin/firestore";
import { db } from "../firebase/firebase";
import type {
  CreateMedicationInput,
  UpdateMedicationInput,
} from "../schemas/medication.schema";
import type { Medication } from "../types/medication.types";
import { AppError } from "../middlewares/app-error";

const medicationsCollection = db.collection("medications");

function mapMedication(doc: FirebaseFirestore.DocumentSnapshot): Medication {
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
): Promise<Medication> {
  const now = Timestamp.now();

  const payload = {
    ...input,
    createdAt: now,
    updatedAt: now,
  };

  const docRef = await medicationsCollection.add(payload);
  const createdDoc = await docRef.get();

  return mapMedication(createdDoc);
}

export async function listMedications(): Promise<Medication[]> {
  const snapshot = await medicationsCollection
    .orderBy("createdAt", "desc")
    .get();
  return snapshot.docs.map(mapMedication);
}

export async function updateMedication(
  id: string,
  input: UpdateMedicationInput,
): Promise<Medication> {
  const docRef = medicationsCollection.doc(id);
  const existingDoc = await docRef.get();

  if (!existingDoc.exists) {
    throw new AppError("Medication not found", 404);
  }

  await docRef.update({
    ...input,
    updatedAt: Timestamp.now(),
  });

  const updatedDoc = await docRef.get();
  return mapMedication(updatedDoc);
}

export async function deleteMedication(id: string): Promise<void> {
  const docRef = medicationsCollection.doc(id);
  const existingDoc = await docRef.get();

  if (!existingDoc.exists) {
    throw new AppError("Medication not found", 404);
  }

  await docRef.delete();
}
