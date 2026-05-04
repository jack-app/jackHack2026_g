import type { Question } from "../types";

const STORAGE_KEY = "userQuestions";
const INITIAL_ID = 1000;

export function loadUserQuestions(): Question[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveUserQuestion(question: Omit<Question, "id">): Question {
  const userQuestions = loadUserQuestions();
  const nextId =
    userQuestions.length > 0
      ? Math.max(...userQuestions.map((q) => q.id)) + 1
      : INITIAL_ID;

  const newQuestion: Question = {
    ...question,
    id: nextId,
    isUserAdded: true,
  };

  userQuestions.push(newQuestion);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userQuestions));
  return newQuestion;
}

export function deleteUserQuestion(id: number): void {
  const userQuestions = loadUserQuestions();
  const filtered = userQuestions.filter((q) => q.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}
