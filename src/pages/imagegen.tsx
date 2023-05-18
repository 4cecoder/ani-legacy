import React, { useState } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ApiResponse {
  data: string[];
  duration: number;
}

const ImageInference: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };
  const BaseURL = "https://anij.bytecats.codes/inference";
  const Proxy = "https://anij.bytecats.codes/proxy/?url=";

  const getImages = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>(`${BaseURL}/run/predict`, {
        data: [`"${inputText}"`],
      });
      setImages((prevImages) => [...prevImages, ...response.data.data]);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-4 text-2xl font-semibold text-gray-300">
        Image Inference
      </h1>
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        className="mb-4 rounded-lg border border-gray-400 bg-gray-800 p-2 text-gray-300"
        placeholder="Enter text here"
      />
      <button
        onClick={getImages}
        className="mb-4 rounded-lg bg-blue-500 p-2 text-white"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Get Images"}
      </button>
      <div className="grid grid-cols-3 gap-4">
        {images.map((imgData, index) => (
          <div key={index} className="relative">
            <FontAwesomeIcon
              icon={faTrashAlt}
              fontSize={20}
              className="absolute top-2 right-1 cursor-pointer text-gray-300"
              onClick={() => {
                setImages((prevImages) =>
                  prevImages.filter((_, i) => i !== index)
                );
              }}
            />
            <img
              src={`${imgData}`}
              alt={`Inferred image ${index}`}
              className="h-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageInference;
