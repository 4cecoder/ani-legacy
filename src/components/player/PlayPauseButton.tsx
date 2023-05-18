// src/components/player/PlayPauseButton.tsx
import React from "react";
import { FaPause, FaPlay } from "react-icons/fa";

type PlayPauseButtonProps = {
  isPlaying: boolean;
  onClick: () => void;
};

const PlayPauseButton: React.FC<PlayPauseButtonProps> = ({
  isPlaying,
  onClick,
}) => {
  return (
    <button className="mr-2" onClick={onClick}>
      {isPlaying ? (
        <FaPause className="text-xl" />
      ) : (
        <FaPlay className="text-xl" />
      )}
    </button>
  );
};

export default PlayPauseButton;
