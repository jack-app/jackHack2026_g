type Props = {
  score: number;
  total: number;
  onRestart: () => void;
};

import "../finish.css";
import { finishCommentContent } from "../data/finishcomment";

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
  return (
    <div className="finishcommentimg">
      <img src="../src/assets/finish-minecart.png" />
    </div>
  );
}

function BackToTitle({ onRestart }: { onRestart: () => void }) {
  return (
    <div className="backtotitle">
      <button onClick={onRestart}>
        <img src="../src/assets/backtotitle.png" />
      </button>
    </div>
  );
}

export function ResultScreen({ score, total, onRestart }: Props) {
  return (
    <div
      style={{
        backgroundImage: "URL(../src/assets/finish.png)",
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
