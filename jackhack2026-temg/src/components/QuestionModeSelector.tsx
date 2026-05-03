type Props = {
  mode: "default" | "user";
  onModeChange: (mode: "default" | "user") => void;
};

export function QuestionModeSelector({ mode, onModeChange }: Props) {
  return (
    <div
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        padding: "16px 24px",
        borderRadius: "8px",
      }}
    >
      <p style={{ margin: "0 0 12px 0", fontWeight: "bold" }}>問題セット選択</p>
      <div style={{ display: "flex", gap: "24px" }}>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
          }}
        >
          <input
            type="radio"
            checked={mode === "default"}
            onChange={() => onModeChange("default")}
          />
          デフォルト問題
        </label>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
          }}
        >
          <input
            type="radio"
            checked={mode === "user"}
            onChange={() => onModeChange("user")}
          />
          登録済み問題
        </label>
      </div>
    </div>
  );
}
