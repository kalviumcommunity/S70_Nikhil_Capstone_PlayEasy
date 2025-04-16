// src/components/GroundCard.jsx
import React from "react";

const GroundCard = ({ ground }) => {
  return (
    <div className="border rounded-lg shadow-lg overflow-hidden bg-white">
      <img
        src={ground.image ? `/assets/${ground.image}` : "/assets/ground1.jpg"} // Use default image from public/assets
        alt={ground.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{ground.name}</h3>
        <p className="text-gray-500">{ground.location}</p>
        <p className="mt-2 font-medium text-lg">₹{ground.price}</p>
        <p className="mt-2 text-sm text-gray-500">
          Type: {ground.type} | Available: {ground.availability.join(", ")}
        </p>
      </div>
    </div>
  );
};

export default GroundCard;
