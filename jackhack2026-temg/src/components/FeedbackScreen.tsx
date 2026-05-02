import { useEffect, useRef } from 'react';

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
    <div
      style={{
        display: 'flex',
        height: '100vh',
        background: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
      }}
    >
      {/* フィードバックウィンドウ（後でpng素材に置き換え予定） */}
      <div
        style={{
          border: '2px solid black',
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
    </div>
  );
}
