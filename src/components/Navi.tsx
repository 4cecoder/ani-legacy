import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdOutlineCloseFullscreen, MdOutlineMovieFilter } from "react-icons/md";
import Content from "./routes/Content";

const Navi = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="flex h-screen">
      <div className="flex w-20 flex-shrink-0 flex-col justify-between bg-gradient-to-b from-slate-900 to-black">
        <div>
          <div className="inline-flex h-16 w-16 items-center justify-center">
            <a
              href="/"
              className="ml-2 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-3xl font-extrabold text-gray-300 hover:text-transparent"
            >
              Ani-J
            </a>
          </div>

          <button
            className="text-white hover:text-fuchsia-600"
            onClick={toggle}
          >
            <FaBars size={40} />
          </button>

          {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center">
              <div className="absolute inset-0 bg-black opacity-60"></div>
              <div className="absolute left-20 mt-40 ml-4 justify-items-start rounded-lg py-2 pl-1 shadow-xl">
                <button
                  className="m-1 block rounded-3xl p-4 py-2 text-left text-indigo-900 hover:bg-pink-700 "
                  onClick={toggle}
                >
                  <MdOutlineCloseFullscreen size={69} />
                </button>
                <a
                  href="/media"
                  className="block p-4 text-6xl text-gray-400 hover:text-white"
                >
                  <MdOutlineMovieFilter />
                </a>
                <a
                  href="/dashboard"
                  className="block p-4 text-6xl text-gray-400 hover:text-white"
                >
                  <CgProfile />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
      <Content />
    </div>
  );
};

export default Navi;
