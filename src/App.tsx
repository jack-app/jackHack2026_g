import { useEffect, useRef,useState } from "react";
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
const bgmSound = `${import.meta.env.BASE_URL}assets/sounds/BGM.mp3`;
const switchSound = `${import.meta.env.BASE_URL}assets/sounds/switch.mp3`;

// import bgmSound from "./assets/sounds/BGM.mp3";



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
      alert("問題が見つかりません。追加してください。");
      return;
    }

    playBgm();

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
      stopBgm();
      setPhase("result");
    } else {
      setCurrentIndex(nextIndex);
      setPhase("question");
    }
  };

  const handleRestart = () => {
    playBgm();
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
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const switchAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const bgm = new Audio(bgmSound);
    bgm.loop = true;
    bgm.volume = 0.4;

    bgmRef.current = bgm;

    return () => {
      bgm.pause();
      bgm.currentTime = 0;
    };
  }, []);
  useEffect(() => {
  switchAudioRef.current = new Audio(switchSound);
  switchAudioRef.current.volume = 0.5;

  const handleButtonClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (!target.closest("button")) return;

    const audio = switchAudioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    audio.play().catch((error) => {
      console.log("効果音の再生に失敗しました:", error);
    });
  };

  document.addEventListener("click", handleButtonClick);

  return () => {
    document.removeEventListener("click", handleButtonClick);
  };
}, []);

  const playBgm = () => {
    const bgm = bgmRef.current;
    if (!bgm) return;

    bgm.currentTime = 0;

    bgm.play().catch((error) => {
      console.log("BGMの再生に失敗しました:", error);
    });
  };

  const stopBgm = () => {
    const bgm = bgmRef.current;
    if (!bgm) return;

    bgm.pause();
    bgm.currentTime = 0;
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
        correctAnswer={
          shuffledQuestions[currentIndex].choices[
            shuffledQuestions[currentIndex].correctIndex
          ]
        }
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
