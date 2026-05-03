import { useEffect, useRef } from 'react';
import { VideoBackground } from './VideoBackground';

type Props = {
  isCorrect: boolean;
  onNext: () => void;
};

export function FeedbackScreen({ isCorrect, onNext }: Props) {
  const onNextRef = useRef(onNext);
  onNextRef.current = onNext;

  useEffect(() => {
    const id = setTimeout(() => onNextRef.current(), 2000);
    return () => clearTimeout(id);
  }, []);

  return (
    <VideoBackground
      contentStyle={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* フィードバックウィンドウ（後でpng素材に置き換え予定） */}
      <div
        style={{
          border: 'none',
          padding: '64px 96px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: '64px',
            fontWeight: 'bold',
            margin: 0,
            color: isCorrect ? '#16a34a' : '#9333ea',
          }}
        >
          {isCorrect ? '正解！' : '不正解…'}
        </p>
      </div>
    </VideoBackground>
  );
}
