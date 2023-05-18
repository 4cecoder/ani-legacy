// src/components/search-media/SearchResultList.tsx
import React, { useEffect, useState } from "react";
import { Film } from "../pipebomb-api/Films";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

type Props = {
  searchResults?: Film[];
  onSelectMovie: (movie: Film) => void;
};

const SearchResultList: React.FC<Props> = ({
  searchResults = [] as Film[],
  onSelectMovie,
}) => {
  const [sortAsc, setSortAsc] = useState(true);
  const [isMouseOnResults, setIsMouseOnResults] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleSort = () => {
    setSortAsc(!sortAsc);
    searchResults.sort((a, b) => {
      if (a.release_date === null) return 1;
      if (b.release_date === null) return -1;
      return sortAsc
        ? new Date(b.release_date).getTime() -
            new Date(a.release_date).getTime()
        : new Date(a.release_date).getTime() -
            new Date(b.release_date).getTime();
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isMouseOnResults) {
        setIsVisible(false);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isMouseOnResults]);

  if (!isVisible) {
    return null;
  }
  console.log("Search results in SearchResultList component:", searchResults); // Add this line

  return (
    <div
      className="absolute z-30 mt-1 w-full rounded-3xl bg-slate-800 bg-opacity-50 text-gray-300 shadow-lg"
      onMouseEnter={() => {
        setIsMouseOnResults(true);
        setIsVisible(true);
      }}
      onMouseLeave={() => setIsMouseOnResults(false)}
    >
      <div className="flex justify-end bg-opacity-20 p-4">
        <button
          className="focus:outline-none"
          title="Sort by date"
          onClick={handleSort}
        >
          <FontAwesomeIcon icon={faSort} />
        </button>
      </div>

      <div className="max-h-64 overflow-auto">
        {searchResults.map((film, index) => (
          <div
            key={index}
            className="cursor-pointer p-4 hover:rounded-3xl hover:bg-indigo-800"
            onClick={() => onSelectMovie(film)}
          >
            {film.thumbnail && (
              <img
                src={film.thumbnail}
                alt={`${film.title} thumbnail`}
                className="mr-2 inline-block h-12 w-20"
              />
            )}
            <h3
              className="inline-block align-middle font-semibold"
              title={film.description}
            >
              {film.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResultList;
