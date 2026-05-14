import React from "react";
import { useNavigate } from "react-router-dom";

const TrendingCard = ({ image, name, location, price, rating = 4.5 }) => {
  const navigate = useNavigate();
  return (
    <div
      className="group bg-white shadow-lg rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      onClick={() => navigate("/booking")}
    >
      <div className="relative overflow-hidden h-44">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Rating badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-yellow-600 text-xs font-bold px-2 py-1 rounded-full shadow">
          ⭐ {rating}
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-green-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="bg-white text-green-700 font-bold px-5 py-2 rounded-full text-sm shadow-lg">
            Book Now →
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-base font-bold text-gray-800 mb-0.5">{name}</h3>
        <p className="text-gray-500 text-sm flex items-center gap-1">
          <span>📍</span> {location}
        </p>
        <p className="mt-2.5 text-green-600 font-bold text-base">
          ₹{price.toLocaleString("en-IN")}
          <span className="text-gray-400 font-normal text-xs"> / hr</span>
        </p>
      </div>
    </div>
  );
};

export default TrendingCard;
