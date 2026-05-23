import { AppError } from "../middlewares/app-error";
import type { User } from "../types/user.types";
import { db } from "../firebase/firebase";

const usersCollection = db.collection("users");

function validateUser(doc: FirebaseFirestore.DocumentSnapshot): User {
  const data = doc.data();

  if (!data) {
    throw new AppError("User not found", 404);
  }

  return {
    id: doc.id,
    ...(data as Omit<User, "id">),
  };
}

export async function createUser(
  userId: string,
  input: { name: string; email: string },
): Promise<User> {
  const docRef = usersCollection.doc(userId);
  const existingDoc = await docRef.get();

  if (existingDoc.exists) {
    return validateUser(existingDoc);
  }

  const payload = {
    email: input.email,
    name: input.name,
    createdAt: new Date().toISOString(),
  };

  await docRef.set(payload);

  const createdDoc = await docRef.get();
  return validateUser(createdDoc);
}
