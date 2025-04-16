// src/components/GroundCard.jsx
import React from "react";

const GroundCard = ({ ground }) => {
  // Ensure ground.image exists, otherwise use default image
  const imagePath = ground && ground.image ? `/assets/${ground.image}` : "/assets/ground1.jpeg";

  return (
    <div className="border rounded-lg shadow-lg overflow-hidden bg-white">
      <img
        src={imagePath} // Dynamically load ground-specific image
        alt={ground ? ground.name : "Default Ground"}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{ground ? ground.name : "Ground Name"}</h3>
        <p className="text-gray-500">{ground ? ground.location : "Location"}</p>
        <p className="mt-2 font-medium text-lg">{ground ? `₹${ground.price}` : "₹0"}</p>
        <p className="mt-2 text-sm text-gray-500">
          Type: {ground ? ground.type : "N/A"} | Available: {ground ? ground.availability.join(", ") : "N/A"}
        </p>
      </div>
    </div>
  );
};

export default GroundCard;
