import React from "react";

const FiltersSidebar = ({ filters, onChange, onApply }) => {
  const handleChange = (field, value) => {
    onChange({ ...filters, [field]: value });
  };

  return (
    <div className="w-full bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-base font-bold text-gray-900 mb-5">🔍 Filters</h2>

      {/* Location */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
        <input
          type="text"
          placeholder="City or area..."
          value={filters.location || ""}
          onChange={(e) => handleChange("location", e.target.value)}
          className="w-full p-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
        />
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Price Range (₹/hr)</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice || ""}
            onChange={(e) => handleChange("minPrice", e.target.value)}
            className="w-1/2 p-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice || ""}
            onChange={(e) => handleChange("maxPrice", e.target.value)}
            className="w-1/2 p-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
          />
        </div>
      </div>

      {/* Ground Type */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Ground Type</label>
        <div className="space-y-2">
          {["Outdoor", "Indoor", "Net"].map((type) => (
            <label key={type} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="groundType"
                value={type}
                checked={filters.type === type}
                onChange={() => handleChange("type", type)}
                className="accent-green-600 w-4 h-4"
              />
              <span className="text-sm text-gray-700 group-hover:text-green-600 transition">{type}</span>
            </label>
          ))}
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="radio"
              name="groundType"
              value=""
              checked={!filters.type}
              onChange={() => handleChange("type", "")}
              className="accent-green-600 w-4 h-4"
            />
            <span className="text-sm text-gray-700 group-hover:text-green-600 transition">All Types</span>
          </label>
        </div>
      </div>

      {/* Rating */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Min Rating</label>
        <select
          value={filters.minRating || ""}
          onChange={(e) => handleChange("minRating", e.target.value)}
          className="w-full p-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
        >
          <option value="">Any Rating</option>
          <option value="4">4⭐ and above</option>
          <option value="4.5">4.5⭐ and above</option>
        </select>
      </div>

      <button
        onClick={onApply}
        className="w-full bg-green-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 active:scale-95 transition shadow-sm"
      >
        Apply Filters
      </button>
      <button
        onClick={() => onChange({ location: "", minPrice: "", maxPrice: "", type: "", minRating: "" })}
        className="w-full mt-2 text-gray-500 py-2 rounded-xl text-sm hover:text-gray-700 transition"
      >
        Clear All
      </button>
    </div>
  );
};

export default FiltersSidebar;
