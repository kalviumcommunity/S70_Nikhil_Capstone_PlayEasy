import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import GroundCard from "./GroundCard";
import { fetchGrounds, createGround, updateGround, deleteGround } from "../api";
import { useToast } from "./Toast";
import { X } from "lucide-react";

const EMPTY_FORM = {
  name: "",
  location: "",
  pricePerHour: "",
  type: "Outdoor",
  amenities: "",
};

const ManageGrounds = () => {
  const navigate = useNavigate();
  const [grounds, setGrounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingGround, setEditingGround] = useState(null); // null = add mode
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  const loadGrounds = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchGrounds();
      setGrounds(res.data || []);
    } catch {
      toast.error("Failed to load grounds.");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadGrounds();
  }, [loadGrounds]);

  const openAddModal = () => {
    setEditingGround(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  };

  const openEditModal = (ground) => {
    setEditingGround(ground);
    setForm({
      name: ground.name || "",
      location: ground.location || "",
      pricePerHour: ground.pricePerHour || ground.price || "",
      type: ground.type || "Outdoor",
      amenities: (ground.amenities || []).join(", "),
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingGround(null);
    setForm(EMPTY_FORM);
  };

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name || !form.location || !form.pricePerHour) {
      toast.error("Please fill in Name, Location, and Price.");
      return;
    }
    setSaving(true);
    const payload = {
      name: form.name,
      location: form.location,
      pricePerHour: Number(form.pricePerHour),
      type: form.type,
      amenities: form.amenities
        ? form.amenities.split(",").map((a) => a.trim()).filter(Boolean)
        : [],
    };
    try {
      if (editingGround) {
        await updateGround(editingGround._id, payload);
        toast.success("Ground updated successfully!");
      } else {
        await createGround(payload);
        toast.success("Ground added successfully!");
      }
      await loadGrounds();
      closeModal();
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (ground) => {
    if (!window.confirm(`Delete "${ground.name}"? This cannot be undone.`)) return;
    try {
      await deleteGround(ground._id);
      setGrounds((prev) => prev.filter((g) => g._id !== ground._id));
      toast.success("Ground deleted.");
    } catch {
      toast.error("Failed to delete ground.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-7">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage Grounds</h1>
            <p className="text-gray-400 text-sm mt-1">{grounds.length} ground(s) listed</p>
          </div>
          <button
            onClick={openAddModal}
            className="bg-green-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-green-700 transition shadow-sm"
          >
            + Add Ground
          </button>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl h-64 animate-pulse border border-gray-100">
                <div className="h-44 bg-gray-200 rounded-t-2xl" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : grounds.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
            <p className="text-5xl mb-4">🏟️</p>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No grounds yet</h3>
            <p className="text-gray-400 text-sm mb-5">Add your first cricket ground to get started.</p>
            <button
              onClick={openAddModal}
              className="bg-green-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-green-700 transition"
            >
              + Add Ground
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {grounds.map((ground) => (
              <GroundCard
                key={ground._id}
                ground={ground}
                onBook={() => navigate("/booking")}
                onEdit={() => openEditModal(ground)}
                onDelete={() => handleDelete(ground)}
                showActions={true}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">
                {editingGround ? "Edit Ground" : "Add New Ground"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              {[
                { name: "name", label: "Ground Name", placeholder: "e.g. Sunrise Cricket Ground", type: "text" },
                { name: "location", label: "Location / City", placeholder: "e.g. Hyderabad", type: "text" },
                { name: "pricePerHour", label: "Price per Hour (₹)", placeholder: "e.g. 2500", type: "number" },
              ].map((f) => (
                <div key={f.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{f.label}</label>
                  <input
                    type={f.type}
                    name={f.name}
                    placeholder={f.placeholder}
                    value={form[f.name]}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Ground Type</label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
                >
                  <option value="Outdoor">Outdoor</option>
                  <option value="Indoor">Indoor</option>
                  <option value="Net">Net</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Amenities <span className="text-gray-400 font-normal">(comma-separated)</span>
                </label>
                <input
                  type="text"
                  name="amenities"
                  placeholder="e.g. Floodlights, Parking, Turf Wicket"
                  value={form.amenities}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-3 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-3 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition disabled:opacity-60"
                >
                  {saving ? "Saving..." : editingGround ? "Update Ground" : "Add Ground"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageGrounds;
