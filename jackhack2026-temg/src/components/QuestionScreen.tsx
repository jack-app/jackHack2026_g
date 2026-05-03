import { useState, useRef } from 'react';
import { useTimer } from '../hooks/useTimer';
import { TimerBar } from './TimerBar';
import { VideoBackground } from './VideoBackground';
import type { Question } from '../types';
import mondaiImage from '../assets/mondai.png';
import sentakusiImage from '../assets/sentakusi.png';


const MAX_TIME = 10;

type Props = {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (index: number | null) => void;
};

export function QuestionScreen({ question, questionNumber, totalQuestions, onAnswer }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedIndexRef = useRef<number | null>(null);

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    selectedIndexRef.current = index;
  };

  const handleExpire = () => {
    onAnswer(selectedIndexRef.current);
  };

  const timeLeft = useTimer(MAX_TIME, handleExpire);

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
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <TimerBar timeLeft={timeLeft} maxTime={MAX_TIME} />
        <span style={{ whiteSpace: 'nowrap', fontSize: '18px', fontWeight: 'bold' }}>
          {timeLeft.toFixed(1)}秒
        </span>
      </div>

      <div style={{ fontSize: '32px', color: '#6b7280' }}>
        {questionNumber} / {totalQuestions} 問
      </div>

      {/* 問題文ウィンドウ（後でpng素材に置き換え予定） */}
      <div
        style={{
          flex: 1,
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px',
          boxSizing: 'border-box',
          backgroundImage: `url(${mondaiImage})`,
          backgroundSize: `contain`,
          backgroundPosition: `center`,
          backgroundRepeat: `no-repeat`,
        }}
      >
        <p style={{ fontSize: '60px', textAlign: 'center', margin: 0, lineHeight: 1.6 }}>
          {question.question}
        </p>
       
      </div>

      {/* 選択肢（後でpng素材に置き換え予定） */}
      <div style={{ display: 'flex', gap: '16px', height: '160px' }}>
        {question.choices.map((choice, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            style={{
              flex: 1,
              border: `none`,
              backgroundColor: selectedIndex === i ? `#93c5fd` : 'transparent',
              backgroundImage: `url(${sentakusiImage})`,
              backgroundSize: '100% 100%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              fontSize: '48px',
              fontWeight: 900,
              WebkitTextStroke:'0.6px black',
              letterSpacing: '0.04em',
              cursor: 'pointer',
              boxSizing: 'border-box',
              outline: selectedIndex === i ? '3px solid #1d4ed8' : 'none',
              outlineOffset: '-4px',
            }}
          >
            {choice}
          </button>
        ))}
      </div>
    </VideoBackground>
  );
}
