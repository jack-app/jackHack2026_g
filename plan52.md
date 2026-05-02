# 実装計画: トロッコまなベンチャー

## 前提条件

- 開発期間: 5/2・5/3・5/4 (2.5日)
- エンジニア: 1〜2人
- 非エンジニア: 4〜5人（新入生）
- デプロイ: Vercel（発表後すぐ閉じる）
- 背景素材・画像の用意: 非エンジニアが担当

---

## アーキテクチャ方針

### シングルページ・ステートマシン

React Router は使わない。`App.tsx` が持つ `phase` という1つのstateで画面全体を制御する。
URLは変わらず、フェーズに対応したコンポーネントを条件分岐でレンダリングする。

```
title
  ↓ スタートボタン押下
question（タイマー動作・2択入力受付）
  ↓ 選択 or タイムアウト
correct / incorrect（フィードバック表示）
  ↓ 自動遷移（1〜2秒後）
explanation（解説表示・次の問題ボタン）
  ↓ 次の問題ボタン or 全問終了
question（次の問題） or result（全問終了）
  ↓ タイトルへ戻るボタン
title
```

### ランダム出題（重複なし）

ゲーム開始時に **Fisher-Yates シャッフル** をクイズ配列に一度だけ適用し、
`currentIndex` を 0 から順にインクリメントして消化する。

- 毎回ランダム選択 + 除外管理のような複雑な処理は不要
- `shuffled[currentIndex]` を取り出すだけでよい

---

## srcフォルダ構成

```
jackhack2026-temg/
└── src/
    ├── main.tsx                  # エントリポイント（変更不要）
    ├── App.tsx                   # ステートマシン本体
    ├── App.css                   # グローバルスタイル・フォント設定
    │
    ├── types.ts                  # 型定義（Question, Phase など）
    │
    ├── data/
    │   └── questions.json        # クイズデータ（非エンジニアが編集）
    │
    ├── hooks/
    │   └── useTimer.ts           # タイマーロジック（useEffect + setInterval）
    │
    ├── utils/
    │   └── shuffle.ts            # Fisher-Yates シャッフル関数
    │
    ├── components/
    │   ├── TitleScreen.tsx       # タイトル・スタートボタン
    │   ├── QuestionScreen.tsx    # 問題文・2択ボタン・タイマーバー
    │   ├── FeedbackScreen.tsx    # 正解 or 不正解のフィードバック
    │   ├── ExplanationScreen.tsx # 解説・次の問題ボタン
    │   ├── ResultScreen.tsx      # 最終スコア・タイトルへ戻る
    │   └── TimerBar.tsx          # タイマー残量を示すプログレスバー
    │
    └── assets/
        ├── bg_title.png          # タイトル背景（非エンジニアが用意）
        ├── bg_question.png       # 問題画面背景（非エンジニアが用意）
        ├── bg_correct.png        # 正解画面背景（非エンジニアが用意）
        ├── bg_incorrect.png      # 不正解画面背景（非エンジニアが用意）
        ├── bg_explanation.png    # 解説画面背景（非エンジニアが用意）
        └── bg_result.png         # 結果画面背景（非エンジニアが用意）
```

---

## 型定義（types.ts）

```ts
export type Phase =
  | 'title'
  | 'question'
  | 'correct'
  | 'incorrect'
  | 'explanation'
  | 'result';

export type Question = {
  id: number;
  question: string;
  choices: [string, string]; // 必ず2択
  correctIndex: 0 | 1;
  explanation: string;
};
```

---

## クイズデータ形式（data/questions.json）

非エンジニアはまずGoogleスプレッドシートで管理し、最終的にこのJSONに変換する。

```json
[
  {
    "id": 1,
    "question": "問題文をここに書く",
    "choices": ["選択肢A", "選択肢B"],
    "correctIndex": 0,
    "explanation": "解説文をここに書く"
  },
  {
    "id": 2,
    "question": "別の問題文",
    "choices": ["選択肢A", "選択肢B"],
    "correctIndex": 1,
    "explanation": "解説文"
  }
]
```

**スプレッドシートのカラム構成（非エンジニア向け）**

| id | question | choice_A | choice_B | correct (AまたはB) | explanation |
|---|---|---|---|---|---|

---

## 各コンポーネントの責務

### App.tsx
- `phase`, `currentIndex`, `score`, `shuffledQuestions`, `selectedIndex` を管理
- 各フェーズへの遷移関数を定義し、子コンポーネントにpropsで渡す
- ゲーム開始時にシャッフルを実行

