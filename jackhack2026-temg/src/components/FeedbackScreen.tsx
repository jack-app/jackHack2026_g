import { useEffect, useRef } from 'react';
import { VideoBackground } from './VideoBackground';
import seikaiImage from '../assets/seikai.png';
import fuseikaiImage from '../assets/fuseikai.png'



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
         width: '100%',
         minHeight: '100%',
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
         padding: 0,
         textAlign: 'center',
          
        }}
      >
        <img
        src={isCorrect ? seikaiImage : fuseikaiImage}
        alt={isCorrect ? '正解' : '不正解'}
        style={{
           width: 'min(98vw, 1200px)',
           height: 'auto',
           display: 'block',

          }}
          />
      </div>
    </VideoBackground>
  );
}
