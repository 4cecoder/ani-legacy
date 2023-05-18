// src/components/routes/Content.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import Media from "../../pages/Media";

import NotFound from "../../pages/404";
import React from "react";
import Settings from "../../pages/Settings";
import ProfilePage from "../../pages/ProfilePage";
import Terms from "../../pages/Terms";
import DashboardPage from "../../pages/DashboardPage";
import LightNovels from "../LightNovels";
import ImageInference from "../../pages/imagegen";

const isAllowed = (): boolean => {
  const userAgent = navigator.userAgent;
  return userAgent.includes("Chrome") || userAgent.includes("Linux");
};
const Content: React.FC = () => {
  return (
    <div className="flex-1 overflow-auto bg-gradient-to-b from-slate-900 to-black">
      <Router>
        {isAllowed() ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/media" element={<Media />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/lightnovel" element={<LightNovels />} />
            <Route path="/imagegen" element={<ImageInference />} />
            <Route path="/tos" element={<Terms />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} /> // Catch-all route for 404
          </Routes>
        ) : (
          <NotFound />
        )}
      </Router>
    </div>
  );
};

export default Content;
