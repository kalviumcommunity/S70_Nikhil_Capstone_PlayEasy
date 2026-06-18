import React from "react";
import { SlidersHorizontal, X } from "lucide-react";

const FiltersSidebar = ({ filters, onChange, onApply, onClear }) => {
  // Every change immediately notifies parent AND triggers apply
  const handleChange = (field, value) => {
    const updated = { ...filters, [field]: value };
    onChange(updated);
    // Auto-apply immediately for every change
    if (onApply) onApply(updated);
  };

  const handleClear = () => {
    const cleared = { location: "", minPrice: "", maxPrice: "", type: "", minRating: "" };
    onChange(cleared);
    if (onClear) onClear(cleared);
  };

  const hasActiveFilters =
    filters.location || filters.minPrice || filters.maxPrice || filters.type || filters.minRating;

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
        <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-green-600" />
          Filters
        </h2>
        {hasActiveFilters && (
          <button
            onClick={handleClear}
            className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 font-semibold transition"
          >
            <X className="w-3 h-3" /> Clear all
          </button>
        )}
      </div>

      <div className="p-5 space-y-6">
        {/* Location */}
        <div>
          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
            Location
          </label>
          <input
            type="text"
            placeholder="City or area..."
            value={filters.location || ""}
            onChange={(e) => handleChange("location", e.target.value)}
            className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 transition"
          />
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
            Price Range (₹/hr)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice || ""}
              onChange={(e) => handleChange("minPrice", e.target.value)}
              className="w-1/2 px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice || ""}
              onChange={(e) => handleChange("maxPrice", e.target.value)}
              className="w-1/2 px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
            />
          </div>
        </div>

        {/* Ground Type */}
        <div>
          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
            Ground Type
          </label>
          <div className="flex flex-wrap gap-2">
            {["Outdoor", "Indoor", "Net"].map((type) => (
              <button
                key={type}
                onClick={() => handleChange("type", filters.type === type ? "" : type)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  filters.type === type
                    ? "bg-green-600 text-white border-green-600 shadow-sm"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:border-green-400 hover:text-green-700"
                }`}
              >
                {type}
              </button>
            ))}
            {filters.type && (
              <button
                onClick={() => handleChange("type", "")}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold border border-dashed border-gray-300 text-gray-400 hover:border-red-300 hover:text-red-400 transition-all"
              >
                All
              </button>
            )}
          </div>
        </div>

        {/* Min Rating */}
        <div>
          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
            Minimum Rating
          </label>
          <div className="flex gap-2">
            {[
              { label: "Any", value: "" },
              { label: "4⭐+", value: "4" },
              { label: "4.5⭐+", value: "4.5" },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleChange("minRating", opt.value)}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  filters.minRating === opt.value
                    ? "bg-green-600 text-white border-green-600 shadow-sm"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:border-green-400 hover:text-green-700"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Active Filter Summary */}
        {hasActiveFilters && (
          <div className="bg-green-50 rounded-xl px-4 py-3 border border-green-100">
            <p className="text-xs font-semibold text-green-700 mb-1.5">Active Filters</p>
            <div className="flex flex-wrap gap-1.5">
              {filters.location && (
                <span className="inline-flex items-center gap-1 bg-white text-green-700 text-[11px] font-medium px-2 py-0.5 rounded-full border border-green-200">
                  📍 {filters.location}
                  <button onClick={() => handleChange("location", "")} className="ml-0.5 text-green-400 hover:text-green-700">×</button>
                </span>
              )}
              {filters.type && (
                <span className="inline-flex items-center gap-1 bg-white text-green-700 text-[11px] font-medium px-2 py-0.5 rounded-full border border-green-200">
                  🏟️ {filters.type}
                  <button onClick={() => handleChange("type", "")} className="ml-0.5 text-green-400 hover:text-green-700">×</button>
                </span>
              )}
              {filters.maxPrice && (
                <span className="inline-flex items-center gap-1 bg-white text-green-700 text-[11px] font-medium px-2 py-0.5 rounded-full border border-green-200">
                  ₹ Max {filters.maxPrice}
                  <button onClick={() => handleChange("maxPrice", "")} className="ml-0.5 text-green-400 hover:text-green-700">×</button>
                </span>
              )}
              {filters.minRating && (
                <span className="inline-flex items-center gap-1 bg-white text-green-700 text-[11px] font-medium px-2 py-0.5 rounded-full border border-green-200">
                  ⭐ {filters.minRating}+
                  <button onClick={() => handleChange("minRating", "")} className="ml-0.5 text-green-400 hover:text-green-700">×</button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FiltersSidebar;
