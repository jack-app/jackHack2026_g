import { VideoBackground } from './VideoBackground';
import startImage from '../assets/start.png';

type Props = {
  onStart: () => void;
};

export function TitleScreen({ onStart }: Props) {
  return (
    <VideoBackground
      contentStyle={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '32px',
      }}
    >
      <h1 style={{ margin: 0, fontSize: '48px' }}>タイトル画面</h1>
      <button
        onClick={onStart}
        style={{
          border: 'none',
          background: 'transparent',
          padding: 0,
          cursor: 'pointer',
        }}
      >
        <img src={startImage}
        alt='スタート'
        style={{
          width: `min(60vw,500px)`,
          height: 'auto',
          display: 'block',
        }}
        />
      </button>
    </VideoBackground>
  );
}
