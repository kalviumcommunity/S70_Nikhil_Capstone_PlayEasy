import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import heroImage from "../assets/ground-hero.png.png";

const Hero = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [budget, setBudget] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (city)   params.set("city", city);
    if (date)   params.set("date", date);
    if (budget) params.set("maxPrice", budget);
    navigate(`/booking?${params.toString()}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div
      className="relative w-full min-h-[85vh] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/65" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto w-full">
        <span className="inline-block bg-green-500/20 text-green-300 text-xs font-semibold px-4 py-1.5 rounded-full border border-green-500/30 mb-5 backdrop-blur-sm">
          🏏 India&apos;s #1 Cricket Ground Booking Platform
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-5 leading-tight">
          Book Your Perfect<br />
          <span className="text-green-400">Cricket Ground</span>
        </h1>
        <p className="text-gray-300 text-base sm:text-lg mb-8 max-w-xl mx-auto">
          Find and instantly book cricket grounds and practice nets near you.
          Floodlights, turf wickets, and more.
        </p>

        {/* ── Unified Search Bar ─────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col sm:flex-row max-w-2xl mx-auto border border-white/20">
          {/* City */}
          <div className="flex-1 flex items-center gap-2 px-4 py-3.5 border-b sm:border-b-0 sm:border-r border-gray-100">
            <span className="text-gray-400 flex-shrink-0 text-sm">📍</span>
            <input
              type="text"
              placeholder="City or Area (e.g. Hyderabad)"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full text-sm text-gray-800 placeholder-gray-400 focus:outline-none bg-transparent"
            />
          </div>

          {/* Date */}
          <div className="flex-1 flex items-center gap-2 px-4 py-3.5 border-b sm:border-b-0 sm:border-r border-gray-100">
            <span className="text-gray-400 flex-shrink-0 text-sm">📅</span>
            <input
              type="date"
              min={today}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full text-sm text-gray-500 focus:outline-none bg-transparent"
            />
          </div>

          {/* Budget */}
          <div className="flex-1 flex items-center gap-2 px-4 py-3.5 border-b sm:border-b-0 border-gray-100">
            <span className="text-gray-400 flex-shrink-0 text-sm">₹</span>
            <input
              type="number"
              placeholder="Max Budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full text-sm text-gray-800 placeholder-gray-400 focus:outline-none bg-transparent"
            />
          </div>

          {/* Search Button — flush right, full height */}
          <button
            onClick={handleSearch}
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 active:scale-[0.98] text-white font-semibold text-sm px-7 py-3.5 transition-all duration-150 whitespace-nowrap flex-shrink-0"
          >
            <Search className="w-4 h-4" />
            Search
          </button>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-10 mt-10">
          {[
            { value: "500+", label: "Grounds"  },
            { value: "50k+", label: "Players"  },
            { value: "4.9★", label: "Rating"   },
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
