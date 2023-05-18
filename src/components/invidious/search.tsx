// src/components/invidious/search.tsx
import { Film } from "../pipebomb-api/Films";
import { inflate } from "pako";

export async function searchInvidious(query: string): Promise<Film[]> {
  let proxy = "https://anij.bytecats.codes/proxy/?url=";
  query = query.split(" ").join("-");
  const response = await fetch(
    `${proxy}https://inv.odyssey346.dev/api/v1/search?q=${query}`
  );

  if (response.headers.get("Content-Type") === "application/x-gzip") {
    const compressedData = await response.arrayBuffer();
    const decompressedData = inflate(new Uint8Array(compressedData));
    const data = JSON.parse(
      new TextDecoder("utf-8").decode(decompressedData)
    );

    // Process the search results from Invidious
    const films = data.map((result: any) => {
      return {
        id: result.videoId,
        title: result.title,
        thumbnail: result.videoThumbnails?.[0]?.url || ""
        // ... Add other properties as needed
      };
    });

    return films;
  } else if (
    response.headers.get("Content-Type")?.includes("application/json")
  ) {
    const data = await response.json();
    // Process the search results from Invidious
    const films = data.map((result: any) => {
      return {
        id: result.videoId,
        title: result.title,
        thumbnail: result.videoThumbnails[0]?.url
        // ... Add other properties as needed
      };
    });

    return films;
  } else {
    console.error(
      "Invalid content type received:",
      response.headers.get("Content-Type
