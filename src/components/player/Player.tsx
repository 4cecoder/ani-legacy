import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import Hls from "hls.js";
import screenfull from "screenfull";
import ControlBar from "./ControlBar";
import PlayPauseButton from "./PlayPauseButton";
import MuteButton from "./MuteButton";
import VolumeSlider from "./VolumeSlider";
import SeekSlider from "./SeekSlider";
import TimeDisplay from "./TimeDisplay";
import FullscreenButton from "./FullscreenButton";
import CenterPlayPauseButton from "./CenterPlayPauseButton";

type PlayerProps = {
  videoUrl: string;
  startTimestamp?: number;
  onPlaybackTimeUpdate?: (time: number) => void;
};

const Player: React.FC<PlayerProps> = ({
  videoUrl,
  startTimestamp,
  onPlaybackTimeUpdate,
}) => {
  const playerRef = useRef<ReactPlayer>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isMouseOverPlayer, setIsMouseOverPlayer] = useState(false);
  const [showCenterPlayPause, setShowCenterPlayPause] = useState(false);
  const [playbackTime, setPlaybackTime] = useState<number>(() => {
    if (
      videoUrl.includes("youtube.com") ||
      videoUrl.includes("youtu.be") ||
      videoUrl.includes("inv.odyssey346.dev")
    ) {
      return startTimestamp || 0;
    }

    return (
      parseFloat(localStorage.getItem(`videoTime-${videoUrl}`) || "") ||
      startTimestamp ||
      0
    );
  });

  const handleMouseEnter = () => {
    setShowControls(true);
  };
  const getMimeType = (url: string) => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      return "video/youtube";
    } else if (url.endsWith(".mp4")) {
      return "video/mp4";
    } else if (url.endsWith(".m3u8")) {
      return "application/x-mpegURL";
    }
    return "";
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setShowControls(false);
    }, 2000);
  };

  const handleClick = () => {
    handleTogglePlay();
    setShowControls(true);
  };

  const handleTogglePlay = () => {
    if (playerRef.current) {
      setIsPlaying(!isPlaying);
      setShowCenterPlayPause(true);
      setTimeout(() => setShowCenterPlayPause(false), 2000);
      playerRef.current.seekTo(playbackTime);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (isMouseOverPlayer) {
      if (event.code === "Space") {
        handleTogglePlay();
      } else if (event.code === "KeyF") {
        handleToggleFullscreen();
      }
    }
  };
  const handleToggleFullscreen = () => {
    if (screenfull.isEnabled && playerRef.current) {
      screenfull
        .toggle(playerRef.current.wrapper)
        .then((r) => console.log("Fullscreen toggled"));
    }
  };

  const handleProgress = ({ playedSeconds }: { playedSeconds: number }) => {
    setPlaybackTime(playedSeconds);
    localStorage.setItem(`videoTime-${videoUrl}`, playedSeconds.toString());
    if (onPlaybackTimeUpdate) {
      onPlaybackTimeUpdate(playedSeconds);
    }
  };

  const mimeType = getMimeType(videoUrl);

  const playerConfig = {
    file: {
      attributes: {
        crossOrigin: "anonymous",
      },
      forceHLS: videoUrl.endsWith(".m3u8"),
      forceVideo: videoUrl.endsWith(".mp4"),
      type: mimeType,
    },
    hlsOptions: {
      Hls,
    },
    youtube: {
      playerVars: {},
    },
    fullscreenEnabled: false,
  };

  const handleReady = () => {
    setIsLoading(false);
    handlePlayerReady(playerRef.current);
  };

  const handlePlayerReady = (player: any) => {
    if (player && playbackTime > 0) {
      player.seekTo(playbackTime);
      setIsPlaying(true);
    }
  };

  const handleToggleMute = () => {
    if (playerRef.current) {
      setIsMuted(!isMuted);
      playerRef.current.getInternalPlayer().muted = !isMuted;
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    if (playerRef.current) {
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
      playerRef.current.getInternalPlayer().volume = newVolume;
    }
  };

  const handleSeekChange = (newTime: number) => {
    setPlaybackTime(newTime);
    if (playerRef.current) {
      playerRef.current.seekTo(newTime);
    }
  };

  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    const handleUnload = () => {
      if (playerRef.current) {
        localStorage.setItem(
          `videoTime-${videoUrl}`,
          playerRef.current.getCurrentTime().toString()
        );
      }
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [videoUrl]);

  return (
    <div className="player-wrapper">
      <div
        className="player-container video-player"
        onContextMenu={handleContextMenu}
        onMouseEnter={() => {
          setIsMouseOverPlayer(true);
          handleMouseEnter();
        }}
        onMouseLeave={() => {
          setIsMouseOverPlayer(false);
          handleMouseLeave();
        }}
        onClick={handleClick}
      >
        {isLoading && <div className="spinner loading-spinner"></div>}
        <ReactPlayer
          ref={playerRef}
          url={videoUrl}
          playing={isPlaying}
          controls={false}
          width="100%"
          height="100%"
          onReady={handleReady}
          config={playerConfig}
          onProgress={handleProgress}
          progressInterval={1000}
          playbackRate={1}
          volume={volume}
          muted={isMuted}
          playsinline // Add this line
        />
        {showControls && (
          <ControlBar>
            <PlayPauseButton isPlaying={isPlaying} onClick={handleTogglePlay} />
            <MuteButton isMuted={isMuted} onClick={handleToggleMute} />
            <VolumeSlider
              volume={volume}
              onChange={(event) => handleVolumeChange(event)}
            />
            <SeekSlider
              currentTime={playbackTime}
              duration={playerRef.current?.getDuration() || 0}
              onChange={handleSeekChange}
            />
            <TimeDisplay
              currentTime={playbackTime}
              duration={playerRef.current?.getDuration() || 0}
            />
            <FullscreenButton onClick={handleToggleFullscreen} />
          </ControlBar>
        )}
        {showCenterPlayPause && (
          <CenterPlayPauseButton
            isPlaying={isPlaying}
            onClick={handleTogglePlay}
          />
        )}
      </div>
    </div>
  );
};

export default Player;
