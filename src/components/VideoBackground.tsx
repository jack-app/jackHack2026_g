import type { CSSProperties, ReactNode } from "react";
// import minecartVideo from "../assets/minecart_back.mp4";

const minecartVideo = `${import.meta.env.BASE_URL}assets/minecart_back.mp4`;

type Props = {
  children: ReactNode;
  contentStyle?: CSSProperties;
};

export function VideoBackground({ children, contentStyle }: Props) {
  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src={minecartVideo} type="video/mp4" />
      </video>
      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          ...contentStyle,
        }}
      >
        {children}
      </div>
    </div>
  );
}
