import { useState, useRef } from "react";
import { useTimer } from "../hooks/useTimer";
import { TimerBar } from "./TimerBar";
import { VideoBackground } from "./VideoBackground";
import type { Question } from "../types";
// import mondaiImage from "../assets/mondai.png";
const mondaiImage = `${import.meta.env.BASE_URL}assets/mondai.png`;
// import sentakusiImage from "../assets/sentakusi.png";
const sentakusiImage = `${import.meta.env.BASE_URL}assets/sentakusi.png`;
import { useEffect } from "react";
// import syutudaiSound from "../assets/sounds/syutudai.mp3";

const syutudaiSound = `${import.meta.env.BASE_URL}assets/sounds/syutudai.mp3`;

const MAX_TIME = 10;

type Props = {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (index: number | null) => void;
};

export function QuestionScreen({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedIndexRef = useRef<number | null>(null);

  useEffect(() => {
    const audio = new Audio(syutudaiSound);
    audio.volume = 0.7;
    audio.play();

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [questionNumber]);

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    selectedIndexRef.current = index;
  };

  const handleExpire = () => {
    onAnswer(selectedIndexRef.current);
  };

  const timeLeft = useTimer(MAX_TIME, handleExpire);

  // 問題文の長さに応じてフォントサイズを計算
  const getQuestionFontSize = () => {
    const length = question.question.length;
    // 文字数が多いほど、vwの値を小さくする
    const vw = Math.max(4, 8 - Math.min(length / 10, 3));
    return `clamp(10px, ${vw}vw, 40px)`;
  };

  return (
    <VideoBackground
      contentStyle={{
        display: "flex",
        flexDirection: "column",
        padding: "24px",
        boxSizing: "border-box",
        gap: "16px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <TimerBar timeLeft={timeLeft} maxTime={MAX_TIME} />
        <span
          style={{
            whiteSpace: "nowrap",
            fontSize: "clamp(10px, 4vw, 24px)",
            fontWeight: "bold",
            color: "#E8B94A",
          }}
        >
          {timeLeft.toFixed(1)}秒
        </span>
      </div>

      <div style={{ fontSize: "clamp(20px, 8vw, 54px)", color: "#E8B94A" }}>
        {questionNumber} / {totalQuestions} 問
      </div>

      {/* 問題文ウィンドウ（後でpng素材に置き換え予定） */}
      <div
        style={{
          flex: 1,
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px",
          boxSizing: "border-box",
          backgroundImage: `url(${mondaiImage})`,
          backgroundSize: `contain`,
          backgroundPosition: `center`,
          backgroundRepeat: `no-repeat`,
          maxWidth: "80%",
          wordWrap: "break-word",
          margin: "0 auto",
        }}
      >
        <p
          style={{
            fontSize: getQuestionFontSize(),
            textAlign: "center",
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          {question.question}
        </p>
      </div>

      {/* 選択肢（後でpng素材に置き換え予定） */}
      <div style={{ display: "flex", gap: "16px", height: "160px" }}>
        {question.choices.map((choice, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            style={{
              flex: 1,
              border: `none`,
              backgroundColor: selectedIndex === i ? `#FFD700` : "transparent",
              backgroundImage: `url(${sentakusiImage})`,
              backgroundSize: "100% 100%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              fontSize: "clamp(18px, 6vw, 48px)",
              fontWeight: 900,
              WebkitTextStroke: "0.6px black",
              letterSpacing: "0.04em",
              cursor: "pointer",
              boxSizing: "border-box",
              outline: selectedIndex === i ? "3px solid #ffbb00" : "none",
              outlineOffset: "-4px",
            }}
          >
            {choice}
          </button>
        ))}
      </div>
    </VideoBackground>
  );
}
