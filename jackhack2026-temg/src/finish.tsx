const correctcount = 0

function CorrectCount() {
    return (
        <div className = 'correctcount'>
            { correctcount } 問 
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

export default function Finish() {
    return (
        <div className = 'result'>
            <div className = 'result-top'>
                結果
            </div>
            <CorrectCount />
            <FinishComment />
            <FinishCommentImg />
            <BackToTitle />
        </div>
    )
}