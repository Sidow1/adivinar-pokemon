import { useState, useRef } from "react";

export const MusicButton = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (!isPlaying) {
      audioRef.current.play();
      audioRef.current.volume = 0.1;
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };
  return (
    <>
      <button className="nes-btn" id="musicButton" onClick={toggleAudio}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="35"
          height="35"
          fill="black"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
          {!isPlaying && (
            <line
              x1="0"
              y1="40"
              x2="15"
              y2="3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>
      <audio src="music.mp3" ref={audioRef} loop={true}></audio>
    </>
  );
};
