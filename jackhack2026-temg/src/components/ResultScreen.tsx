type Props = {
  score: number;
  total: number;
  onRestart: () => void;
};

import '../finish.css'

function CorrectCount({ correctcount = 0 , questioncount  = 0 }) {
    return (
        <div className = 'correctcount'>
            {correctcount} / {questioncount} 問
            <span className = 'correctcount-correct'>
                正解
            </span>
            ！
        </div>
    )
}

function FinishComment() {
    const finishcomment = 'よくがんばったね！すご～い！！'

    return (
        <div className = 'finishcomment'>
            <p>{ finishcomment }</p>
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

function BackToTitle() {
    return (
        <div className = 'backtotitle'>
            <button>
                タイトルにもどる
            </button>
        </div>
    )
}

export function ResultScreen({score, total} : Props) {
  return (
    
        <div className = 'result'>
            <div className = 'result-top'>
                結果
            </div>
            <CorrectCount
              correctcount={score}
              questioncount={total}
            />
            <FinishComment />
            <FinishCommentImg />
            <BackToTitle />
        </div>
    )
}
