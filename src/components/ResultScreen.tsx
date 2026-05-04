import "../finish.css";
import { finishCommentContent } from "../data/finishcomment";
// import { VideoBackground } from "./VideoBackground";
// import backImage from "../assets/taitorunimodoru.png";

type Props = {
  score: number;
  total: number;
  onRestart: () => void;
  onAddQuestion: () => void;
};

function CorrectCount({ correctcountscore = 0, correctcounttotal = 0 }) {
  return (
    <div className="correctcount">
      {correctcountscore} / {correctcounttotal} 問
      <span className="correctcount-correct">正解</span>！
    </div>
  );
}

function FinishComment({ finishcommentscore = 0 }) {
  const finishcomment = finishCommentContent.find(
    (finishCommentContent) => finishCommentContent.id === finishcommentscore,
  );

  return (
    <div className="finishcomment">
      <p>{finishcomment?.comment}</p>
      <div className="fukidashi" />
    </div>
  );
}

function FinishCommentImg() {
  const finish_minicart = `${import.meta.env.BASE_URL}assets/finish-minecart.png`;
  return (
    <div className="finishcommentimg">
      <img src={finish_minicart} />
    </div>
  );
}

function BackToTitle({ onRestart }: { onRestart: () => void }) {
  const backtotitleImage = `${import.meta.env.BASE_URL}assets/backtotitle.png`;
  return (
    <div className="backtotitle">
      <button
        onClick={onRestart}
        style={{
          border: "none",
          background: "transparent",
          padding: 0,
          cursor: "pointer",
        }}
      >
        <img
          src={backtotitleImage}
          alt="タイトルに戻る"
          style={{
            width: "min(60vw,500px)",
            height: "auto",
            display: "block",
          }}
        />
      </button>
    </div>
  );
}

export function ResultScreen({ score, total, onRestart }: Props) {
  const finishImage = `${import.meta.env.BASE_URL}assets/finish.png`;
  return (
    <div
      style={{
        backgroundImage: `url(${finishImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="result">
        <div className="result-top">結果</div>
        <CorrectCount correctcountscore={score} correctcounttotal={total} />
        <FinishComment finishcommentscore={score} />
        <FinishCommentImg />
        <BackToTitle onRestart={onRestart} />
      </div>
    </div>
  );
}
