import axios from 'axios';

interface SearchQuery {
  q: string;
}

interface AnimeIDQuery {
  id: string;
  tt: string;
  e: string;
}

interface ShowIDQuery {
  id: string;
}

interface EpisodeIDQuery {
  id: string;
}

interface ServerIDQuery {
  id: string;
}

interface Show {
  __typename?: string;
  _id: string;
  airedStart?: object;
  alternateThumbnails?: string[];
  availableEpisodes?: {
    dub: number;
    raw: number;
    sub: number;
  };
  country?: string;
  description?: string;
  englishName?: any;
  episodeCount?: any;
  episodeDuration?: any;
  genres?: string[];
  lastUpdateEnd?: string;
  name: string;
  nativeName?: any;
  rating?: string;
  status?: string;
  studios?: string[];
  tags?: string[];
  thumbnail?: string;
  type?: any;
}

interface AnimeSearchResponse {
  data: {
    shows: {
      edges: Show[];
    };
  };
}

interface SourceUrl {
  className: string;
  downloads: {
    downloadUrl: string;
    sourceName: string;
  };
  mobile: {
    downloadUrl: string;
    sourceName: string;
  };
  priority: number;
  sandbox: string;
  sourceName: string;
  sourceUrl: string;
  streamerId: string;
  type: string;
}

interface AnimeSourceResponse {
  data: {
    episode: {
      episodeString: string;
      sourceUrls: SourceUrl[];
    };
  };
}

interface ShowSearchResponse {
  casts: string[];
  country: string[];
  description: string;
  duration: string;
  genres: string[];
  href: string;
  id: string;
  idParts: {
    idNum: number;
    name: string;
    type: string;
  };
  poster: string;
  production: string[];
  released: string;
  title: string;
}

interface Episode {
  episodeID: string;
  title: string;
}

interface ShowSeasonResponse {
  episodes: Episode[];
  serverID: string;
  serverName: string;
}

interface ShowServerResponse {
  linkID: string;
  serverName: string;
}

interface Track {
  default: boolean;
  file: string;
  kind: string;
  label: string;
}

interface ShowSourcesEncryptedResponse {
  server: number;
  sources: string;
  tracks: Track[];
}


const API_BASE_URL = 'http://127.0.0.1:8001/api';

// Search for anime by query
export async function searchAnime(query: SearchQuery): Promise<AnimeSearchResponse> {
  const response = await axios.get<AnimeSearchResponse>(`${API_BASE_URL}/anime/all/search`, { params: query });
  return response.data;
}

// Fetch anime sources by show ID
export async function fetchAnimeSources(query: AnimeIDQuery): Promise<AnimeSourceResponse> {
  const response = await axios.get<AnimeSourceResponse>(`${API_BASE_URL}/anime/all/sources`, { params: query });
  return response.data;
}

// Search for shows by query
export async function searchShows(query: SearchQuery): Promise<ShowSearchResponse> {
  const response = await axios.get<ShowSearchResponse>(`${API_BASE_URL}/series/vip/search`, { params: query });
  return response.data;
}

// Fetch show seasons and episodes by show ID
export async function fetchShowSeasons(query: ShowIDQuery): Promise<ShowSeasonResponse[]> {
  const response = await axios.get<ShowSeasonResponse[]>(`${API_BASE_URL}/series/vip/seasons`, { params: query });
  return response.data;
}

// Fetch show servers by episode ID
export async function fetchShowServers(query: EpisodeIDQuery): Promise<ShowServerResponse[]> {
  const response = await axios.get<ShowServerResponse[]>(`${API_BASE_URL}/series/vip/servers`, { params: query });
  return response.data;
}
// Fetch show sources by server ID
export async function fetchShowSources(query: ServerIDQuery): Promise<ShowSourcesEncryptedResponse[]> {
  const response = await axios.get<ShowSourcesEncryptedResponse[]>(`${API_BASE_URL}/series/vip/sources`, { params: query });
  return response.data;
}
