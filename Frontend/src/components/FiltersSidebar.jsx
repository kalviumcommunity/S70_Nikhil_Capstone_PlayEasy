// FilterSidebar.jsx

import { useState } from "react";

const FilterSidebar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
    type: [],
    availability: "",
  });

  const handleChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;

    if (inputType === "checkbox") {
      const newTypes = checked
        ? [...filters.type, value]
        : filters.type.filter((t) => t !== value);

      setFilters({ ...filters, type: newTypes });
    } else {
      setFilters({ ...filters, [name]: value });
    }
  };

  const applyFilters = () => {
    // Ensure the function is correctly called
    if (onFilterChange) {
      onFilterChange(filters);
    }
  };

  return (
    <div className="p-4 border rounded shadow w-64 bg-white">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      {/* Location */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Location</label>
        <input
          type="text"
          name="location"
          value={filters.location}
          onChange={handleChange}
          placeholder="Search location"
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Price Range (₹)</label>
        <div className="flex gap-2">
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            placeholder="Min"
            className="w-1/2 p-2 border rounded"
          />
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            placeholder="Max"
            className="w-1/2 p-2 border rounded"
          />
        </div>
      </div>

      {/* Ground Type */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Ground Type</label>
        <div>
          <label className="block">
            <input
              type="checkbox"
              value="Cricket Ground"
              checked={filters.type.includes("Cricket Ground")}
              onChange={handleChange}
              className="mr-2"
            />
            Cricket Ground
          </label>
          <label className="block">
            <input
              type="checkbox"
              value="Practice Nets"
              checked={filters.type.includes("Practice Nets")}
              onChange={handleChange}
              className="mr-2"
            />
            Practice Nets
          </label>
        </div>
      </div>

      {/* Availability */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Availability</label>
        <select
          name="availability"
          value={filters.availability}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Any time</option>
          <option value="morning">Morning</option>
          <option value="evening">Evening</option>
        </select>
      </div>

      <button
        onClick={applyFilters}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
