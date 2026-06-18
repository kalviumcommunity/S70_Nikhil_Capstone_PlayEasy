import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Clock,
  Trophy,
  Star,
  TrendingUp,
  CheckCircle,
  XCircle,
  Edit3,
  Save,
  X,
  ArrowRight,
  Zap,
  Award,
  Target,
  Shield,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { fetchBookings } from "../api";
import { useToast } from "../components/Toast";

/* ─── Stat Card ─────────────────────────────────────────── */
const StatCard = ({ icon: Icon, label, value, color, bg }) => (
  <div
    className={`rounded-2xl p-5 border flex items-center gap-4 shadow-sm hover:shadow-md transition-all duration-200 ${bg}`}
  >
    <div
      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}
    >
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <p className="text-2xl font-extrabold text-gray-900 leading-tight">{value}</p>
      <p className="text-xs text-gray-500 font-medium mt-0.5">{label}</p>
    </div>
  </div>
);

/* ─── Badge ──────────────────────────────────────────────── */
const Badge = ({ icon, label, description, unlocked }) => (
  <div
    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border text-center transition-all duration-200 ${
      unlocked
        ? "bg-gradient-to-b from-amber-50 to-white border-amber-200 shadow-sm"
        : "bg-gray-50 border-gray-100 opacity-50 grayscale"
    }`}
  >
    <div
      className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${
        unlocked ? "bg-amber-100 shadow-inner" : "bg-gray-100"
      }`}
    >
      {icon}
    </div>
    <p className={`text-xs font-bold ${unlocked ? "text-amber-700" : "text-gray-400"}`}>
      {label}
    </p>
    <p className="text-[10px] text-gray-400 leading-snug">{description}</p>
  </div>
);

