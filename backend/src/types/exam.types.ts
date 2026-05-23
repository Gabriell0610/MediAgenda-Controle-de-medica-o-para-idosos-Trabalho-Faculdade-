import type { CreateExamInput } from "../schemas/exame.schema";

export type Exam = CreateExamInput & {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};
