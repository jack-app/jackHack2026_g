type Props = {
  mode: "default" | "user";
  onModeChange: (mode: "default" | "user") => void;
};

const sentakusiImage = `${import.meta.env.BASE_URL}assets/sentakusi.png`;

export function QuestionModeSelector({ mode, onModeChange }: Props) {
  return (
    <div
      style={{
        backgroundImage: `url(${sentakusiImage})`,
        backgroundSize: "100% 100%",
        padding: "24px 48px",
        width: "250px",
      }}
    >
      <p
        style={{
          margin: "0 0 12px 0",
          fontWeight: "bold",
          textAlign: "center",
          color: "#442b05",
        }}
      >
        ~~~~　問題セット選択　~~~~
      </p>
      <div
        style={{
          position: "relative",
        }}
      >
        <label
          style={{
            display: "block",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          <input
            type="radio"
            checked={mode === "default"}
            onChange={() => onModeChange("default")}
          />
          <p
            style={{
              margin: "0",
              marginLeft: "10px",
              display: "inline-block",
              fontWeight: "800",
              color: "#442b05",
            }}
          >
            デフォルト問題
          </p>
        </label>
        <label
          style={{
            display: "block",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          <input
            type="radio"
            checked={mode === "user"}
            onChange={() => onModeChange("user")}
          />
          <p
            style={{
              margin: "0",
              marginLeft: "10px",
              display: "inline-block",
              fontWeight: "800",
              color: "#442b05",
            }}
          >
            登録済み問題
          </p>
        </label>
      </div>
    </div>
  );
}
