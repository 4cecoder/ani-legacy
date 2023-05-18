import React, { useEffect, useState } from "react";
import { FaCog, FaGithub, FaGlobe, FaTwitter } from "react-icons/fa";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("../test_data/profile.json");
      const data = await response.json();
      setProfileData(data.profile);
    };
    fetchData().then((r) => console.log("done"));
  }, []);

  return (
    <article className="m-5 rounded-xl bg-gradient-to-r from-slate-700 to-gray-800 p-4">
      <div className="mb-2 flex items-center justify-between">
        <img
          alt={profileData.name}
          src={profileData.image}
          className="h-16 w-16 rounded-full object-cover hover:animate-spin"
        />
        <div className="rounded-3xl bg-gradient-to-bl from-fuchsia-300 to-purple-900 p-4">
          <h3 className="mb-1 text-lg font-medium text-white">
            {profileData.name}
          </h3>
          <div className="flow-root">
            <ul className="-m-1 flex flex-wrap">
              {profileData.socialLinks &&
                profileData.socialLinks.map((link, index) => (
                  <li
                    key={index}
                    className={
                      "ml-1 rounded-2xl border p-1 leading-none text-white "
                    }
                  >
                    <a href={link.url}>
                      {link.name === "Twitter" && (
                        <FaTwitter className="hover:animate-bounce" />
                      )}
                      {link.name === "Github" && (
                        <FaGithub className="hover:animate-spin" />
                      )}
                      {link.name === "Website" && (
                        <FaGlobe className="hover:animate-bounce" />
                      )}
                    </a>
                  </li>
                ))}
            </ul>
            <a href="settings">
              <FaCog
                className={`mt-3 text-white hover:animate-spin hover:text-pink-500`}
              />
            </a>
          </div>
        </div>
      </div>
      {profileData.philosophy && (
        <div className="mt-4">
          <h4 className="mt-4 font-medium text-white">
            {profileData.name}'s Philosophy
          </h4>
          <p className="mt-1 text-xs font-medium text-gray-300">
            {profileData.philosophy}
          </p>
        </div>
      )}
      <h2 className="mt-4 font-medium text-white">Achievements</h2>
      <ul className="mt-4 space-y-2">
        {profileData.achievements &&
          profileData.achievements.map(
            (
              achievement: {
                url: string | undefined;
                title:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | React.ReactFragment
                  | React.ReactPortal
                  | null
                  | undefined;
                description:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | React.ReactFragment
                  | React.ReactPortal
                  | null
                  | undefined;
              },
              index: React.Key | null | undefined
            ) => (
              <li key={index}>
                <a
                  href={achievement.url}
                  className="block h-full rounded-lg border border-gray-700 bg-gradient-to-r from-slate-700 to-gray-800 p-4 hover:border-pink-600"
                >
                  <strong className="font-medium text-white">
                    {achievement.title}
                  </strong>
                  <p className="mt-1 text-xs font-medium text-gray-300">
                    {achievement.description}
                  </p>
                </a>
              </li>
            )
          )}
      </ul>
    </article>
  );
};

export default ProfilePage;
