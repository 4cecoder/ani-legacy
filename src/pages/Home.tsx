// Home.tsx
import React from "react";
import "typeface-bangers";
import "typeface-dancing-script";

const Home: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-slate-900 to-black">
      <div className="relative flex flex-col items-center justify-center p-2 text-center text-white">
        <h1 className="font-bangers text-6xl font-black text-teal-500">
          Ani-J
        </h1>
        <h2 className="font-dancing-script text-6xl font-thin text-fuchsia-600">
          Anime Social Site
        </h2>
      </div>
    </div>
  );
};

export default Home;
