// src/components/player/FullscreenButton.tsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand } from "@fortawesome/free-solid-svg-icons";

type FullscreenButtonProps = {
  onClick: () => void;
};

const FullscreenButton: React.FC<FullscreenButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="ml-2">
      <FontAwesomeIcon icon={faExpand} />
    </button>
  );
};

export default FullscreenButton;
