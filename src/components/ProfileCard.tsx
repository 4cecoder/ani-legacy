//src/components/ProfileCard.tsx
import React from "react";

interface ProfileCardProps {
  profile: {
    name: string;
    image: string;
    bio: string;
  };
  onClose: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onClose }) => {
  const { name, image, bio } = profile;

  return (
    <div className="fixed top-1/2 left-1/2 w-64 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-gradient-to-br from-indigo-900 to-indigo-600 p-4 text-white shadow-xl dark:bg-gray-800">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-white focus:outline-none"
      >
        &times;
      </button>
      <div className="flex items-center justify-center">
        <div className="h-16 w-16 overflow-hidden rounded-full border-4 border-indigo-300">
          <img
            src={image || "https://via.placeholder.com/150"}
            alt={name}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <div className="mt-4 text-center">
        <h1 className="text-2xl font-bold">{name}</h1>
      </div>
      <div className="mt-2 text-center">
        <p>{bio}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
