import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import FiltersSidebar from "../components/FiltersSidebar";
import GroundCard from "../components/GroundCard";
import BookingDetails from "../components/BookingDetails";
import { fetchGrounds } from "../api";

// Fallback static grounds if API has no data yet
import ground1 from "../assets/ground1.jpg";
import ground2 from "../assets/ground2.jpg";
import ground3 from "../assets/ground3.jpg";
import ground4 from "../assets/ground4.jpg";

const STATIC_GROUNDS = [
  {
    _id: "s1",
    name: "Sunrise Cricket Ground",
    location: "Hyderabad",
    price: 2500,
    pricePerHour: 2500,
    type: "Outdoor",
    rating: 4.8,
    amenities: ["Floodlights", "Parking", "Turf Wicket"],
    image: ground1,
  },
  {
    _id: "s2",
    name: "Greenfield Arena",
    location: "Mumbai",
    price: 3000,
    pricePerHour: 3000,
    type: "Indoor",
    rating: 4.5,
    amenities: ["AC", "Changing Room", "Cafeteria"],
    image: ground2,
  },
  {
    _id: "s3",
    name: "Pitch Paradise",
    location: "Chennai",
    price: 2200,
    pricePerHour: 2200,
    type: "Outdoor",
    rating: 4.7,
    amenities: ["Floodlights", "Pavilion"],
    image: ground3,
  },
  {
    _id: "s4",
    name: "All-round Arena",
    location: "Bangalore",
    price: 2800,
    pricePerHour: 2800,
    type: "Net",
    rating: 4.4,
    amenities: ["Practice Nets", "Bowling Machine"],
    image: ground4,
  },
];

const Booking = () => {
  const [searchParams] = useSearchParams();
  const [selectedGround, setSelectedGround] = useState(null);
  const [grounds, setGrounds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize filters from URL query params (from Hero search)
  const [filters, setFilters] = useState({
    location: searchParams.get("city") || "",
    minPrice: "",
    maxPrice: searchParams.get("maxPrice") || "",
    type: "",
    minRating: "",
  });

  const [appliedFilters, setAppliedFilters] = useState({
    location: searchParams.get("city") || "",
    minPrice: "",
    maxPrice: searchParams.get("maxPrice") || "",
    type: "",
    minRating: "",
  });

  useEffect(() => {
    const loadGrounds = async () => {
      setLoading(true);
      try {
        const res = await fetchGrounds({
          location: appliedFilters.location,
          minPrice: appliedFilters.minPrice,
          maxPrice: appliedFilters.maxPrice,
          type: appliedFilters.type,
        });
        const apiGrounds = res.data || [];
        // Use API data and apply client-side minRating filter
        setGrounds(applyClientFilters(apiGrounds, appliedFilters));
      } catch {
        // API unavailable — use static data with client-side filtering
        setGrounds(applyClientFilters(STATIC_GROUNDS, appliedFilters));
      } finally {
        setLoading(false);
      }
    };
    loadGrounds();
  }, [appliedFilters]);

  const applyClientFilters = (data, f) => {
    return data.filter((g) => {
      const price = g.price || g.pricePerHour || 0;
      const rating = g.rating || g.ratings || 0;
      if (f.location && !g.location.toLowerCase().includes(f.location.toLowerCase())) return false;
      if (f.minPrice && price < Number(f.minPrice)) return false;
      if (f.maxPrice && price > Number(f.maxPrice)) return false;
      if (f.type && g.type !== f.type) return false;
      if (f.minRating && rating < Number(f.minRating)) return false;
      return true;
    });
  };

  const handleApplyFilters = () => {
    setAppliedFilters({ ...filters });
    setSelectedGround(null);
  };

  // Called by FiltersSidebar's "Clear All" with the cleared state directly
  // This avoids the async setState timing issue
  const handleClearFilters = (cleared) => {
    setFilters(cleared);
    setAppliedFilters(cleared);
    setSelectedGround(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-100 px-6 sm:px-8 py-5">
        <h1 className="text-2xl font-bold text-gray-900">Book Your Cricket Ground</h1>
        <p className="text-gray-400 text-sm mt-1">
          {loading ? "Loading..." : `${grounds.length} ground${grounds.length !== 1 ? "s" : ""} available`}
          {appliedFilters.location ? ` in ${appliedFilters.location}` : ""}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 px-6 sm:px-8 py-6">
        {/* Sidebar */}
        <div className="w-full lg:w-[260px] flex-shrink-0">
          <FiltersSidebar
            filters={filters}
            onChange={setFilters}
            onApply={handleApplyFilters}
            onClear={handleClearFilters}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex flex-col xl:flex-row gap-6">
            {/* Ground Cards */}
            <div className="flex-1">
              {loading ? (
                <div className="grid sm:grid-cols-2 gap-5">
                  {[1, 2, 3, 4].map((i) => (
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
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">No grounds found</h3>
                  <p className="text-gray-400 text-sm mb-5">
                    Try adjusting your filters or search a different city.
                  </p>
                  <button
                    onClick={() => {
                      setFilters({ location: "", minPrice: "", maxPrice: "", type: "", minRating: "" });
                      setAppliedFilters({ location: "", minPrice: "", maxPrice: "", type: "", minRating: "" });
                    }}
                    className="bg-green-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-green-700 transition"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-5">
                  {grounds.map((ground) => (
                    <GroundCard
                      key={ground._id || ground.name}
                      ground={ground}
                      onBook={() => {
                        setSelectedGround(ground);
                        // Scroll to booking details on mobile
                        if (window.innerWidth < 1280) {
                          setTimeout(() => {
                            document.getElementById("booking-details-panel")?.scrollIntoView({ behavior: "smooth" });
                          }, 100);
                        }
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Booking Details Panel */}
            <div className="w-full xl:w-[300px] flex-shrink-0" id="booking-details-panel">
              {selectedGround ? (
                <BookingDetails ground={selectedGround} />
              ) : (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
                  <p className="text-4xl mb-3">👈</p>
                  <h3 className="font-semibold text-gray-700 mb-1 text-sm">Select a Ground</h3>
                  <p className="text-gray-400 text-xs">
                    Click "Book Now" on any ground to see available dates and time slots.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
