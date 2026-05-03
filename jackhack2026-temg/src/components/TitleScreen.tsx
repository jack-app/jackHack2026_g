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
      <h1 style={{ margin: 0, fontSize: '48px' }}><img src= 'src/assets/titlelogo.png' width='663' height='377'/></h1>
      <button
        onClick={onStart}
        style={{
          padding: 0,
          cursor: 'pointer',
          border: 'transparent',
          background: 'transparent',
        }}
      >
        <img src='src/assets/start.button.png' width='400' height= '110'/>
      </button>
    </VideoBackground>
  );
}
