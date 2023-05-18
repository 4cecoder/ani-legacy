import React from "react";

type TimeDisplayProps = {
  currentTime: number;
  duration: number;
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ currentTime, duration }) => {
  const formatTime = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return (
      (h > 0 ? h + ":" : "") + ("0" + m).slice(-2) + ":" + ("0" + s).slice(-2)
    );
  };

  return (
    <div className="flex items-center">
      <div className="ml-2 mr-4">{formatTime(currentTime)}</div>
      <div className="h-1 w-full bg-gray-700">
        <div
          className="h-full bg-white"
          style={{
            width: `${(currentTime / duration) * 100}%`,
          }}
        ></div>
      </div>
      <div className="">{formatTime(duration)}</div>
    </div>
  );
};

export default TimeDisplay;
