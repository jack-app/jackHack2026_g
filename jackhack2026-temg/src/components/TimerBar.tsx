type Props = {
  timeLeft: number;
  maxTime: number;
};

export function TimerBar({ timeLeft, maxTime }: Props) {
  const pct = Math.max((timeLeft / maxTime) * 100, 0);
  const color = pct > 50 ? '#22c55e' : pct > 25 ? '#f97316' : '#ef4444';

  return (
    <div
      style={{
        border: '2px solid black',
        width: '100%',
        height: '28px',
        boxSizing: 'border-box',
        background: '#e5e7eb',
      }}
    >
      <div
        style={{
          width: `${pct}%`,
          height: '100%',
          background: color,
          // 100ms間隔の更新を補間してなめらかに見せるため、更新間隔より少し長い値にする
          transition: 'width 0.12s linear, background 0.5s',
        }}
      />
    </div>
  );
}
