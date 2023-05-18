// src/components/pipebomb-api/Films.tsx
import axios, { AxiosResponse } from "axios";

interface Film {
  image: string;
  title: string;
  description: string;
  id: string;
  release_date: string;
  casts: string[];
  duration: string;
  country: string;
  thumbnail?: string;
  sources?: Source[];
}

interface FilmResponse {
  films: Film[];
}

interface Source {
  url: string;
  quality: string;
}

interface SourceResponse {
  sources: Source[];
}

const API_BASE_URL = "https://anij.bytecats.codes/pipebomb/api";
const PROXY = "https://anij.bytecats.codes/proxy/?url=";

// pipebomb-api/Films.tsx
// src/components/pipebomb-api/Films.tsx
async function getFilm(q: string): Promise<FilmResponse> {
  const response: AxiosResponse<FilmResponse> = await axios.get(
    `${PROXY}${API_BASE_URL}/films/vip/search?q=${q}`
  );

  if (response.status !== 200) {
    throw new Error(`Failed to get film data for ${q}`);
  }

  if ("detail" in response.data) {
    throw new Error(`Validation error: ${response.data.detail}`);
  }

  console.log("Response data received:", response.data); // Keep this line

  return response.data; // Replace this line
}
async function getSources(q: string): Promise<Source[]> {
  const response: AxiosResponse<SourceResponse> = await axios.get(
    `${PROXY}${API_BASE_URL}/films/vip/source?q=${q}`
  );

  if (response.status !== 200) {
    throw new Error(`Failed to get sources for ${q}`);
  }
  console.log("Raw response data for sources:", response.data);

  const sources: Source[] = [];

  // Iterate directly over response.data instead of response.data.sources
  response.data.forEach((item: any) => {
    console.log("Current item object:", item);
    if (Array.isArray(item.sources)) {
      item.sources.forEach((src: any) => {
        if (src) {
          // Add this condition
          console.log("Current src object in item.sources:", src);
          // Push an object with only url and quality properties
          sources.push({
            url: src.file,
            quality: src.type,
          });
        }
      });
    } else if (typeof item.result === "object" && item.result !== null) {
      console.log("Current item.result object:", item.result);
      for (const quality in item.result) {
        if (item.result.hasOwnProperty(quality) && item.result[quality]) {
          // Add the condition here
          // Push an object with only url and quality properties
          sources.push({
            url: item.result[quality].file,
            quality,
          });
        }
      }
    }
  });

  console.log("Sources array after processing:", sources);
  return sources;
}

export { getFilm, getSources };
export type { Film, FilmResponse, Source, SourceResponse };
