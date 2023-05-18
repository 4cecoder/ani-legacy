import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState({
    name: false,
    bio: false,
    image: false,
  });
  const [tempChanges, setTempChanges] = useState({
    name: "",
    bio: "",
    image: "",
  });
  const { username } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `https://anij.bytecats.codes/profiles/api/users/${username}`
        );
        setProfile(response.data.profile);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (username) {
      fetchProfile().then((r) => console.log(r));
    }
  }, [username]);

  const handleEditModeToggle = (field) => {
    if (!editMode[field]) {
      setTempChanges({ ...tempChanges, [field]: profile[field] });
    }
    setEditMode({ ...editMode, [field]: !editMode[field] });
  };

  const handleEditChange = (field, value) => {
    setTempChanges({ ...tempChanges, [field]: value });
  };

  const saveChanges = async (field) => {
    if (tempChanges[field].trim() === "") {
      alert("Input cannot be empty!");
      return;
    }

    try {
      const updatedProfile = { ...profile, [field]: tempChanges[field] };
      await axios.put(
        `https://anij.bytecats.codes/profiles/api/users/${username}`,
        updatedProfile
      );
      setProfile(updatedProfile);
      handleEditModeToggle(field);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }
  const {
    name,
    image,
    bio,
    philosophy,
    achievements = [],
    socialLinks = [],
  } = profile;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-indigo-600 text-white dark:bg-gray-800">
      <div className="container mx-auto p-8">
        <div className="flex items-center justify-center">
          <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-indigo-300">
            <img
              src={image || "https://via.placeholder.com/150"}
              alt={name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="mt-4 text-center">
          {editMode.name ? (
            <input
              className="border-b border-white bg-transparent text-4xl font-bold"
              value={tempChanges.name}
              onChange={(e) => handleEditChange("name", e.target.value)}
            />
          ) : (
            <h1 className="text-4xl font-bold">{name}</h1>
          )}
          {editMode.name ? (
            <button
              className="text-sm text-indigo-300 hover:text-white"
              onClick={() => saveChanges("name")}
            >
              Save
            </button>
          ) : (
            <button
              className="text-sm text-indigo-300 hover:text-white"
              onClick={() => handleEditModeToggle("name")}
            >
              Edit
            </button>
          )}
        </div>
        <div className="mt-2 text-center">
          {editMode.bio ? (
            <textarea
              className="w-full border-b border-white bg-transparent"
              value={tempChanges.bio}
              onChange={(e) => handleEditChange("bio", e.target.value)}
            />
          ) : (
            <p>{bio}</p>
          )}

          {editMode.bio ? (
            <button
              className="text-sm text-indigo-300 hover:text-white"
              onClick={() => saveChanges("bio")}
            >
              Save
            </button>
          ) : (
            <button
              className="text-sm text-indigo-300 hover:text-white"
              onClick={() => handleEditModeToggle("bio")}
            >
              Edit
            </button>
          )}
        </div>
        <div className="mt-4 text-center">
          {editMode.image ? (
            <input
              className="w-full border-b border-white bg-transparent"
              value={tempChanges.image}
              onChange={(e) => handleEditChange("image", e.target.value)}
            />
          ) : (
            <p className="text-xs italic">Image URL</p>
          )}

          {editMode.image ? (
            <button
              className="text-sm text-indigo-300 hover:text-white"
              onClick={() => saveChanges("image")}
            >
              Save
            </button>
          ) : (
            <button
              className="text-sm text-indigo-300 hover:text-white"
              onClick={() => handleEditModeToggle("image")}
            >
              Edit
            </button>
          )}
        </div>
        <h2 className="mt-8 text-2xl font-semibold">Philosophy</h2>
        <p className="mt-2">{philosophy}</p>
        <h2 className="mt-8 text-2xl font-semibold">Achievements</h2>
        <ul>
          {achievements.map((achievement, index) => (
            <li key={index}>{achievement.title}</li>
          ))}
        </ul>
        <div className="mt-32 flex items-center justify-center space-x-4">
          {socialLinks.map((social, index) => {
            let icon;
            switch (social.name.toLowerCase()) {
              case "twitter":
                icon = faTwitter;
                break;
              case "facebook":
                icon = faFacebook;
                break;
              case "instagram":
                icon = faInstagram;
                break;
              default:
                break;
            }
            return (
              <div key={index} className="flex flex-col items-center">
                <a
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-2xl text-indigo-300 hover:text-white"
                >
                  <FontAwesomeIcon icon={icon} />
                </a>
                <span>{social.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
