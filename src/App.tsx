// App.tsx
import React, { useEffect, useState } from "react";
import Navi from "./components/Navi";
import SplashScreen from "./components/SplashScreen";

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const splashTimeout = setTimeout(() => {
      setShowSplash(false);
    }, 300);

    return () => {
      clearTimeout(splashTimeout);
    };
  }, []);

  return (
    <div className="bg-slate-900">
      {showSplash && <SplashScreen />}
      <Navi />
    </div>
  );
};

export default App;
