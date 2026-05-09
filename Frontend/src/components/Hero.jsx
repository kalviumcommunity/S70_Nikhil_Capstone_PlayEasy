import React from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/ground-hero.png.png";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative w-full min-h-[85vh] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <span className="inline-block bg-green-500/20 text-green-300 text-xs font-semibold px-4 py-1.5 rounded-full border border-green-500/30 mb-5 backdrop-blur-sm">
          🏏 India&apos;s #1 Cricket Ground Booking Platform
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-5 leading-tight">
          Book Your Perfect<br />
          <span className="text-green-400">Cricket Ground</span>
        </h1>
        <p className="text-gray-300 text-base sm:text-lg mb-8 max-w-xl mx-auto">
          Find and instantly book cricket grounds and practice nets near you. Floodlights, turf wickets, and more.
        </p>

        {/* Search bar */}
        <div className="bg-white/95 backdrop-blur rounded-2xl p-3 flex flex-col sm:flex-row gap-2 shadow-2xl max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="📍 City or Area"
            className="flex-1 px-4 py-2.5 rounded-xl text-sm text-gray-800 focus:outline-none bg-gray-50 border border-gray-200"
          />
          <input
            type="date"
            className="flex-1 px-4 py-2.5 rounded-xl text-sm text-gray-500 focus:outline-none bg-gray-50 border border-gray-200"
          />
          <input
            type="number"
            placeholder="₹ Max Budget"
            className="flex-1 px-4 py-2.5 rounded-xl text-sm text-gray-800 focus:outline-none bg-gray-50 border border-gray-200"
          />
          <button
            onClick={() => navigate("/booking")}
            className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-green-700 transition text-sm shadow"
          >
            Search
          </button>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 mt-10">
          {[
            { value: "500+", label: "Grounds" },
            { value: "50k+", label: "Players" },
            { value: "4.9★", label: "Rating" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-gray-400 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
