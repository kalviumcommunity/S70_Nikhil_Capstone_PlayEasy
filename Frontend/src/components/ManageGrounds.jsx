// src/components/ManageGrounds.jsx
import React, { useState } from "react";
import GroundCard from "./GroundCard";

const ManageGrounds = () => {
  const [grounds, setGrounds] = useState([
    {
      id: 1,
      name: "Cricket Arena",
      location: "Hyderabad",
      price: 3000,
      image: "https://via.placeholder.com/400x200?text=Cricket+Arena",
    },
    {
      id: 2,
      name: "Stadium Max",
      location: "Bangalore",
      price: 3500,
      image: "https://via.placeholder.com/400x200?text=Stadium+Max",
    },
  ]);

  const handleUpdate = (id, updatedData) => {
    setGrounds(
      grounds.map((ground) =>
        ground.id === id ? { ...ground, ...updatedData } : ground
      )
    );
  };

  const handleDelete = (id) => {
    setGrounds(grounds.filter((ground) => ground.id !== id));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Grounds</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {grounds.map((ground) => (
          <GroundCard
            key={ground.id}
            ground={ground}
            onBook={() => {}}
            onEdit={() =>
              handleUpdate(ground.id, {
                name: prompt("Enter new name:", ground.name) || ground.name,
                price: parseInt(prompt("Enter new price:", ground.price)) || ground.price,
              })
            }
            onDelete={() => handleDelete(ground.id)}
            showActions={true}
          />
        ))}
      </div>
    </div>
  );
};

export default ManageGrounds;
