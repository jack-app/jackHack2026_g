import { useEffect, useRef } from "react";
import { VideoBackground } from "./VideoBackground";
// import seikaiImage from "../assets/seikai.png";
// import fuseikaiImage from "../assets/fuseikai.png";
// import seikaiSound from "../assets/sounds/seikai.mp3";
// import fuseikaiSound from "../assets/sounds/fuseikai.mp3";

const seikaiImage = `${import.meta.env.BASE_URL}assets/seikai.png`;
const fuseikaiImage = `${import.meta.env.BASE_URL}assets/fuseikai.png`;
const seikaiSound = `${import.meta.env.BASE_URL}assets/sounds/seikai.mp3`;
const fuseikaiSound = `${import.meta.env.BASE_URL}assets/sounds/fuseikai.mp3`;

type Props = {
  isCorrect: boolean;
  onNext: () => void;
};

export function FeedbackScreen({ isCorrect, onNext }: Props) {
  const onNextRef = useRef(onNext);
  onNextRef.current = onNext;

  useEffect(() => {
    const audio = new Audio(isCorrect ? seikaiSound : fuseikaiSound);
    audio.volume = 0.8;
    audio.play();

    const id = setTimeout(() => onNextRef.current(), 2000);

    return () => {
      clearTimeout(id);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isCorrect]);

  return (
    <VideoBackground
      contentStyle={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* フィードバックウィンドウ（後でpng素材に置き換え予定） */}
      <div
        style={{
          width: "100%",
          minHeight: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
          textAlign: "center",
        }}
      >
        <img
          src={isCorrect ? seikaiImage : fuseikaiImage}
          alt={isCorrect ? "正解" : "不正解"}
          style={{
            width: "min(98vw, 1200px)",
            height: "auto",
            display: "block",
          }}
        />
      </div>
    </VideoBackground>
  );
}
