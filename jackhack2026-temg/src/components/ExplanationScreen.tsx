import { VideoBackground } from './VideoBackground';

import '../explanation.css'

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

      <div className='explanation-board'>
        <p>{explanation}</p>
      </div>

      <div style={{ textAlign: 'right' }}>
        <button
          onClick={onNext}
          style={{
            fontSize: '22px',
            padding: '12px 28px',
            cursor: 'pointer',
            backgroundColor: 'white',
          }}
        >
          {isLast ? '結果を見る ▶' : '次の問題へ ▶'}
        </button>
      </div>
    </VideoBackground>
  );
}
