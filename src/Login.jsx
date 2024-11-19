import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const credentials = {
    user1: { email: "wael@gmail.com", password: "ps1" },
    user2: { email: "user2@example.com", password: "password2" },
    user3: { email: "user3@example.com", password: "password3" },
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = Object.keys(credentials).find(
      (key) =>
        credentials[key].email === email && credentials[key].password === password
    );

    if (user) {
      navigate("/home", { state: { user } }); // Pass the username to the Home component
    } else {
      setError("Incorrect email or password. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-500 via-pink-500 to-red-500">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to Your Account
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Input fields and button (same as before) */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
              placeholder="Enter your password"
            />
          </div>
          {error && <div className="mb-4 text-sm text-red-500 text-center">{error}</div>}
          <button
            type="submit"
            className="w-full py-2 mb-4 text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-md transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
