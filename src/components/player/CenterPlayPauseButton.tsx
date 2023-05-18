import React from "react";

type CenterPlayPauseButtonProps = {
  isPlaying: boolean;
  onClick: () => void;
};

const CenterPlayPauseButton: React.FC<CenterPlayPauseButtonProps> = ({
  isPlaying,
  onClick,
}) => {
  return (
    <div
      className={`center-play-pause-button ${isPlaying ? "pause" : "play"}`}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="white"
        width="50px"
        height="50px"
      >
        {isPlaying ? (
          <path d="M0 0h24v24H0z" fill="none" />
        ) : (
          <path d="M8 5v14l11-7z" />
        )}
      </svg>
    </div>
  );
};

export default CenterPlayPauseButton;
