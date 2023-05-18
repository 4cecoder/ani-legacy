import axios, { AxiosResponse } from "axios";
// components/pipebomb-api/Anime.tsx
const baseUrl = "https://anij.bytecats.codes/pipebomb/anime/all/";
const proxy = "https://anij.bytecats.codes/proxy/?url=";

//const method = "method=POST&";

export interface Anime {
  id: string;
  title: string;
}

export interface EpisodesResponse {
  episodes: string[];
}

export interface EpisodeUrlResponse {
  url: string;
}

export async function searchAnime(query: string): Promise<Anime[]> {
  try {
    const response = await axios.post<{ query: string }, { data: Anime[] }>(
      proxy + baseUrl + "search_anime/",
      {
        query: query,
      },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.error("Response data is not an array:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching anime:", error);
    return [];
  }
}

// components/pipebomb-api/Anime.tsx
export async function getEpisodes(anime_id: string): Promise<string[]> {
  const response = await axios.post<
    { anime_id: string },
    { data: EpisodesResponse }
  >(
    proxy + baseUrl + "get_episodes/",
    JSON.stringify({
      anime_id: anime_id,
    }),
    {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.episodes;
}

export async function getEpisodeUrl(
  anime_id: string,
  episode: string
): Promise<string> {
  const response = await axios.post<
    { anime_id: string; episode: string },
    { data: EpisodeUrlResponse }
  >(
    proxy + baseUrl + "get_episode_url/",
    JSON.stringify({
      anime_id: anime_id,
      episode: episode,
    }),
    {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.url;
}

interface AnimeLink {
  link: string;
  hls: boolean;
  resolutionStr: string;
}

interface AnimeApiResponse {
  links: AnimeLink[];
}

async function fetchAnimeDirectLink(url: string): Promise<string | null> {
  if (!url.includes("clock.json")) {
    return null;
  }

  try {
    const response: AxiosResponse<AnimeApiResponse> = await axios.get(url);

    const m3u8Link = response.data.links.find(
      (link) => link.hls && link.resolutionStr === "Hls"
    );

    return m3u8Link ? m3u8Link.link : null;
  } catch (error) {
    console.error("Error fetching anime direct link:", error);
    return null;
  }
}

async function fetchMultipleAnimeDirectLinks(
  urls: string[]
): Promise<string[]> {
  const directLinks: string[] = [];

  for (const url of urls) {
    const link = await fetchAnimeDirectLink(url);
    if (link) {
      directLinks.push(link);
    }
  }

  return directLinks;
}
