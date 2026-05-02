type Props = {
  score: number;
  total: number;
  onRestart: () => void;
};

export function ResultScreen({ score, total, onRestart }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'white',
        gap: '32px',
      }}
    >
      <h1 style={{ margin: 0, fontSize: '48px' }}>結果画面</h1>
      <p style={{ fontSize: '32px', margin: 0 }}>
        {score} / {total} 問正解
      </p>
      <button
        onClick={onRestart}
        style={{
          fontSize: '20px',
          padding: '12px 36px',
          cursor: 'pointer',
          border: '2px solid black',
          background: 'white',
        }}
      >
        タイトルに戻る
      </button>
    </div>
  );
}
