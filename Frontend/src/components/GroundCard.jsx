import React from "react";

const GroundCard = ({ ground, onBook, onEdit, onDelete, showActions = false }) => {
  return (
    <div className="border rounded-lg shadow-lg bg-white overflow-hidden">
      <img
        src={ground.image}
        alt={ground.name}
        className="w-full h-40 object-cover"
      />

      <div className="p-4">
        <h3 className="text-xl font-semibold">{ground.name}</h3>
        <p className="text-gray-500">{ground.location}</p>
        <p className="text-gray-700 mt-1 font-medium">₹{ground.price}</p>

        <button
          onClick={onBook}
          className="mt-4 bg-green-500 text-white w-full py-2 rounded hover:bg-green-600 transition"
        >
          Book Now
        </button>

        {showActions && (
          <div className="flex justify-between mt-2">
            <button
              onClick={onEdit}
              className="bg-yellow-400 text-black py-1 px-3 rounded"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="bg-red-500 text-white py-1 px-3 rounded"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroundCard;
