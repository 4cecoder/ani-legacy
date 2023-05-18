// src/components/auth/AuthTest.tsx
import React, { useState } from "react";
import axios from "axios";

interface AuthTestProps {
  setLoggedIn: (loggedIn: boolean) => void;
}
const AuthTest: React.FC<AuthTestProps> = ({ setLoggedIn }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const register = async () => {
    try {
      const response = await axios.post(
        "https://anij.bytecats.codes/auth/register",
        formData
      );
      console.log("Register response:", response.data);
    } catch (error) {
      console.error("Register error:", error.response.data);
    }
  };

  const login = async () => {
    try {
      const response = await axios.post(
        "https://anij.bytecats.codes/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );
      console.log("Login response:", response.data);
    } catch (error) {
      console.error("Login error:", error.response.data);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center text-gray-400">
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-8">
        <h1 className="mb-6 text-2xl font-semibold">Auth Test</h1>
        <form>
          <div className="mb-4">
            <label className="mb-2 block">Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full rounded border border-gray-600 p-2"
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full rounded border border-gray-600 p-2"
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full rounded border border-gray-600 p-2"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={register}
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Register
            </button>
            <button
              type="button"
              onClick={login}
              className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthTest;
