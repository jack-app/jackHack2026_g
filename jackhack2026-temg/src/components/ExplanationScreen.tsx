import { VideoBackground } from './VideoBackground';

type Props = {
  explanation: string;
  onNext: () => void;
  isLast: boolean;
};

export function ExplanationScreen({ explanation, onNext, isLast }: Props) {
  return (
    <VideoBackground
      contentStyle={{
        display: 'flex',
        flexDirection: 'column',
        padding: '24px',
        boxSizing: 'border-box',
        gap: '16px',
      }}
    >
      {/* 解説ウィンドウ（後でpng素材に置き換え予定） */}
      <div
        style={{
          flex: 1,
          margin: '48px auto',
          padding: '32px',
          paddingTop: '128px',
          boxSizing: 'border-box',
          backgroundImage: 'url(../src/assets/kaisetu.png)',
          backgroundSize: 'cover',
          maxWidth: '900px',
          }}
      >
        <p style={{ fontSize: '40px', lineHeight: '48px',  }}>{explanation}</p>
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
    </VideoBackground>
  );
}
