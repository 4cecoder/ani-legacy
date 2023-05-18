// src/components/player/MuteButton.tsx
import React from "react";
import { HiOutlineVolumeOff } from "react-icons/hi";
import { IoVolumeHigh, IoVolumeMute } from "react-icons/io5";

type MuteButtonProps = {
  isMuted: boolean;
  onClick: () => void;
};

const MuteButton: React.FC<MuteButtonProps> = ({ isMuted, onClick }) => {
  return (
    <button onClick={onClick}>
      {isMuted ? (
        <HiOutlineVolumeOff className="text-xl" />
      ) : (
        <IoVolumeHigh className="text-xl" />
      )}
    </button>
  );
};

export default MuteButton;
