import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User, Mail, Phone, Calendar, MapPin, Clock, Trophy,
  Star, TrendingUp, CheckCircle, XCircle, Edit3, Save,
  X, ArrowRight, Zap, Award, Target, Shield, IndianRupee,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { fetchBookings } from "../api";
import { useToast } from "../components/Toast";

/* ─── Stat Card ─────────────────────────────────────────────────── */
const StatCard = ({ icon: Icon, label, value, accent }) => (
  <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
    <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3 ${accent}`}>
      <Icon className="w-5 h-5" />
    </div>
    <p className="text-2xl font-black text-gray-900 leading-none tracking-tight">{value}</p>
    <p className="text-xs text-gray-400 font-medium mt-1.5 uppercase tracking-wider">{label}</p>
  </div>
);

/* ─── Badge Card ─────────────────────────────────────────────────── */
const Badge = ({ icon, label, description, unlocked }) => (
  <div className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border text-center transition-all duration-200 ${
    unlocked
      ? "bg-gradient-to-b from-amber-50 to-white border-amber-200 shadow-sm"
      : "bg-gray-50/50 border-gray-100"
  }`}>
    {unlocked && (
      <div className="absolute top-2 right-2 w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center">
        <CheckCircle className="w-2.5 h-2.5 text-white" />
      </div>
    )}
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${
      unlocked ? "bg-amber-100" : "bg-gray-100 grayscale opacity-40"
    }`}>
      {icon}
    </div>
    <div>
      <p className={`text-xs font-bold leading-tight ${unlocked ? "text-gray-800" : "text-gray-400"}`}>{label}</p>
      <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">{description}</p>
    </div>
  </div>
);

/* ─── Main Component ─────────────────────────────────────────────── */
const ProfilePage = () => {
  const { user, login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) { navigate("/auth"); return; }
    setForm({ name: user?.name || "", phone: user?.phone || "" });
    fetchBookings()
      .then((res) => setBookings(res.data || []))
      .catch(() => toast.error("Failed to load bookings."))
      .finally(() => setLoadingBookings(false));
  }, [isAuthenticated, navigate, user, toast]);

  const confirmed  = bookings.filter((b) => b.status === "confirmed").length;
  const cancelled  = bookings.filter((b) => b.status === "cancelled").length;
  const totalSpent = bookings.filter((b) => b.status === "confirmed").reduce((s, b) => s + (b.total || 0), 0);
  const recentBookings = bookings.slice(0, 3);

  const playerTier =
    totalSpent >= 15000 ? { label: "Elite Booker", icon: "💎", color: "from-violet-500 to-purple-600" } :
    totalSpent >= 5000  ? { label: "Power Player", icon: "🏆", color: "from-amber-500 to-orange-500"  } :
    bookings.length >= 1 ? { label: "Active Player", icon: "🔥", color: "from-green-500 to-emerald-600" } :
                          { label: "Rising Star",   icon: "⭐", color: "from-sky-500 to-blue-600"      };

  const badges = [
    { icon: "🏏", label: "First Booking",  description: "Made your first booking",   unlocked: bookings.length >= 1  },
    { icon: "🔥", label: "Hat-Trick",      description: "Booked 3+ grounds",          unlocked: bookings.length >= 3  },
    { icon: "⭐", label: "Reviewer",       description: "Left a ground review",        unlocked: false                 },
    { icon: "🏆", label: "Power Player",   description: "Spent ₹5,000+ total",         unlocked: totalSpent >= 5000    },
    { icon: "📅", label: "Regular",        description: "Booked 5+ sessions",          unlocked: bookings.length >= 5  },
    { icon: "💎", label: "Elite Booker",   description: "Spent ₹15,000+ total",        unlocked: totalSpent >= 15000   },
  ];

  const STATUS_CONFIG = {
    confirmed: { label: "Confirmed", icon: CheckCircle, cls: "text-emerald-600 bg-emerald-50" },
    cancelled:  { label: "Cancelled", icon: XCircle,    cls: "text-red-500 bg-red-50"         },
    pending:    { label: "Pending",   icon: Clock,       cls: "text-amber-500 bg-amber-50"     },
  };

  const handleSave = async () => {
    if (!form.name.trim()) { toast.error("Name cannot be empty."); return; }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    const updated = { ...user, name: form.name.trim(), phone: form.phone.trim() };
    localStorage.setItem("playeasy_user", JSON.stringify(updated));
    login(updated, localStorage.getItem("playeasy_token"));
    toast.success("Profile updated!");
    setEditing(false);
    setSaving(false);
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#f7f8fa]">

      {/* ══ HERO ════════════════════════════════════════════════════ */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        {/* background pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #22c55e 0%, transparent 50%), radial-gradient(circle at 80% 20%, #10b981 0%, transparent 40%)" }} />
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-black text-4xl shadow-2xl ring-4 ring-white/10">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <div className={`absolute -bottom-2 -right-2 bg-gradient-to-r ${playerTier.color} text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-lg whitespace-nowrap`}>
                {playerTier.icon} {playerTier.label}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left pt-1">
              <h1 className="text-3xl font-black text-white tracking-tight">{user?.name}</h1>
              <p className="text-gray-400 text-sm mt-1 flex items-center gap-1.5 justify-center sm:justify-start">
                <Mail className="w-3.5 h-3.5" />{user?.email}
              </p>
              <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                <span className="inline-flex items-center gap-1.5 bg-white/10 text-green-300 text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                  <Shield className="w-3 h-3" /> Verified Player
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                  <Trophy className="w-3 h-3 text-amber-400" /> {bookings.length} Bookings
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                  <IndianRupee className="w-3 h-3 text-green-400" /> ₹{totalSpent.toLocaleString("en-IN")} Spent
                </span>
              </div>
            </div>

            {/* Edit Profile Button */}
            <div className="flex-shrink-0">
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold px-4 py-2.5 rounded-xl border border-white/10 transition backdrop-blur-sm"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-1.5 bg-green-500 hover:bg-green-400 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition disabled:opacity-60"
                  >
                    <Save className="w-3.5 h-3.5" />{saving ? "Saving…" : "Save"}
                  </button>
                  <button
                    onClick={() => { setEditing(false); setForm({ name: user?.name || "", phone: user?.phone || "" }); }}
                    className="bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-xl border border-white/10 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ══ STAT CARDS ══════════════════════════════════════════════ */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={Calendar}    label="Total Bookings" value={bookings.length} accent="bg-blue-50 text-blue-600" />
          <StatCard icon={CheckCircle} label="Confirmed"      value={confirmed}       accent="bg-emerald-50 text-emerald-600" />
          <StatCard icon={XCircle}     label="Cancelled"      value={cancelled}       accent="bg-red-50 text-red-500" />
          <StatCard icon={TrendingUp}  label="Total Spent"    value={`₹${totalSpent.toLocaleString("en-IN")}`} accent="bg-violet-50 text-violet-600" />
        </div>
      </div>

      {/* ══ MAIN CONTENT ════════════════════════════════════════════ */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-6 pb-16">
        <div className="grid lg:grid-cols-5 gap-6">

          {/* ── LEFT col (2/5) ─────────────────────────────── */}
          <div className="lg:col-span-2 space-y-5">

            {/* Profile Info */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                <h2 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                  <User className="w-4 h-4 text-green-600" /> Profile Info
                </h2>
              </div>
              <div className="px-6 py-5 space-y-5">
                {/* Name */}
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                  {editing ? (
                    <input
                      type="text" value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      className="mt-1.5 w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
                    />
                  ) : (
                    <p className="mt-1 text-sm font-bold text-gray-800">{user?.name}</p>
                  )}
                </div>
                {/* Email */}
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                  <p className="mt-1 text-sm text-gray-600 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-gray-300" />{user?.email}
                  </p>
                </div>
                {/* Phone */}
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone Number</label>
                  {editing ? (
                    <input
                      type="tel" value={form.phone}
                      onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                      placeholder="Add your phone number"
                      className="mt-1.5 w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
                    />
                  ) : (
                    <p className="mt-1 text-sm text-gray-600 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-gray-300" />
                      {user?.phone || <span className="text-gray-300 italic text-xs">Not provided</span>}
                    </p>
                  )}
                </div>
                {/* Member since */}
                <div className="pt-3 border-t border-gray-50 flex items-center gap-1.5">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <p className="text-xs text-gray-400 font-medium">
                    Member since {new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
                  </p>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                <h2 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" /> Achievements
                </h2>
                <span className="text-xs text-gray-400 font-medium bg-gray-50 px-2 py-0.5 rounded-full">
                  {badges.filter((b) => b.unlocked).length}/{badges.length}
                </span>
              </div>
              <div className="p-4 grid grid-cols-2 gap-3">
                {badges.map((b, i) => <Badge key={i} {...b} />)}
              </div>
              {/* Progress bar */}
              <div className="px-5 pb-5">
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full transition-all duration-700"
                    style={{ width: `${(badges.filter((b) => b.unlocked).length / badges.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT col (3/5) ────────────────────────────── */}
          <div className="lg:col-span-3 space-y-5">

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Calendar, label: "My Bookings",    desc: "View all bookings",       path: "/my-bookings",    gradient: "from-green-500 to-emerald-600" },
                { icon: Target,   label: "Browse Grounds", desc: "Find & book grounds",      path: "/booking",        gradient: "from-blue-500 to-indigo-600"   },
                { icon: Trophy,   label: "Manage Grounds", desc: "Add or edit your grounds", path: "/manage-grounds", gradient: "from-purple-500 to-violet-600" },
              ].map((a) => (
                <button
                  key={a.label}
                  onClick={() => navigate(a.path)}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-left hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
                >
                  <div className={`w-10 h-10 bg-gradient-to-br ${a.gradient} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm`}>
                    <a.icon className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-sm font-bold text-gray-900">{a.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5 leading-tight">{a.desc}</p>
                </button>
              ))}
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                <h2 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-600" /> Recent Bookings
                </h2>
                <button
                  onClick={() => navigate("/my-bookings")}
                  className="text-xs text-green-600 font-semibold hover:text-green-700 flex items-center gap-1 transition"
                >
                  View all <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {loadingBookings ? (
                <div className="flex justify-center py-12">
                  <div className="w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
                </div>
              ) : recentBookings.length === 0 ? (
                <div className="text-center py-14 px-6">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🏏</span>
                  </div>
                  <p className="text-gray-700 font-bold text-sm mb-1">No bookings yet</p>
                  <p className="text-gray-400 text-xs mb-5">Book your first cricket ground and start playing!</p>
                  <button
                    onClick={() => navigate("/booking")}
                    className="bg-green-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-green-700 transition shadow-sm"
                  >
                    Browse Grounds →
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {recentBookings.map((b) => {
                    const s = STATUS_CONFIG[b.status] || STATUS_CONFIG.pending;
                    const SIcon = s.icon;
                    return (
                      <div key={b._id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/50 transition-colors">
                        {/* icon */}
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                          <span className="text-xl">🏟️</span>
                        </div>
                        {/* info */}
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-900 text-sm truncate">{b.groundName}</p>
                          <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-gray-300" />{b.location}
                            </span>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-gray-300" />{b.date}
                            </span>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Clock className="w-3 h-3 text-gray-300" />{b.timeSlot}
                            </span>
                          </div>
                        </div>
                        {/* price + status */}
                        <div className="text-right flex-shrink-0 space-y-1">
                          <p className="font-black text-gray-900 text-sm">₹{b.total?.toLocaleString("en-IN")}</p>
                          <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${s.cls}`}>
                            <SIcon className="w-3 h-3" />{s.label}
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
              <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="absolute inset-0 opacity-20"
                  style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #22c55e 0%, transparent 60%)" }} />
                <div className="relative flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Total Contribution</p>
                    <p className="text-4xl font-black text-white tracking-tight">
                      ₹{totalSpent.toLocaleString("en-IN")}
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      across {confirmed} confirmed booking{confirmed !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className={`flex items-center gap-2.5 bg-gradient-to-r ${playerTier.color} px-5 py-3 rounded-xl shadow-lg`}>
                    <span className="text-2xl">{playerTier.icon}</span>
                    <div>
                      <p className="text-white text-xs font-medium opacity-80">Your Tier</p>
                      <p className="text-white text-sm font-black">{playerTier.label}</p>
                    </div>
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