### TitleScreen.tsx
- スタートボタンのみ
- props: `onStart: () => void`

### QuestionScreen.tsx
- 問題文と2つの選択肢ボタンを表示
- タイマーバーをレンダリング
- タイムアウト時は自動的に不正解扱い
- props: `question: Question`, `onAnswer: (index: number | null) => void`
- `useTimer` フックを内部で使用

### FeedbackScreen.tsx
- 正解 or 不正解を大きく表示
- 1〜2秒後に自動で `explanation` フェーズへ遷移
- props: `isCorrect: boolean`, `onNext: () => void`

### ExplanationScreen.tsx
- 解説テキストと「次の問題へ」ボタン
- props: `explanation: string`, `onNext: () => void`

### ResultScreen.tsx
- 正解数 / 全問数を表示
- 「タイトルへもどる」ボタン
- props: `score: number`, `total: number`, `onRestart: () => void`

### TimerBar.tsx
- 残り時間を横幅で表現するプログレスバー
- props: `timeLeft: number`, `maxTime: number`

### useTimer.ts
- `timeLeft` stateと `isExpired` を返すカスタムフック
- `useEffect` + `setInterval` で1秒ごとにデクリメント
- フェーズが変わったらリセットされるよう `key` prop または依存配列で制御

---

## Vercelデプロイ手順

1. [vercel.com](https://vercel.com) にGitHubアカウントでサインイン
2. "New Project" → `jackHack2026_g` リポジトリをインポート
3. **Root Directory** を `jackhack2026-temg` に変更（重要）
4. Build Command: `npm run build`（自動検出される）
5. Output Directory: `dist`（自動検出される）
6. "Deploy" ボタンを押す

以降は `main` ブランチへのpushで自動デプロイされる。

---

## タスク分担

### エンジニア（1〜2人）

| 優先度 | タスク | 担当フェーズ |
|---|---|---|
| 最高 | App.tsx のステートマシン実装 | Day1 午後 |
| 最高 | types.ts / shuffle.ts / useTimer.ts 実装 | Day1 午後 |
| 高 | QuestionScreen / FeedbackScreen 実装 | Day2 午前 |
| 高 | TitleScreen / ExplanationScreen / ResultScreen 実装 | Day2 午前 |
| 中 | TimerBar 実装・スタイリング | Day2 午後 |
| 中 | questions.json の読み込みと動作確認 | Day2 午後 |
| 低 | 背景画像の組み込み・演出調整 | Day3 午前 |
| 低 | バグ修正・最終確認・Vercelデプロイ | Day3 午前 |

### 非エンジニア（新入生 4〜5人）

| タスク | 人数目安 | 期限 |
|---|---|---|
| クイズ問題の考案（スプレッドシートで管理） | 3〜4人で分担・各3〜5問 | Day2 中 |
| questions.json への変換作業 | 1人 | Day2 夕方 |
| 背景素材の収集・調整（OpenGameArt等） | 1〜2人 | Day2 中 |
| テストプレイ・バグ報告 | 全員 | Day3 午前 |
| デモ・プレゼン資料の準備 | 1〜2人 | Day3 |

---

## スケジュール

### Day1（5/2）
- 午前: 設計・役割決め・Vercel接続確認・スプレッドシート共有
- 午後: ステートマシン骨格・型定義・ユーティリティ実装、問題考案開始

### Day2（5/3）
- 午前: 全コンポーネント実装（スタイルなし・動けばOK）
- 午後: タイマー・スタイリング、素材収集、questions.json 完成
- 夕方: 問題データ組み込み・動作確認

### Day3前半（5/4）
- 午前: 背景素材組み込み・演出調整・バグ修正・Vercel本番確認
- 午前後半〜: デモ・発表準備

---

## リスクと対策

| リスク | 対策 |
|---|---|
| 背景素材が間に合わない | CSSグラデーション（炭鉱テーマの黒〜茶色）で代替し、後から差し替え |
| タイマーのリセットが正常に動かない | `QuestionScreen` に `key={currentIndex}` を渡すことでマウントのたびに再生成 |
| questions.json の記載ミス | `correctIndex` は 0 か 1 しか許容しない型にし、TypeScript がビルド時にエラーを出す構造にする |
| 新入生がJSONを壊す | スプレッドシート → JSONの変換はエンジニアが担当し、非エンジニアはスプレッドシートのみ触る |
| 時間不足 | アニメーション・演出は最後のオプション。「動く・正解できる」状態を Day2 中に完成させることを最優先とする |
