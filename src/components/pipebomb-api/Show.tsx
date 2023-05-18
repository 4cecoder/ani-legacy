import React, { useEffect, useState } from "react";
import axios from "axios";

const SeriesAPI = "https://anij.bytecats.codes/pipebomb/series/vip/";
const proxy = "https://anij.bytecats.codes/proxy/?url=";

type ShowProps = {
  seriesId: string | number | boolean;
};

const Show: React.FC<ShowProps> = ({ seriesId }) => {
  const [showInfo, setShowInfo] = useState<any>(null);
  const [episodeInfo, setEpisodeInfo] = useState<any>(null);

  useEffect(() => {
    const fetchShowInfo = async () => {
      const data = await getShowInfo(seriesId);
      setShowInfo(data);
    };

    fetchShowInfo();
  }, [seriesId]);

  useEffect(() => {
    const fetchEpisodeInfo = async () => {
      if (showInfo && showInfo.episode_id) {
        const data = await getEpisodeInfo(showInfo.episode_id);
        setEpisodeInfo(data);
      }
    };

    fetchEpisodeInfo();
  }, [showInfo]);

  // ... Render your component here based on the showInfo and episodeInfo state
};

async function searchShows(query: string | number | boolean) {
  const response = await axios.get(
    `${proxy}${SeriesAPI}search?q=${encodeURIComponent(query)}`
  );
  return response.data;
}

async function getShowInfo(seriesId: string | number | boolean) {
  const response = await axios.get(
    `${proxy}${SeriesAPI}id?q=${encodeURIComponent(seriesId)}`
  );
  return response.data;
}

async function getEpisodeInfo(episodeId: string | number | boolean) {
  const response = await axios.get(
    `${proxy}${SeriesAPI}?q=${encodeURIComponent(episodeId)}`
  );
  return response.data;
}

export { searchShows, getShowInfo, getEpisodeInfo, Show };
