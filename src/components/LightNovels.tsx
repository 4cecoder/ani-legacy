import React, { useState } from "react";
import axios from "axios";

type LightNovel = {
  href: string;
  image: string;
  title: string;
};

type NovelInfo = {
  title: string;
  description: string;
  author: string;
  status: string;
  genre: string;
  cover: string;
};

type ChapterList = {
  title: string;
  href: string;
};

type ChapterContent = {
  title: string;
  content: string;
};

const LightNovels = () => {
  const [query, setQuery] = useState("");
  const [lightNovels, setLightNovels] = useState<LightNovel[]>([]);
  const [novelInfo, setNovelInfo] = useState<NovelInfo | null>(null);
  const [chapters, setChapters] = useState<ChapterList[]>([]);
  const [chapterContent, setChapterContent] = useState("");
  const [hoveredLink, setHoveredLink] = useState("");
  const [isHoverActive, setIsHoverActive] = useState(false);
  const Proxy = "https://anij.bytecats.codes/proxy/?url=";
  const BaseURL = `${Proxy}https://pipebomb.bytecats.codes/lightnovel/read`;
  const searchLightNovels = async (query: string) => {
    const response = await axios.get(`${BaseURL}/search_novels?q=${query}`);
    setLightNovels(response.data);
  };

  const getNovelInfo = async (href: string) => {
    const response = await axios.get(`${BaseURL}/novel_info?q=${href}`);
    setNovelInfo(response.data[0]);
  };

  const getChapters = async (href: string) => {
    const response = await axios.get(`${BaseURL}/chapters?q=${href}`);
    setChapters(response.data);
  };

  const getChapterContent = async (href: string) => {
    const response = await axios.get(`${BaseURL}/chapter_content?q=${href}`);
    setChapterContent(response.data[0].chapter_text);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchLightNovels(query).then((r) => console.log(r));
  };

  const handleNovelClick = async (href: string) => {
    await getNovelInfo(href);
    await getChapters(href);
  };

  const handleChapterClick = async (href: string) => {
    await getChapterContent(href);
  };

  const handleLinkHover = (href: string) => {
    setIsHoverActive(true);
    setHoveredLink(href);
  };

  const handleLinkLeave = () => {
    setIsHoverActive(false);
    // Add a delay before hiding the hover content
    setTimeout(() => {
      if (!isHoverActive) {
        setHoveredLink("");
      }
    }, 300);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-300">Light Novels</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for light novels..."
          className="w-full rounded rounded-2xl bg-gray-600 p-2 text-gray-300"
        />
      </form>
      {lightNovels.length > 0 && (
        <div>
          <h2 className="mb-2 text-xl font-bold text-gray-300">Results:</h2>
          <ul className="mb-8 list-disc pl-4 text-gray-300">
            {lightNovels.map((novel, index) => (
              <li key={index}>
                <div
                  className="cursor-pointer text-blue-500 hover:text-blue-700"
                  onMouseEnter={() => handleLinkHover(novel.href)}
                  onMouseLeave={handleLinkLeave}
                >
                  {novel.title}
                </div>
                {hoveredLink === novel.href && (
                  <div
                    className="rounded-md border-2 border-gray-300 p-4"
                    onMouseEnter={() => setIsHoverActive(true)}
                    onMouseLeave={handleLinkLeave}
                  >
                    <p className="text-lg font-bold">{novel.title}</p>
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleNovelClick(novel.href)}
                    >
                      View Novel Info
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      {novelInfo && (
        <div>
          <h2 className="mb-2 text-xl font-bold">{novelInfo.title}</h2>
          <div className="flex items-start">
            <img
              src={novelInfo.cover}
              alt={novelInfo.title}
              className="w-1/3"
            />
            <div className="ml-8 flex-1 text-gray-300">
              <p className="mb-2">
                <span className="font-bold text-gray-300">Author:</span>{" "}
                {novelInfo.author}
              </p>
              <p className="mb-2 text-gray-300">
                <span className="font-bold text-gray-300">Status:</span>{" "}
                {novelInfo.status}
              </p>
              <p className="mb-2 text-gray-300">
                <span className="font-bold text-gray-300">Genre:</span>{" "}
                {novelInfo.genre}
              </p>
              <p className="mb-2 text-gray-400">
                <span className="font-bold text-gray-300">Description:</span>{" "}
                {novelInfo.description}
              </p>
            </div>
          </div>
          {chapters.length > 0 && (
            <div>
              <h3 className="mb-2 text-lg font-bold text-gray-300">
                Chapters:
              </h3>
              <ul className="mb-8 list-disc pl-4 text-gray-300">
                {chapters.map((chapter, index) => (
                  <li key={index}>
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleChapterClick(chapter.href)}
                    >
                      {chapter.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {chapterContent && (
            <div>
              <h4 className="mb-2 text-lg font-bold text-gray-300">
                Chapter Content:
              </h4>
              <p className="text-gray-300">{chapterContent}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LightNovels;
