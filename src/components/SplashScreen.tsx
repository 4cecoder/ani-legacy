import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";

const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex animate-pulse items-center justify-center bg-black bg-opacity-75 px-80 font-extrabold">
      <FontAwesomeIcon
        icon={faSync}
        spin
        fontSize={300}
        className="text-pink-500"
      />
    </div>
  );
};

export default SplashScreen;
