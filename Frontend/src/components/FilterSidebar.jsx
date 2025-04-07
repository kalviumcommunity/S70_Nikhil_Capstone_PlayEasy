import React from "react";

const FilterSidebar = () => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Filters</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium">Location</label>
        <input type="text" placeholder="Search Location" className="w-full mt-1 p-2 border rounded" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Price Range</label>
        <div className="flex gap-2 mt-1">
          <input type="number" placeholder="Min" className="w-1/2 p-2 border rounded" />
          <input type="number" placeholder="Max" className="w-1/2 p-2 border rounded" />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Ground Type</label>
        <div className="mt-1 space-y-1">
          <label className="block"><input type="checkbox" /> Cricket Ground</label>
          <label className="block"><input type="checkbox" /> Practice Nets</label>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Availability</label>
        <select className="w-full mt-1 p-2 border rounded">
          <option>Any time</option>
          <option>Morning</option>
          <option>Afternoon</option>
          <option>Evening</option>
        </select>
      </div>
      <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Apply Filters</button>
    </div>
  );
};

export default FilterSidebar;
