import { VideoBackground } from './VideoBackground';
import nextImage from '../assets/tuginomonndai.png';


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
            border: 'none',
            background: 'transparent',
            padding: 0,
            cursor: 'pointer'
          }}
        >
          <img
          src={nextImage}
          alt={isLast ? '結果を見る ▶' : '次の問題へ ▶'}
          style={{
            width: 'min(40vw,350px)',
            height: 'auto',
            display: 'inline-block',
          }}
          />
        </button>
      </div>
    </VideoBackground>
  );
}
