export type Phase =
  | "title"
  | "question"
  | "correct"
  | "incorrect"
  | "explanation"
  | "result";

export type Question = {
  id: number;
  question: string;
  choices: [string, string];
  correctIndex: 0 | 1;
  explanation: string;
  isUserAdded?: boolean;
};
