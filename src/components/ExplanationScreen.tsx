import { VideoBackground } from "./VideoBackground";
// import nextImage from "../assets/tuginomonndai.png";
const nextImage = `${import.meta.env.BASE_URL}assets/tuginomonndai.png`;
// import resultImage from "../assets/kekka.png";
const resultImage = `${import.meta.env.BASE_URL}assets/kekka.png`;
import { useEffect, useState } from "react";
// import kaisetuSound from "../assets/sounds/kaisetu.mp3";

const kaisetuSound = `${import.meta.env.BASE_URL}assets/sounds/kaisetu.mp3`;
const kaisetuImageDesktop = `${import.meta.env.BASE_URL}assets/kaisetu.png`;
const kaisetuImageMobile = `${import.meta.env.BASE_URL}assets/kaisetu-sp.png`;

import "../explanation.css";

type Props = {
  explanation: string;
  onNext: () => void;
  isLast: boolean;
};

export function ExplanationScreen({ explanation, onNext, isLast }: Props) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      <div
        style={{
          flex: 1,
          margin: "48px auto",
          padding: isMobile ? "20px" : "24px",
          paddingTop: isMobile ? "40px" : "75px",
          boxSizing: "border-box",
          backgroundImage: `url(${isMobile ? kaisetuImageMobile : kaisetuImageDesktop})`,
          backgroundSize: isMobile ? "cover" : "110%",
          backgroundPosition: "center",
          maxWidth: isMobile ? "300px" : "800px",
          height: isMobile ? "80%" : "70%",
          aspectRatio: isMobile ? "119 / 180" : "409 / 247",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            fontSize: isMobile ? "24px" : "36px",
            lineHeight: isMobile ? "32px" : "48px",
            fontWeight: 600,
            margin: 0,
          }}
        >
          {explanation}
        </p>
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
