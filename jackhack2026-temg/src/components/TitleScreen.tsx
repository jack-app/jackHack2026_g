type Props = {
  onStart: () => void;
};

export function TitleScreen({ onStart }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'white',
        gap: '32px',
      }}
    >
      <h1 style={{ margin: 0, fontSize: '48px' }}>タイトル画面</h1>
      <button
        onClick={onStart}
        style={{
          fontSize: '24px',
          padding: '16px 48px',
          cursor: 'pointer',
          border: '2px solid black',
          background: 'white',
        }}
      >
        スタート
      </button>
    </div>
  );
}
