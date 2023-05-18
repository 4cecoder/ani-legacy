import Draggable from "react-draggable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompress,
  faExpand,
  faEye,
  faEyeSlash,
  faPowerOff,
  faRecycle,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { JitsiMeeting } from "@jitsi/react-sdk";
import React, { useState } from "react";

const Jitsi = () => {
  const [showJitsi, setShowJitsi] = useState(true);
  const [jitsiKey, setJitsiKey] = useState(0);
  const [jitsiLoaded, setJitsiLoaded] = useState(false);
  const [jitsiVisible, setJitsiVisible] = useState(true);
  const [jitsiSize, setJitsiSize] = useState("max-w-xl");

  const toggleJitsiSize = () => {
    setJitsiSize((prevSize) =>
      prevSize === "max-w-xl" ? "max-w-4xl" : "max-w-xl"
    );
  };

  return (
    <Draggable handle=".drag-handle">
      <div
        className={`ml-6 rounded-3xl bg-gray-600 bg-opacity-50 ${jitsiSize}`}
      >
        <div className="relative">
          <div className="drag-handle absolute top-0 right-0 m-2 cursor-move rounded-full bg-pink-500 p-2"></div>
          <button
            onClick={() => setShowJitsi(!showJitsi)}
            className="m-2 rounded-2xl bg-purple-900 p-2 text-white hover:bg-purple-700"
          >
            <FontAwesomeIcon icon={showJitsi ? faEyeSlash : faEye} size="lg" />
          </button>
          <button
            onClick={() => setJitsiKey((prevKey) => prevKey + 1)}
            className="m-2 rounded-2xl bg-purple-900 p-2 text-white hover:bg-purple-700"
          >
            <FontAwesomeIcon icon={faRefresh} size="lg" />
          </button>
          <button
            onClick={() => setJitsiLoaded(false)}
            className="bg-red- 600 m-2
rounded-2xl p-2 text-white hover:bg-red-500"
          >
            <FontAwesomeIcon icon={faPowerOff} size="lg" />
          </button>
          <button
            onClick={toggleJitsiSize}
            className="m-2 rounded-2xl bg-blue-600 p-2 text-white hover:bg-blue-500"
          >
            <FontAwesomeIcon
              icon={jitsiSize === "max-w-3xl" ? faExpand : faCompress}
              size="lg"
            />
          </button>
        </div>
        {!jitsiLoaded && (
          <button
            onClick={() => setJitsiLoaded(true)}
            className="m-2 rounded-2xl bg-green-600 p-2 text-white hover:bg-green-500"
          >
            <FontAwesomeIcon icon={faRecycle} size="lg" />
          </button>
        )}
        {showJitsi && jitsiLoaded && (
          <div
            className={`w-full max-w-3xl rounded-lg p-3 opacity-70 ${
              jitsiVisible ? "" : "hidden"
            }`}
          >
            <JitsiMeeting
              key={jitsiKey}
              getIFrameRef={(iframeRef) => {
                iframeRef.style.height = "480px";
                iframeRef.style.borderRadius = "30px";
                iframeRef.style.boxShadow = "0 0 10px 0 rgba(0, 0, 0, 0.5)";
                iframeRef.style.overflow = "hidden";
              }}
              roomName={"Anime Social Site"}
              configOverwrite={{
                startWithVideoMuted: true,
                startWithAudioMuted: false,
                enableEmailInStats: false,
                enableWelcomePage: false,
                enableClosePage: false,
                participantsPane: {
                  hideModeratorSettingsTab: false,
                  hideMoreActionsButton: false,
                  hideMuteAllButton: false,
                },
              }}
              interfaceConfigOverwrite={{
                VIDEO_LAYOUT_FIT: "nocrop",
                MOBILE_APP_PROMO: false,
                DEEP_LINKING_LOGO: false,
                HIDE_DEEP_LINKING_LOGO: true,
                SHOW_JITSI_WATERMARK: false,
                SHOW_WATERMARK_FOR_GUESTS: false,
                SHOW_BRAND_WATERMARK: false,
                SHOW_POWERED_BY: false,
              }}
            />
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default Jitsi;
