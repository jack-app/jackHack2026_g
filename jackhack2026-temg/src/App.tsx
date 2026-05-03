import { useState } from "react";
import type { Phase, Question } from "./types";
import { shuffle } from "./utils/shuffle";
import { loadUserQuestions, saveUserQuestion } from "./utils/questionStorage";
import { TitleScreen } from "./components/TitleScreen";
import { QuestionScreen } from "./components/QuestionScreen";
import { FeedbackScreen } from "./components/FeedbackScreen";
import { ExplanationScreen } from "./components/ExplanationScreen";
import { ResultScreen } from "./components/ResultScreen";
import { AddQuestionModal } from "./components/AddQuestionModal";
import { ViewQuestionsModal } from "./components/ViewQuestionsModal";
import questionsData from "./data/questions.json";

const defaultQuestions = questionsData as Question[];

export default function App() {
  const [allQuestions, setAllQuestions] = useState<Question[]>(() => [
    ...defaultQuestions,
    ...loadUserQuestions(),
  ]);
  const [questionMode, setQuestionMode] = useState<"default" | "user">(
    "default",
  );
  const [phase, setPhase] = useState<Phase>("title");
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [showViewQuestionsModal, setShowViewQuestionsModal] = useState(false);

  const handleStart = () => {
    let questionsToUse: Question[];

    if (questionMode === "default") {
      questionsToUse = defaultQuestions;
    } else {
      const userQuestions = loadUserQuestions();
      questionsToUse = userQuestions;
    }

    if (questionsToUse.length === 0) {
      alert("問題が見つかりません。問題を追加してください。");
      return;
    }

    const selectedQuestions = shuffle(questionsToUse).slice(0, 5);
    setShuffledQuestions(selectedQuestions);
    setCurrentIndex(0);
    setScore(0);
    setPhase("question");
  };

  const handleAnswer = (index: number | null) => {
    const q = shuffledQuestions[currentIndex];
    const correct = index !== null && index === q.correctIndex;
    if (correct) setScore((s) => s + 1);
    setIsCorrect(correct);
    setPhase(correct ? "correct" : "incorrect");
  };

  const handleFeedbackDone = () => {
    setPhase("explanation");
  };

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= shuffledQuestions.length) {
      setPhase("result");
    } else {
      setCurrentIndex(nextIndex);
      setPhase("question");
    }
  };

  const handleRestart = () => {
    setPhase("title");
  };

  const handleAddQuestionClick = () => {
    setShowAddQuestionModal(true);
  };

  const handleViewQuestionsClick = () => {
    setShowViewQuestionsModal(true);
  };

  const handleQuestionDeleted = () => {
    const userQuestions = loadUserQuestions();
    setAllQuestions([...defaultQuestions, ...userQuestions]);
  };

  const handleSaveQuestion = (
    question: Omit<Question, "id" | "isUserAdded">,
  ) => {
    const newQuestion = saveUserQuestion(question);
    setAllQuestions([...allQuestions, newQuestion]);
  };

  if (phase === "title") {
    return (
      <>
        <TitleScreen
          onStart={handleStart}
          onAddQuestion={handleAddQuestionClick}
          onViewQuestions={handleViewQuestionsClick}
          questionMode={questionMode}
          onQuestionModeChange={setQuestionMode}
        />
        <AddQuestionModal
          isOpen={showAddQuestionModal}
          onClose={() => setShowAddQuestionModal(false)}
          onSubmit={handleSaveQuestion}
        />
        <ViewQuestionsModal
          isOpen={showViewQuestionsModal}
          onClose={() => setShowViewQuestionsModal(false)}
          onDelete={handleQuestionDeleted}
        />
      </>
    );
  }

  if (phase === "question") {
    return (
      <QuestionScreen
        key={currentIndex}
        question={shuffledQuestions[currentIndex]}
        questionNumber={currentIndex + 1}
        totalQuestions={shuffledQuestions.length}
        onAnswer={handleAnswer}
      />
    );
  }

  if (phase === "correct" || phase === "incorrect") {
    return <FeedbackScreen isCorrect={isCorrect} onNext={handleFeedbackDone} />;
  }

  if (phase === "explanation") {
    return (
      <ExplanationScreen
        explanation={shuffledQuestions[currentIndex].explanation}
        onNext={handleNext}
        isLast={currentIndex + 1 >= shuffledQuestions.length}
      />
    );
  }

  if (phase === "result") {
    return (
      <>
        <ResultScreen
          score={score}
          total={shuffledQuestions.length}
          onRestart={handleRestart}
          onAddQuestion={handleAddQuestionClick}
        />
        <AddQuestionModal
          isOpen={showAddQuestionModal}
          onClose={() => setShowAddQuestionModal(false)}
          onSubmit={handleSaveQuestion}
        />
      </>
    );
  }

  return null;
}
