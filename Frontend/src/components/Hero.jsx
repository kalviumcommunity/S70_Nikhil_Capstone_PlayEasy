import React from "react";
import heroImage from "../assets/ground-hero.png.png"; // Ensure correct path

const Hero = () => {
  return (
    <div
      className="relative w-full h-[60vh] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="bg-white bg-opacity-60 p-6 rounded-md text-center">
        <h1 className="text-black text-3xl font-bold">Book your Perfect Cricket Ground</h1>
        <p className="text-black mt-2">Find and book cricket grounds and practice nets near you</p>
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            placeholder="Location"
            className="p-2 rounded-md placeholder-gray-500 text-black border"
          />
          <input
            type="date"
            className="p-2 rounded-md placeholder-gray-500 text-black border"
          />
          <input
            type="number"
            placeholder="₹ Price Range"
            className="p-2 rounded-md placeholder-gray-500 text-black border"
          />
          <button className="bg-green-500 text-white p-2 rounded-md">Search</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
