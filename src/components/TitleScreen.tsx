import { VideoBackground } from "./VideoBackground";
import { QuestionModeSelector } from "./QuestionModeSelector";
// import startImage from "../assets/start.png";

type Props = {
  onStart: () => void;
  onAddQuestion: () => void;
  onViewQuestions: () => void;
  questionMode: "default" | "user";
  onQuestionModeChange: (mode: "default" | "user") => void;
};

export function TitleScreen({
  onStart,
  onAddQuestion,
  onViewQuestions,
  questionMode,
  onQuestionModeChange,
}: Props) {
  const titleLogoImage = `${import.meta.env.BASE_URL}assets/titlelogo.png`;
  const startImage = `${import.meta.env.BASE_URL}assets/start.button.png`;
  const mondaitouroku = `${import.meta.env.BASE_URL}assets/mondaitouroku.png`;
  const mondaiitiran = `${import.meta.env.BASE_URL}assets/mondaiitiran.png`;
  return (
    <VideoBackground
      contentStyle={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "32px",
      }}
    >
      {/* <h1 style={{ margin: 0, fontSize: "48px" }}>タイトル画面</h1> */}
      <h1 style={{ margin: 0, fontSize: "48px" }}>
        <img
          src={titleLogoImage}
          width="663"
          height="250px"
          style={{ objectFit: "cover", objectPosition: "top" }}
        />
      </h1>

      {/*
       */}

      <QuestionModeSelector
        mode={questionMode}
        onModeChange={onQuestionModeChange}
      />

      <div
        style={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {/* <button
          onClick={onStart}
          style={{
            fontSize: "24px",
            padding: "16px 48px",
            cursor: "pointer",
            border: "transparent",
            background: "transparent",
          }}
        >
          <img
            src={startImage}
            alt="スタート"
            style={{
              width: `min(60vw,500px)`,
              height: "auto",
              display: "block",
            }}
          />
        </button> */}
        <button
          onClick={onStart}
          style={{
            padding: 0,
            cursor: "pointer",
            border: "transparent",
            background: "transparent",
          }}
        >
          <img src={startImage} width="400" height="110" />
        </button>
        <button
          onClick={onAddQuestion}
          style={{
            fontSize: "16px",
            padding: "12px 32px",
            cursor: "pointer",
            border: "transparent",
            background: "transparent",
          }}
        >
          <img src={mondaitouroku} width="200" height="120" />
        </button>
        <button
          onClick={onViewQuestions}
          style={{
            fontSize: "16px",
            padding: "12px 32px",
            cursor: "pointer",
            border: "transparent",
            background: "transparent",
          }}
        >
          <img src={mondaiitiran} width="180" height="120" />
        </button>
      </div>
    </VideoBackground>
  );
}
