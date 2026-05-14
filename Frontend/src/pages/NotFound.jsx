import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-100 flex flex-col items-center justify-center px-4 text-center">
      <div className="text-8xl mb-6 animate-bounce">🏏</div>
      <h1 className="text-6xl font-extrabold text-gray-900 mb-2">404</h1>
      <h2 className="text-2xl font-bold text-gray-700 mb-3">Wicket Down!</h2>
      <p className="text-gray-500 text-base max-w-sm mb-8">
        The page you're looking for has been run out. Let's get you back to the
        pitch.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => navigate("/")}
          className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition shadow-md"
        >
          Back to Home
        </button>
        <button
          onClick={() => navigate("/booking")}
          className="border-2 border-green-600 text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition"
        >
          Browse Grounds
        </button>
      </div>
    </div>
  );
};

export default NotFound;
