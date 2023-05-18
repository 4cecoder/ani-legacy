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

const API_BASE_URL = 'http://127.0.0.1:8001/api';

// Search for anime by query
export async function searchAnime(query: SearchQuery) {
  const response = await axios.get(`${API_BASE_URL}/anime/all/search`, { params: query });
  return response.data;
}

// Fetch anime sources by show ID
export async function fetchAnimeSources(query: AnimeIDQuery) {
  const response = await axios.get(`${API_BASE_URL}/anime/all/sources`, { params: query });
  return response.data;
}

// Search for shows by query
export async function searchShows(query: SearchQuery) {
  const response = await axios.get(`${API_BASE_URL}/series/vip/search`, { params: query });
  return response.data;
}

// Fetch show seasons and episodes by show ID
export async function fetchShowSeasons(query: ShowIDQuery) {
  const response = await axios.get(`${API_BASE_URL}/series/vip/seasons`, { params: query });
  return response.data;
}

// Fetch show servers by episode ID
export async function fetchShowServers(query: EpisodeIDQuery) {
  const response = await axios.get(`${API_BASE_URL}/series/vip/servers`, { params: query });
  return response.data;
}

// Fetch show sources by server ID
export async function fetchShowSources(query: ServerIDQuery) {
  const response = await axios.get(`${API_BASE_URL}/series/vip/sources`, { params: query });
  return response.data;
}
