// src/components/player/SeekSlider.tsx
import React from "react";

type SeekSliderProps = {
  currentTime: number;
  duration: number;
  onChange: (newTime: number) => void;
};

const SeekSlider: React.FC<SeekSliderProps> = ({
  currentTime,
  duration,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(event.target.value);
    onChange(newTime);
  };

  return (
    <input
      type="range"
      min={0}
      max={duration}
      step={0.1}
      value={currentTime}
      onChange={handleChange}
      className="seeker ml-4 h-1 w-full appearance-none overflow-hidden rounded-full bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
    />
  );
};

export default SeekSlider;
