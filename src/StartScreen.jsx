import React, { useRef } from "react";

export default function StartScreen({ onStart }) {
  const audioRef = useRef(null);
  const base = import.meta.env.BASE_URL;

  const handleStartClick = () => {
    const audio = audioRef.current;

    if (audio) {
      audio.volume = 0.6;
      audio.play().catch((err) => console.warn("Couldn't play:", err));

      setTimeout(() => {
        const fadeOut = setInterval(() => {
          if (audio.volume > 0.01) {
            audio.volume = Math.max(0, audio.volume - 0.02);
          } else {
            audio.pause();
            clearInterval(fadeOut);
          }
        }, 100);
      }, 1000);
    }

    onStart();
  };

  return (
    <div
      style={{
        backgroundImage: `url('${base}background.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <audio ref={audioRef} src={`${base}bgmusic.mp3`} />
      <img
        src={`${base}startbutton.png`}
        alt="Start"
        onClick={handleStartClick}
        style={{
          width: "220px",
          cursor: "pointer",
          transition: "transform 0.3s",
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />
    </div>
  );
}
