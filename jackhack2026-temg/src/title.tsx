import './titlescreen.css'
function TitleScreen() {
    return (
        <>
        <p className="title"><strong><span className= "トロッコ">トロッコ</span><br/><span className= "まなベンチャー">まなベンチャー</span></strong></p>
        <div className="parent">
        <button className="スタートボタン" >スタート</button>
        <button className="問題追加ボタン">問題文<br/>登録</button>
        </div>
        </>
    )
}
export default TitleScreen