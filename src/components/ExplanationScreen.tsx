import { VideoBackground } from "./VideoBackground";
// import nextImage from "../assets/tuginomonndai.png";
const nextImage = `${import.meta.env.BASE_URL}assets/tuginomonndai.png`;
// import resultImage from "../assets/kekka.png";
const resultImage = `${import.meta.env.BASE_URL}assets/kekka.png`;
import { useEffect } from "react";
// import kaisetuSound from "../assets/sounds/kaisetu.mp3";

const kaisetuSound = `${import.meta.env.BASE_URL}assets/sounds/kaisetu.mp3`;

import "../explanation.css";

type Props = {
  explanation: string;
  onNext: () => void;
  isLast: boolean;
};

export function ExplanationScreen({ explanation, onNext, isLast }: Props) {
  useEffect(() => {
    const audio = new Audio(kaisetuSound);
    audio.volume = 0.7;
    audio.play();

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

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
      <div className="explanation-board">
        <p>{explanation}</p>
      </div>

      <div style={{ textAlign: "right" }}>
        <button
          onClick={onNext}
          style={{
            border: "none",
            background: "transparent",
            padding: 0,
            cursor: "pointer",
          }}
        >
          <img
            src={isLast ? resultImage : nextImage}
            alt={isLast ? "結果を見る ▶" : "次の問題へ ▶"}
            style={{
              width: "min(40vw,350px)",
              height: "auto",
              display: "inline-block",
            }}
          />
        </button>
      </div>
    </VideoBackground>
  );
}
