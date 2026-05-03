import { VideoBackground } from './VideoBackground';
import backImage from '../assets/taitorunimodoru.png'

type Props = {
  score: number;
  total: number;
  onRestart: () => void;
};

import '../finish.css'
import { finishCommentContent } from '../data/finishcomment'

function CorrectCount({ correctcountscore = 0, correctcounttotal = 0} ) {
    return (
        <div className = 'correctcount'>
            {correctcountscore} / {correctcounttotal} 問
            <span className = 'correctcount-correct'>
                正解
            </span>
            ！
        </div>
    )
}

function FinishComment({ finishcommentscore = 0 } ) {
    const finishcomment = finishCommentContent.find(finishCommentContent =>
        finishCommentContent.id === finishcommentscore
    );

    return (
        <div className = 'finishcomment'>
            <p>{ finishcomment?.comment }</p>
            <img />
        </div>
    )
}

function FinishCommentImg() {
    return (
        <div className = 'finishcommentimg'>
            <img src='' />
        </div>
    )
}

function BackToTitle({onRestart} : {onRestart: () => void}) {
    return (
        <div className = 'backtotitle'>
            <button onClick={(onRestart)}
                style={{
                    border: 'none',
                    background: 'transparent',
                    padding: 0,
                    cursor: 'pointer',
                }}
                >
                <img
                src={backImage}
                alt="タイトルに戻る"
                style={{
                  width: 'min(60vw,500px)',
                  height: 'auto',
                  display: 'block',
            }}
                  />
            </button>
        </div>
    )
}

export function ResultScreen({score, total, onRestart} : Props) {
  return (
    
        <div className = 'result'>
            <div className = 'result-top'>
                結果
            </div>
            <CorrectCount
                correctcountscore={score}
                correctcounttotal={total}
            />
            <FinishComment
                finishcommentscore={score}
            />
            <FinishCommentImg />
            <BackToTitle onRestart={onRestart} />
        </div>
    )
}