/* ─── Main Component ─────────────────────────────────────── */
const ProfilePage = () => {
  const { user, login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  // Edit mode
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }
    setForm({ name: user?.name || "", phone: user?.phone || "" });
    fetchBookings()
      .then((res) => setBookings(res.data || []))
      .catch(() => toast.error("Failed to load your bookings."))
      .finally(() => setLoadingBookings(false));
  }, [isAuthenticated, navigate, user, toast]);

  /* ─── Stats derived from bookings ─── */
  const confirmed = bookings.filter((b) => b.status === "confirmed").length;
  const cancelled = bookings.filter((b) => b.status === "cancelled").length;
  const totalSpent = bookings
    .filter((b) => b.status === "confirmed")
    .reduce((sum, b) => sum + (b.total || 0), 0);
  const recentBookings = bookings.slice(0, 3);

  /* ─── Badges logic ─── */
  const badges = [
    {
      icon: "🏏",
      label: "First Booking",
      description: "Made your very first booking",
      unlocked: bookings.length >= 1,
    },
    {
      icon: "🔥",
      label: "Hat-Trick",
      description: "Booked 3 or more grounds",
      unlocked: bookings.length >= 3,
    },
    {
      icon: "⭐",
      label: "Reviewer",
      description: "Left a review on a ground",
      unlocked: false, // Can be enhanced with reviews API
    },
    {
      icon: "🏆",
      label: "Power Player",
      description: "Spent ₹5,000+ on bookings",
      unlocked: totalSpent >= 5000,
    },
    {
      icon: "📅",
      label: "Regular",
      description: "Booked 5 or more sessions",
      unlocked: bookings.length >= 5,
    },
    {
      icon: "💎",
      label: "Elite Booker",
      description: "Spent ₹15,000+ on bookings",
      unlocked: totalSpent >= 15000,
    },
  ];

  /* ─── Handle profile update (local only) ─── */
  const handleSave = async () => {
    if (!form.name.trim()) {
      toast.error("Name cannot be empty.");
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    const updatedUser = { ...user, name: form.name.trim(), phone: form.phone.trim() };
    localStorage.setItem("playeasy_user", JSON.stringify(updatedUser));
    login(updatedUser, localStorage.getItem("playeasy_token"));
    toast.success("Profile updated successfully!");
    setEditing(false);
    setSaving(false);
  };

  const STATUS_CONFIG = {
    confirmed: { label: "Confirmed", icon: CheckCircle, color: "text-green-600" },
    cancelled: { label: "Cancelled", icon: XCircle, color: "text-red-500" },
    pending: { label: "Pending", icon: Clock, color: "text-amber-500" },
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50/30 pb-16">
      {/* ── Hero Header ──────────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-700 via-green-600 to-emerald-500 pt-10 pb-10">
        {/* decorative circles */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/40 flex items-center justify-center text-white font-extrabold text-4xl shadow-xl">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-amber-400 rounded-full flex items-center justify-center border-2 border-white">
                <Zap className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            {/* Name & email */}
            <div className="text-center sm:text-left pb-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {user?.name}
              </h1>
              <p className="text-green-100 text-sm mt-0.5 flex items-center gap-1 justify-center sm:justify-start">
                <Mail className="w-3.5 h-3.5" />
                {user?.email}
              </p>
              <div className="flex items-center gap-2 mt-2 justify-center sm:justify-start">
                <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Verified Player
                </span>
                <span className="bg-amber-400/80 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm flex items-center gap-1">
                  <Trophy className="w-3 h-3" />
                  {bookings.length} Bookings
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Cards Grid ────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <StatCard
            icon={Calendar}
            label="Total Bookings"
            value={bookings.length}
            color="bg-blue-100 text-blue-600"
            bg="bg-white border-blue-50"
          />
          <StatCard
            icon={CheckCircle}
            label="Confirmed"
            value={confirmed}
            color="bg-green-100 text-green-600"
            bg="bg-white border-green-50"
          />
          <StatCard
            icon={XCircle}
            label="Cancelled"
            value={cancelled}
            color="bg-red-100 text-red-500"
            bg="bg-white border-red-50"
          />
          <StatCard
            icon={TrendingUp}
            label="Total Spent"
            value={`₹${totalSpent.toLocaleString("en-IN")}`}
            color="bg-purple-100 text-purple-600"
            bg="bg-white border-purple-50"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* ── LEFT: Profile Info + Badges ────────────────── */}
          <div className="lg:col-span-1 space-y-5">

            {/* Profile Card */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-gray-900 flex items-center gap-2">
                  <User className="w-4 h-4 text-green-600" />
                  Profile Info
                </h2>
                {!editing ? (
                  <button
                    onClick={() => setEditing(true)}
                    className="flex items-center gap-1 text-xs text-green-600 font-semibold hover:text-green-700 transition"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="flex items-center gap-1 text-xs bg-green-600 text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-60"
                    >
                      <Save className="w-3 h-3" />
                      {saving ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={() => { setEditing(false); setForm({ name: user?.name || "", phone: user?.phone || "" }); }}
                      className="text-gray-400 hover:text-gray-600 transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Full Name</label>
                  {editing ? (
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      className="mt-1 w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
                    />
                  ) : (
                    <p className="mt-1 text-sm font-semibold text-gray-800">{user?.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Email</label>
                  <p className="mt-1 text-sm text-gray-600 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                    {user?.email}
                  </p>
                </div>

                {/* Phone */}
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Phone</label>
                  {editing ? (
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                      placeholder="Add phone number"
                      className="mt-1 w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
                    />
                  ) : (
                    <p className="mt-1 text-sm text-gray-600 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-gray-400" />
                      {user?.phone || (
                        <span className="text-gray-300 italic">Not provided</span>
                      )}
                    </p>
                  )}
                </div>

                {/* Member since */}
                <div className="pt-2 border-t border-gray-50">
                  <p className="text-xs text-gray-400 flex items-center gap-1.5">
                    <Star className="w-3 h-3 text-amber-400" />
                    Member since {new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
                  </p>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
                <Award className="w-4 h-4 text-amber-500" />
                Achievements
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {badges.map((b, i) => (
                  <Badge key={i} {...b} />
                ))}
              </div>
              <p className="text-[11px] text-center text-gray-400 mt-3">
                {badges.filter((b) => b.unlocked).length} / {badges.length} unlocked
              </p>
            </div>
          </div>

          {/* ── RIGHT: Recent Bookings + Quick Actions ─────── */}
          <div className="lg:col-span-2 space-y-5">

            {/* Quick Actions */}
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { icon: Calendar, label: "My Bookings", desc: "View all your bookings", path: "/my-bookings", color: "bg-green-600" },
                { icon: Target, label: "Browse Grounds", desc: "Find & book new grounds", path: "/booking", color: "bg-blue-600" },
                { icon: Trophy, label: "Manage Grounds", desc: "Add or edit your grounds", path: "/manage-grounds", color: "bg-purple-600" },
              ].map((action) => (
                <button
                  key={action.label}
                  onClick={() => navigate(action.path)}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-left group"
                >
                  <div className={`w-9 h-9 ${action.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-sm font-bold text-gray-900">{action.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{action.desc}</p>
                </button>
              ))}
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-gray-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-600" />
                  Recent Bookings
                </h2>
                <button
                  onClick={() => navigate("/my-bookings")}
                  className="text-xs text-green-600 font-semibold hover:text-green-700 flex items-center gap-1 transition"
                >
                  View all <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {loadingBookings ? (
                <div className="flex justify-center py-8">
                  <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : recentBookings.length === 0 ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-3xl">🏏</span>
                  </div>
                  <p className="text-gray-500 text-sm font-medium mb-4">No bookings yet!</p>
                  <button
                    onClick={() => navigate("/booking")}
                    className="bg-green-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-green-700 transition shadow-sm"
                  >
                    Book Your First Ground
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentBookings.map((b) => {
                    const statusConf = STATUS_CONFIG[b.status] || STATUS_CONFIG.pending;
                    const StatusIcon = statusConf.icon;
                    return (
                      <div
                        key={b._id}
                        className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                          b.status === "cancelled"
                            ? "border-gray-100 bg-gray-50/50 opacity-75"
                            : "border-gray-100 hover:border-green-100 hover:bg-green-50/20"
                        }`}
                      >
                        {/* Ground Icon */}
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                          <span className="text-xl">🏟️</span>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-900 text-sm truncate">{b.groundName}</p>
                          <div className="flex flex-wrap gap-2 mt-1 text-xs text-gray-500">
                            <span className="flex items-center gap-0.5">
                              <MapPin className="w-3 h-3 text-green-500" />
                              {b.location}
                            </span>
                            <span className="flex items-center gap-0.5">
                              <Calendar className="w-3 h-3 text-green-500" />
                              {b.date}
                            </span>
                            <span className="flex items-center gap-0.5">
                              <Clock className="w-3 h-3 text-green-500" />
                              {b.timeSlot}
                            </span>
                          </div>
                        </div>

                        {/* Right: price + status */}
                        <div className="text-right flex-shrink-0">
                          <p className="font-bold text-green-600 text-sm">
                            ₹{b.total?.toLocaleString("en-IN")}
                          </p>
                          <span className={`flex items-center gap-0.5 justify-end text-[11px] font-semibold mt-1 ${statusConf.color}`}>
                            <StatusIcon className="w-3 h-3" />
                            {statusConf.label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Spending Overview */}
            {bookings.length > 0 && (
              <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-3xl p-6 text-white shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
                <div className="relative">
                  <p className="text-green-100 text-xs font-semibold uppercase tracking-wide mb-1">
                    Your Contribution
                  </p>
                  <p className="text-3xl font-extrabold mb-1">
                    ₹{totalSpent.toLocaleString("en-IN")}
                  </p>
                  <p className="text-green-100 text-sm">
                    spent across {confirmed} confirmed booking{confirmed !== 1 ? "s" : ""}
                  </p>
                  <div className="mt-4 flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2.5 w-fit backdrop-blur-sm">
                    <Trophy className="w-4 h-4 text-amber-300" />
                    <span className="text-sm font-semibold">
                      {totalSpent >= 15000
                        ? "Elite Booker 💎"
                        : totalSpent >= 5000
                        ? "Power Player 🏆"
                        : totalSpent >= 1000
                        ? "Active Player 🔥"
                        : "Rising Star ⭐"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
