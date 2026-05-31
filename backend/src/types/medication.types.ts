import type { Timestamp } from "firebase-admin/firestore";
import type { CreateMedicationInput } from "../schemas/medication.schema";

export type Medication = CreateMedicationInput & {
  id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type MedicationResponse = CreateMedicationInput & {
  id: string;
};
