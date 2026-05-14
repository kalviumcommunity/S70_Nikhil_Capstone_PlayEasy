import React from "react";

const TYPE_COLORS = {
  Outdoor: "bg-sky-100 text-sky-700",
  Indoor: "bg-purple-100 text-purple-700",
  Net: "bg-orange-100 text-orange-700",
};

const GroundCard = ({ ground, onBook, onEdit, onDelete, showActions = false }) => {
  const rating = ground.rating || ground.ratings || 4.5;
  const price = ground.price || ground.pricePerHour || 0;
  const type = ground.type || "Outdoor";

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
      <div className="relative overflow-hidden h-44">
        <img
          src={ground.image || (ground.images && ground.images[0]) || "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&q=80"}
          alt={ground.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Type Badge */}
        <div className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${TYPE_COLORS[type] || "bg-gray-100 text-gray-700"}`}>
          {type}
        </div>
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-yellow-600 text-xs font-bold px-2 py-1 rounded-full shadow">
          ⭐ {Number(rating).toFixed(1)}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-base font-bold text-gray-900 mb-0.5 truncate">{ground.name}</h3>
        <p className="text-gray-500 text-sm flex items-center gap-1 mb-3">
          <span>📍</span> {ground.location}
        </p>

        {/* Amenities */}
        {ground.amenities && ground.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {ground.amenities.slice(0, 3).map((a) => (
              <span key={a} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                {a}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-2">
          <div>
            <span className="text-green-600 font-bold text-lg">
              ₹{Number(price).toLocaleString("en-IN")}
            </span>
            <span className="text-gray-400 text-xs font-normal"> / hr</span>
          </div>
          <button
            onClick={onBook}
            className="bg-green-600 text-white text-sm px-4 py-2 rounded-xl font-semibold hover:bg-green-700 active:scale-95 transition shadow-sm"
          >
            Book Now
          </button>
        </div>

        {showActions && (
          <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
            <button
              onClick={onEdit}
              className="flex-1 bg-amber-50 text-amber-700 border border-amber-200 py-1.5 px-3 rounded-xl text-sm font-medium hover:bg-amber-100 transition"
            >
              ✏️ Edit
            </button>
            <button
              onClick={onDelete}
              className="flex-1 bg-red-50 text-red-600 border border-red-200 py-1.5 px-3 rounded-xl text-sm font-medium hover:bg-red-100 transition"
            >
              🗑️ Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroundCard;
