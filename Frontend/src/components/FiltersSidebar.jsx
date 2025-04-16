import React from "react";

const FiltersSidebar = () => {
  return (
    <div className="w-full md:w-64 bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      <label className="block mb-2">Location</label>
      <input
        type="text"
        placeholder="Search location"
        className="w-full p-2 border rounded mb-4"
      />

      <label className="block mb-2">Price Range (₹)</label>
      <div className="flex gap-2 mb-4">
        <input type="number" placeholder="Min" className="w-1/2 p-2 border rounded" />
        <input type="number" placeholder="Max" className="w-1/2 p-2 border rounded" />
      </div>

      <label className="block mb-2">Ground Type</label>
      <div className="mb-4">
        <label className="block">
          <input type="checkbox" className="mr-2" />
          Cricket Ground
        </label>
        <label className="block">
          <input type="checkbox" className="mr-2" />
          Practice Nets
        </label>
      </div>

      <label className="block mb-2">Availability</label>
      <select className="w-full p-2 border rounded mb-4">
        <option>Any time</option>
        <option>Morning</option>
        <option>Evening</option>
      </select>

      <button className="w-full bg-blue-600 text-white py-2 rounded">Apply Filters</button>
    </div>
  );
};

export default FiltersSidebar;
