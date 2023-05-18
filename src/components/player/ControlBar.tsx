// src/components/player/ControlBar.tsx
import React from "react";

type ControlBarProps = {
  children: React.ReactNode;
};

const ControlBar: React.FC<ControlBarProps> = ({ children }) => {
  return (
    <div className="absolute bottom-0 flex w-full items-center justify-between bg-black bg-opacity-30 px-4 py-2 text-white">
      {children}
    </div>
  );
};

export default ControlBar;
