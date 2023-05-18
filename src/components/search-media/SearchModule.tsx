// src/components/search-media/SearchModule.tsx
import React, { useState } from "react";
import SearchInput from "./SearchInput";
import SearchResultList from "./SearchResultList";
import { Film, getFilm } from "../pipebomb-api/Films";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { inflate } from "pako";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faToggleOff,
  faToggleOn,
} from "@fortawesome/free-solid-svg-icons";

type Props = {
  onSelectMovie: (movie: Film, invidiousSearchEnabled: boolean) => void;
  onUnloadPlayer: () => void;
};

const SearchModule: React.FC<Props> = ({ onSelectMovie, onUnloadPlayer }) => {
  // Add onUnloadPlayer here
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Film[]>([]);
  const [loading, setLoading] = useState(false);
  const [invidiousSearchEnabled, setInvidiousSearchEnabled] = useState(false);

  const handleToggleInvidiousSearch = () => {
    setInvidiousSearchEnabled((prevState) => !prevState);
    setSearchResults([]);
  };

  const handleSearch = async (query: string) => {
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    setLoading(true);

    try {
      let films;
      if (invidiousSearchEnabled) {
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
          films = data.map((result: any) => {
            return {
              id: result.videoId,
              title: result.title,
              thumbnail: result.videoThumbnails?.[0]?.url || "",
              // ... Add other properties as needed
            };
          });
        } else if (
          response.headers.get("Content-Type")?.includes("application/json")
        ) {
          const data = await response.json();
          // Process the search results from Invidious
          films = data.map((result: any) => {
            return {
              id: result.videoId,
              title: result.title,
              thumbnail: result.videoThumbnails[0]?.url,
              // ... Add other properties as needed
            };
          });
        } else {
          console.error(
            "Invalid content type received:",
            response.headers.get("Content-Type")
          );
          films = [];
        }
      } else {
        films = await getFilm(query.split(" ").join("-"));
      }
      console.log("Films received from API:", films);
      setSearchResults(films);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading) {
      handleSearch(searchTerm).then((r) => console.log("Search complete"));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative">
      <SearchInput
        searchTerm={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Entertainment Search..."
        disabled={loading}
      />
      {loading ? (
        <div className="absolute top-0 right-0 mt-2 mr-4">
          <FontAwesomeIcon icon={faSpinner} spin />
        </div>
      ) : (
        searchTerm.trim() !== "" && (
          <SearchResultList
            searchResults={searchResults}
            onSelectMovie={(movie) =>
              onSelectMovie(movie, invidiousSearchEnabled)
            }
          />
        )
      )}
      <button
        className="absolute top-0 right-0 mt-2 mr-16"
        onClick={handleToggleInvidiousSearch}
        title={`Toggle Invidious Search: ${
          invidiousSearchEnabled ? "Enabled" : "Disabled"
        }`}
      >
        <FontAwesomeIcon
          icon={invidiousSearchEnabled ? faToggleOn : faToggleOff}
        />
        <FontAwesomeIcon icon={faYoutube} className="ml-2 text-red-600" />
      </button>
      <button
        className="absolute -right-40 top-0 mt-2 mr-8 text-pink-500"
        onClick={onUnloadPlayer}
        title="Unload player"
      >
        Unload Player
      </button>
    </div>
  );
};

export default SearchModule;
