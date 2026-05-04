type Props = {
  timeLeft: number;
  maxTime: number;
};

export function TimerBar({ timeLeft, maxTime }: Props) {
  const pct = Math.max((timeLeft / maxTime) * 100, 0);
 // 色変化：20%を境に確実に変わる
  const color =
    pct > 50
      ? "#6f6f6f" // 鉄
      : pct > 20
      ? "#b35a2e" // 赤錆
      : "#d62828"; // 危険赤

  return (
    <div
      style={{
        width: "100%",
        height: "26px",
        borderRadius: "6px",
        overflow: "hidden",
        background: "#1a1a1a",
        border: "2px solid #333",
      }}
    >
      <div
        style={{
          width: `${pct}%`,
          height: "100%",
          backgroundColor: color,
          transition: "width 0.12s linear, background-color 0.3s",

          // 20%以下で点滅
          animation: pct <= 20 ? "blink 0.6s infinite" : "none",
        }}
      />

      {/* keyframes をここに置く（ReactでOK） */}
      <style>
        {`
          @keyframes blink {
            0% { opacity: 1; }
            50% { opacity: 0.3; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
} 