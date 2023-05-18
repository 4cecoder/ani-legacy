// Media.tsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Chat from "../components/Chat/Chat";
import Player from "../components/player/Player";
import SearchModule from "../components/search-media/SearchModule";
import Jitsi from "../components/Jitsi";
import { Film, getSources } from "../components/pipebomb-api/Films";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Media = () => {
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);
  const [startTimestamp, setStartTimestamp] = useState<number | undefined>(
    undefined
  );
  const query = useQuery();

  useEffect(() => {
    const contentURL = query.get("contentURL");
    const timestamp = query.get("timestamp");
    if (contentURL) {
      setSelectedVideoUrl(contentURL);
    }
    if (timestamp) {
      setStartTimestamp(parseFloat(timestamp));
    }
  }, [query]);

  const handleSelectMovie = async (
    movie: Film,
    invidiousSearchEnabled: boolean
  ) => {
    if (movie.id && invidiousSearchEnabled) {
      setSelectedVideoUrl(`https://www.youtube.com/watch?v=${movie.id}`);
      setStartTimestamp(0);
    } else if (movie.id) {
      // Fetch the sources for the selected movie
      const sources = await getSources(movie.id);
      if (sources && sources.length > 0) {
        setSelectedVideoUrl(sources[0].url); // Set the first available source URL
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center space-y-6 p-6">
        <SearchModule
          onSelectMovie={handleSelectMovie}
          onUnloadPlayer={() => setSelectedVideoUrl(null)}
        />
        <div className="w-full max-w-6xl">
          {selectedVideoUrl && (
            <Player
              videoUrl={selectedVideoUrl}
              startTimestamp={startTimestamp}
              onPlaybackTimeUpdate={setStartTimestamp}
            />
          )}
        </div>
        <div className="w-full max-w-3xl items-center rounded-3xl p-3">
          <Chat />
        </div>
      </div>
      <Jitsi />
    </div>
  );
};

export default Media;
