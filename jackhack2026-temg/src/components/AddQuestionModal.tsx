import { useState } from "react";
import type { Question } from "../types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (question: Omit<Question, "id" | "isUserAdded">) => void;
};

export function AddQuestionModal({ isOpen, onClose, onSubmit }: Props) {
  const [question, setQuestion] = useState("");
  const [choice1, setChoice1] = useState("");
  const [choice2, setChoice2] = useState("");
  const [correctIndex, setCorrectIndex] = useState<0 | 1>(0);
  const [explanation, setExplanation] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    setError("");

    if (!question.trim()) {
      setError("問題文を入力してください");
      return;
    }
    if (!choice1.trim()) {
      setError("選択肢1を入力してください");
      return;
    }
    if (!choice2.trim()) {
      setError("選択肢2を入力してください");
      return;
    }
    if (!explanation.trim()) {
      setError("解説を入力してください");
      return;
    }

    const newQuestion = {
      question: question.trim(),
      choices: [choice1.trim(), choice2.trim()] as [string, string],
      correctIndex,
      explanation: explanation.trim(),
    };

    console.log("Submitting question:", newQuestion);
    onSubmit(newQuestion);

    setQuestion("");
    setChoice1("");
    setChoice2("");
    setCorrectIndex(0);
    setExplanation("");
    onClose();
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
          backgroundColor: "white",
          padding: "32px",
          borderRadius: "8px",
          maxWidth: "600px",
          width: "90%",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <h2 style={{ marginTop: 0 }}>問題を追加する</h2>

        <div style={{ marginBottom: "16px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            問題文
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="問題文を入力してください"
            style={{
              width: "100%",
              minHeight: "80px",
              padding: "8px",
              fontFamily: "inherit",
              fontSize: "14px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            選択肢1
          </label>
          <input
            type="text"
            value={choice1}
            onChange={(e) => setChoice1(e.target.value)}
            placeholder="選択肢1を入力"
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "14px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            選択肢2
          </label>
          <input
            type="text"
            value={choice2}
            onChange={(e) => setChoice2(e.target.value)}
            placeholder="選択肢2を入力"
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "14px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            正解
          </label>
          <div style={{ display: "flex", gap: "16px" }}>
            <label
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <input
                type="radio"
                checked={correctIndex === 0}
                onChange={() => setCorrectIndex(0)}
              />
              選択肢1
            </label>
            <label
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <input
                type="radio"
                checked={correctIndex === 1}
                onChange={() => setCorrectIndex(1)}
              />
              選択肢2
            </label>
          </div>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            解説
          </label>
          <textarea
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            placeholder="解説を入力してください"
            style={{
              width: "100%",
              minHeight: "80px",
              padding: "8px",
              fontFamily: "inherit",
              fontSize: "14px",
              boxSizing: "border-box",
            }}
          />
        </div>

        {error && (
          <div
            style={{
              color: "red",
              marginBottom: "16px",
              padding: "8px",
              backgroundColor: "#ffe0e0",
              borderRadius: "4px",
            }}
          >
            {error}
          </div>
        )}

        <div style={{ display: "flex", gap: "16px" }}>
          <button
            onClick={handleSubmit}
            style={{
              flex: 1,
              padding: "12px 16px",
              fontSize: "16px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            追加
          </button>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: "12px 16px",
              fontSize: "16px",
              backgroundColor: "#999",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            キャンセル
          </button>
        </div>
      </div>
    </div>
  );
}
