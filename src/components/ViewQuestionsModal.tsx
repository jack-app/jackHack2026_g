import {
  loadUserQuestions,
  deleteUserQuestion,
} from "../utils/questionStorage";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onDelete?: () => void;
};

export function ViewQuestionsModal({ isOpen, onClose, onDelete }: Props) {
  const userQuestions = loadUserQuestions();

  const handleDelete = (id: number) => {
    if (confirm("この問題を削除しますか？")) {
      deleteUserQuestion(id);
      onDelete?.();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "#FFC850",
          padding: "32px",
          borderRadius: "8px",
          maxWidth: "800px",
          width: "90%",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <h2 style={{ marginTop: 0 }}>
          登録された問題（{userQuestions.length}件）
        </h2>

        {userQuestions.length === 0 ? (
          <p style={{ color: "#666", textAlign: "center" }}>
            登録された問題はまだありません
          </p>
        ) : (
          <div>
            {userQuestions.map((q, idx) => (
              <div
                key={q.id}
                style={{
                  marginBottom: "24px",
                  padding: "16px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <div style={{ marginBottom: "12px" }}>
                  <strong style={{ fontSize: "18px" }}>
                    問題 {idx + 1}: {q.question}
                  </strong>
                </div>

                <div style={{ marginBottom: "12px", paddingLeft: "16px" }}>
                  <div>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "8px 12px",
                        marginRight: "8px",
                        backgroundColor: "#FF4050",
                        borderRadius: "4px",
                      }}
                    >
                      {q.choices[0]}
                    </span>
                    {q.correctIndex === 0 && (
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        ✓ 正解
                      </span>
                    )}
                  </div>
                  <div>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "8px 12px",
                        marginRight: "8px",
                        backgroundColor: "#888888",
                        borderRadius: "4px",
                      }}
                    >
                      {q.choices[1]}
                    </span>
                    {q.correctIndex === 1 && (
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        ✓ 正解
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ marginBottom: "12px" }}>
                  <p style={{ margin: "8px 0", color: "#666" }}>
                    <strong>解説:</strong> {q.explanation}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(q.id)}
                  style={{
                    padding: "6px 12px",
                    fontSize: "14px",
                    backgroundColor: "#ff6b6b",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  削除
                </button>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: "24px" }}>
          <button
            onClick={onClose}
            style={{
              width: "100%",
              padding: "12px 16px",
              fontSize: "16px",
              backgroundColor: "#999",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}
