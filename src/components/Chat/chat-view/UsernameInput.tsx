import React, { useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import axios from "axios";

interface UsernameInputProps {
  handleUsernameSubmit: (
    e: React.KeyboardEvent<HTMLInputElement>,
    preloadedAvatar: string | null
  ) => void;
}

const UsernameInput: React.FC<UsernameInputProps> = ({
  handleUsernameSubmit,
}) => {
  const [warningMessage, setWarningMessage] = useState("");
  const [preloadedAvatar, setPreloadedAvatar] = useState<string | null>(null);

  const preloadAvatar = async (username: string): Promise<string | null> => {
    try {
      const response = await axios.get(
        `https://pipebomb.bytecats.codes/profiles/api/users/${username}`
      );
      return response.data.profile.image;
    } catch (error) {
      console.error("Error fetching avatar:", error);
      return null;
    }
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const regex = /^[a-zA-Z0-9]*$/;

    if (input.length > 30) {
      setWarningMessage("Username cannot be more than 30 characters.");
    } else if (!regex.test(input)) {
      setWarningMessage("Only alphanumeric characters are allowed.");
    } else {
      setWarningMessage("");
      setPreloadedAvatar(await preloadAvatar(input));
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        className="mb-2 w-full rounded-2xl border bg-gray-800 p-2 text-purple-600"
        onKeyDown={(e) => handleUsernameSubmit(e, preloadedAvatar)}
        onChange={handleInputChange}
        placeholder="Enter your username"
      />
      {warningMessage && (
        <div className="mt-2 flex items-center text-red-500">
          <FaExclamationCircle className="mr-1" />
          {warningMessage}
        </div>
      )}
    </div>
  );
};

export default UsernameInput;
