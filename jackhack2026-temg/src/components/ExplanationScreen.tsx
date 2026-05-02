type Props = {
  explanation: string;
  onNext: () => void;
  isLast: boolean;
};

export function ExplanationScreen({ explanation, onNext, isLast }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        background: 'white',
        padding: '24px',
        boxSizing: 'border-box',
        gap: '16px',
      }}
    >
      {/* 解説ウィンドウ（後でpng素材に置き換え予定） */}
      <div
        style={{
          flex: 1,
          border: '2px solid black',
          padding: '32px',
          boxSizing: 'border-box',
        }}
      >
        <h2 style={{ margin: '0 0 24px 0', fontSize: '24px' }}>解説</h2>
        <p style={{ fontSize: '20px', lineHeight: 1.7, margin: 0 }}>{explanation}</p>
      </div>

      <div style={{ textAlign: 'right' }}>
        <button
          onClick={onNext}
          style={{
            fontSize: '18px',
            padding: '12px 28px',
            cursor: 'pointer',
            border: '2px solid black',
            background: 'white',
          }}
        >
          {isLast ? '結果を見る ▶' : '次の問題へ ▶'}
        </button>
      </div>
    </div>
  );
}
