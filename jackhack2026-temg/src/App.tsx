import { useState } from 'react';
import type { Phase, Question } from './types';
import { shuffle } from './utils/shuffle';
import { TitleScreen } from './components/TitleScreen';
import { QuestionScreen } from './components/QuestionScreen';
import { FeedbackScreen } from './components/FeedbackScreen';
import { ExplanationScreen } from './components/ExplanationScreen';
import { ResultScreen } from './components/ResultScreen';
import questionsData from './data/questions.json';

const allQuestions = questionsData as Question[];

export default function App() {
  const [phase, setPhase] = useState<Phase>('title');
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleStart = () => {
    setShuffledQuestions(shuffle(allQuestions));
    setCurrentIndex(0);
    setScore(0);
    setPhase('question');
  };

  const handleAnswer = (index: number | null) => {
    const q = shuffledQuestions[currentIndex];
    const correct = index !== null && index === q.correctIndex;
    if (correct) setScore((s) => s + 1);
    setIsCorrect(correct);
    setPhase(correct ? 'correct' : 'incorrect');
  };

  const handleFeedbackDone = () => {
    setPhase('explanation');
  };

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= shuffledQuestions.length) {
      setPhase('result');
    } else {
      setCurrentIndex(nextIndex);
      setPhase('question');
    }
  };

  const handleRestart = () => {
    setPhase('title');
  };

  if (phase === 'title') {
    return <TitleScreen onStart={handleStart} />;
  }

  if (phase === 'question') {
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

  if (phase === 'correct' || phase === 'incorrect') {
    return <FeedbackScreen isCorrect={isCorrect} onNext={handleFeedbackDone} />;
  }

  if (phase === 'explanation') {
    return (
      <ExplanationScreen
        explanation={shuffledQuestions[currentIndex].explanation}
        onNext={handleNext}
        isLast={currentIndex + 1 >= shuffledQuestions.length}
      />
    );
  }

  if (phase === 'result') {
    return (
      <ResultScreen
        score={score}
        total={shuffledQuestions.length}
        onRestart={handleRestart}
      />
    );
  }

  return null;
}
