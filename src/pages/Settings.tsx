import React from "react";
import { FaLock, FaSignOutAlt } from "react-icons/fa";

const Settings = () => {
  const handleLogout = () => {
    // logic for logging out the user
    alert("User logged out!");
  };

  return (
    <div className="m-16 p-4">
      <h2 className="text-xl font-bold text-gray-300">Account Security</h2>
      <div className="mb-4">
        <label
          className="mb-2 block font-medium text-gray-500"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="focus:shadow-outline w-full appearance-none rounded border border-blue-800 border-teal-500 bg-slate-400 py-2 px-3 leading-tight text-gray-300 text-gray-700 focus:outline-none"
          type="password"
          id="password"
        />
      </div>
      <button
        className="focus:shadow-outline rounded bg-teal-500 py-2 px-4 font-medium text-white hover:bg-teal-700 focus:outline-none"
        onClick={() => alert("Password updated!")}
      >
        <FaLock className="mr-2" />
        Update Password
      </button>
      <br />
      <button
        className="focus:shadow-outline ml-2 mt-4 rounded bg-red-500 py-2 px-4 font-medium text-white hover:bg-red-700 focus:outline-none"
        onClick={handleLogout}
      >
        <FaSignOutAlt className="mr-2" />
        Logout
      </button>
    </div>
  );
};

export default Settings;
