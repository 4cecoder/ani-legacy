// src/components/player/VolumeSlider.tsx
import React from "react";

type VolumeSliderProps = {
  volume: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const VolumeSlider: React.FC<VolumeSliderProps> = ({ volume, onChange }) => {
  return (
    <input
      type="range"
      min={0}
      max={1}
      step={0.1}
      value={volume}
      onChange={onChange}
      className="ml-2 h-1 w-16 appearance-none overflow-hidden rounded-full bg-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
    />
  );
};

export default VolumeSlider;
