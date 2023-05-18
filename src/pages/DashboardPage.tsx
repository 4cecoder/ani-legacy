// src/pages/DashboardPage.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DashboardPage: React.FC = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get(
          "https://anij.bytecats.codes/profiles/api/users"
        );
        setProfiles(
          response.data.map((profile: any) => ({
            ...profile,
            isEditing: { name: false, bio: false },
          }))
        );
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    fetchProfiles();
  }, []);

  const deleteProfile = async (username: string) => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
      try {
        await axios.delete(
          `https://anij.bytecats.codes/profiles/api/users/${username}`
        );
        setProfiles(
          profiles.filter((profile) => profile.username !== username)
        );
      } catch (error) {
        console.error("Error deleting profile:", error);
      }
    }
  };

  const toggleEdit = (index: number, field: string) => {
    const updatedProfiles = profiles.map((profile, i) => {
      if (i === index) {
        return {
          ...profile,
          isEditing: {
            ...profile.isEditing,
            [field]: !profile.isEditing[field],
          },
        };
      }
      return profile;
    });
    setProfiles(updatedProfiles);
  };

  const handleEditChange = (index: number, field: string, value: string) => {
    const updatedProfiles = profiles.map((profile, i) => {
      if (i === index) {
        return {
          ...profile,
          profile: { ...profile.profile, [field]: value },
        };
      }
      return profile;
    });
    setProfiles(updatedProfiles);
  };

  const saveChanges = async (profile: any, index: number) => {
    try {
      await axios.put(
        `https://anij.bytecats.codes/profiles/api/users/${profile.username}`,
        profile
      );
      toggleEdit(index);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-800">
      <div className="container mx-auto p-8">
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-300">
          Dashboard
        </h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {profiles.map((profile: any, index: number) => (
            <div
              key={index}
              className="rounded bg-white p-4 shadow-md dark:bg-gray-700"
            >
              {profile.isEditing.name ? (
                <input
                  className="text-xl font-semibold text-gray-300"
                  value={profile.profile.name}
                  onChange={(e) =>
                    handleEditChange(index, "name", e.target.value)
                  }
                />
              ) : (
                <h2 className="text-xl font-semibold text-gray-300">
                  {profile.profile.name}
                </h2>
              )}
              <button
                className="m-2 text-xs text-gray-400"
                onClick={() => toggleEdit(index, "name")}
              >
                {profile.isEditing.name ? "Save" : "Edit"}
              </button>
              {profile.isEditing.bio ? (
                <textarea
                  className="text-sm text-gray-300"
                  value={profile.profile.bio}
                  onChange={(e) =>
                    handleEditChange(index, "bio", e.target.value)
                  }
                />
              ) : (
                <p className="text-sm text-gray-300">{profile.profile.bio}</p>
              )}
              <button
                className="m-2 text-xs text-gray-400"
                onClick={() => toggleEdit(index, "bio")}
              >
                {profile.isEditing.bio ? "Save" : "Edit"}
              </button>
              <Link
                to={`/profile/${profile.username}`}
                className="mt-2 block w-full rounded bg-indigo-500 py-1 px-2 text-white hover:bg-indigo-700"
              >
                View Profile
              </Link>
              <button
                className="mt-2 block w-full rounded bg-red-500 py-1 px-2 text-white hover:bg-red-700"
                onClick={() => deleteProfile(profile.username)}
              >
                Delete Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
