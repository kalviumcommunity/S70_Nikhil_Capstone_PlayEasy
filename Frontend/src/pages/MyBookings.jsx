import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { fetchBookings, cancelBooking } from "../api";
import { useToast } from "../components/Toast";
import { Calendar, Clock, MapPin } from "lucide-react";

const STATUS_STYLES = {
  confirmed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-600",
  pending: "bg-yellow-100 text-yellow-700",
};

const STATUS_LABELS = {
  confirmed: "✓ Confirmed",
  cancelled: "✗ Cancelled",
  pending: "⏳ Pending",
};

const MyBookings = () => {
  const { user, isAuthenticated } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }
    fetchBookings(user.email)
      .then((res) => setBookings(res.data))
      .catch(() => toast.error("Failed to load bookings."))
      .finally(() => setLoading(false));
  }, [isAuthenticated, user, navigate]);

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    setCancellingId(bookingId);
    try {
      await cancelBooking(bookingId);
      setBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? { ...b, status: "cancelled" } : b))
      );
      toast.success("Booking cancelled successfully.");
    } catch {
      toast.error("Failed to cancel booking. Please try again.");
    } finally {
      setCancellingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  const activeBookings = bookings.filter((b) => b.status !== "cancelled");
  const cancelledBookings = bookings.filter((b) => b.status === "cancelled");

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-7">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
            <p className="text-gray-400 text-sm mt-1">
              {bookings.length === 0
                ? "No bookings yet"
                : `${activeBookings.length} active · ${cancelledBookings.length} cancelled`}
            </p>
          </div>
          <button
            onClick={() => navigate("/booking")}
            className="bg-green-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-green-700 transition shadow-sm"
          >
            + New Booking
          </button>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
            <p className="text-5xl mb-4">🏏</p>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No bookings yet</h3>
            <p className="text-gray-400 text-sm mb-6">Start by booking your first cricket ground!</p>
            <button
              onClick={() => navigate("/booking")}
              className="bg-green-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-green-700 transition"
            >
              Browse Grounds
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <div
                key={b._id}
                className={`bg-white rounded-2xl border shadow-sm p-5 transition ${
                  b.status === "cancelled"
                    ? "border-gray-100 opacity-75"
                    : "border-gray-100 hover:shadow-md"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-bold text-gray-900 truncate">{b.groundName}</h3>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold flex-shrink-0 ${STATUS_STYLES[b.status] || STATUS_STYLES.pending}`}>
                        {STATUS_LABELS[b.status] || b.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-green-500" />{b.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-green-500" />{b.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-green-500" />{b.timeSlot}
                      </span>
                    </div>

                    <p className="text-xs text-gray-400 mt-2 capitalize">
                      Payment: <span className="font-medium">{b.paymentMethod}</span> •{" "}
                      Booked on {new Date(b.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </p>
                  </div>

                  {/* Price + Action */}
                  <div className="text-right flex-shrink-0">
                    <p className="text-lg font-bold text-green-600">₹{b.total?.toLocaleString("en-IN")}</p>
                    {b.basePrice && b.discount > 0 && (
                      <p className="text-xs text-gray-400">
                        Saved ₹{b.discount?.toLocaleString("en-IN")}
                      </p>
                    )}
                    {b.status === "confirmed" && (
                      <button
                        onClick={() => handleCancel(b._id)}
                        disabled={cancellingId === b._id}
                        className="mt-2 text-xs text-red-500 border border-red-200 px-3 py-1 rounded-full hover:bg-red-50 transition disabled:opacity-50"
                      >
                        {cancellingId === b._id ? "Cancelling..." : "Cancel"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
