import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "tailwindcss/tailwind.css";

const NotFound: React.FC = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-900">
      <div className="text-3xl font-bold text-white md:text-5xl lg:text-6xl">
        404 <br />
        <br /> Page Nyaht Fouwnd
      </div>
      <div className="absolute ml-4 mb-32 flex h-16 w-16 justify-center md:h-20 md:w-20 lg:h-24 lg:w-24">
        <FontAwesomeIcon
          icon={faSpinner}
          size={"3x"}
          spin
          className="animate-spin text-white dark:text-gray-800"
        />
      </div>
    </div>
  );
};

export default NotFound;
