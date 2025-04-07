import React from "react";

const TrendingCard = ({ image, name, location, price }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img src={image} alt={name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-500">{location}</p>
        <p className="mt-2 text-green-600 font-bold">₹{price} / hour</p>
      </div>
    </div>
  );
};

export default TrendingCard;
