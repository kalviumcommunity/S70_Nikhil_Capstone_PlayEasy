import React from "react";

const GroundCard = ({ name, location, price, rating, image }) => {
  return (
    <div className="bg-white rounded shadow overflow-hidden w-[300px]">
      <img src={image} alt={name} className="w-full h-40 object-cover" />
      <div className="p-3">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-gray-600">{location}</p>
        <p className="text-sm mt-1">Starting from <strong>{price}</strong></p>
        <div className="flex items-center justify-between mt-2">
          <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">⭐ {rating}</span>
          <button className="bg-green-500 text-white px-3 py-1 text-sm rounded hover:bg-green-600">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default GroundCard;
