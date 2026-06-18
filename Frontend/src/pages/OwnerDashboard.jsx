import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard, MapPin, Calendar, Clock, Users, IndianRupee,
  TrendingUp, CheckCircle, XCircle, AlertCircle, ChevronRight,
  RefreshCw, Eye, Building2, CalendarDays, ArrowUpRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { fetchGrounds, fetchGroundBookings } from "../api";
import { useToast } from "../components/Toast";

/* ── helpers ──────────────────────────────────────────────────── */
const TODAY = new Date().toISOString().split("T")[0];

const TIME_SLOTS = [
  "06:00 AM – 08:00 AM",
  "08:00 AM – 10:00 AM",
  "10:00 AM – 12:00 PM",
  "12:00 PM – 02:00 PM",
  "02:00 PM – 04:00 PM",
  "04:00 PM – 06:00 PM",
  "06:00 PM – 08:00 PM",
  "08:00 PM – 10:00 PM",
];

const STATUS_CFG = {
  confirmed: { label: "Confirmed", Icon: CheckCircle,  cls: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  cancelled:  { label: "Cancelled", Icon: XCircle,     cls: "text-red-500    bg-red-50    border-red-200"      },
  pending:    { label: "Pending",   Icon: AlertCircle, cls: "text-amber-500  bg-amber-50  border-amber-200"    },
};

/* ── sub-components ────────────────────────────────────────────── */
const StatCard = ({ icon: Icon, label, value, sub, accent, trend }) => (
  <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
    <div className="flex items-start justify-between mb-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${accent}`}>
        <Icon className="w-5 h-5" />
      </div>
      {trend !== undefined && (
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${trend >= 0 ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
          {trend >= 0 ? "+" : ""}{trend}%
        </span>
      )}
    </div>
    <p className="text-2xl font-black text-gray-900 tracking-tight">{value}</p>
    <p className="text-xs font-bold text-gray-500 mt-0.5 uppercase tracking-wider">{label}</p>
    {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
  </div>
);

const StatusBadge = ({ status }) => {
  const cfg = STATUS_CFG[status] || STATUS_CFG.pending;
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border ${cfg.cls}`}>
      <cfg.Icon className="w-3 h-3" />{cfg.label}
    </span>
  );
};

/* ── main component ────────────────────────────────────────────── */
const OwnerDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const [grounds, setGrounds] = useState([]);
  const [selectedGround, setSelectedGround] = useState(null);
  const [bookings, setBookings] = useState([]);          // bookings for selected ground
  const [allBookings, setAllBookings] = useState({});    // { groundName: [...] }
  const [loadingGrounds, setLoadingGrounds] = useState(true);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDate, setFilterDate] = useState("");
  const [activeTab, setActiveTab] = useState("today");   // today | upcoming | all

  /* load all grounds */
  const loadGrounds = useCallback(async () => {
    setLoadingGrounds(true);
    try {
      const res = await fetchGrounds();
      const all = res.data || [];
      setGrounds(all);
      if (all.length > 0 && !selectedGround) setSelectedGround(all[0]);
    } catch {
      toast.error("Failed to load grounds.");
    } finally {
      setLoadingGrounds(false);
    }
  }, [toast]);

  useEffect(() => {
    if (!isAuthenticated) { navigate("/auth"); return; }
    loadGrounds();
  }, [isAuthenticated, navigate, loadGrounds]);

  /* load bookings for selected ground */
  const loadBookingsForGround = useCallback(async (ground) => {
    if (!ground) return;
    setLoadingBookings(true);
    try {
      const res = await fetchGroundBookings(ground.name);
      const data = res.data || [];
      setBookings(data);
      setAllBookings((prev) => ({ ...prev, [ground._id]: data }));
    } catch {
      setBookings([]);
    } finally {
      setLoadingBookings(false);
    }
  }, []);

  useEffect(() => {
    loadBookingsForGround(selectedGround);
  }, [selectedGround, loadBookingsForGround]);

  /* ── derived stats ─────────────────────────────────────────── */
  const todayBookings = bookings.filter((b) => b.date === TODAY);
  const upcomingBookings = bookings.filter((b) => b.date > TODAY && b.status !== "cancelled");
  const totalRevenue = bookings.filter((b) => b.status === "confirmed").reduce((s, b) => s + (b.total || 0), 0);
  const confirmedCount = bookings.filter((b) => b.status === "confirmed").length;

  /* global stats across all grounds */
  const totalGrounds = grounds.length;
  const allGroundBookings = Object.values(allBookings).flat();
  const globalRevenue = allGroundBookings.filter((b) => b.status === "confirmed").reduce((s, b) => s + (b.total || 0), 0);
  const globalToday = allGroundBookings.filter((b) => b.date === TODAY).length;

  /* filtered bookings for table */
  const displayBookings = bookings.filter((b) => {
    if (filterStatus !== "all" && b.status !== filterStatus) return false;
    if (filterDate && b.date !== filterDate) return false;
    return true;
  });

  const tabBookings = activeTab === "today" ? todayBookings
    : activeTab === "upcoming" ? upcomingBookings
    : displayBookings;

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#f7f8fa]">

      {/* ══ HERO HEADER ══════════════════════════════════════════ */}
      <div className="relative bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #22c55e 0%, transparent 50%), radial-gradient(circle at 80% 30%, #10b981 0%, transparent 40%)" }} />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <LayoutDashboard className="w-5 h-5 text-green-400" />
                <span className="text-green-400 text-sm font-semibold uppercase tracking-wider">Owner Dashboard</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">Welcome back, {user?.name?.split(" ")[0]} 👋</h1>
              <p className="text-gray-400 text-sm mt-1">
                {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/manage-grounds")}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold px-4 py-2.5 rounded-xl border border-white/10 transition"
              >
                <Building2 className="w-4 h-4" /> Manage Grounds
              </button>
              <button
                onClick={loadGrounds}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition shadow-lg shadow-green-900/30"
              >
                <RefreshCw className="w-4 h-4" /> Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ══ GLOBAL STAT CARDS ════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Building2}    label="Total Grounds"   value={totalGrounds}      accent="bg-blue-50 text-blue-600" />
          <StatCard icon={CalendarDays} label="Today's Bookings" value={globalToday}       accent="bg-amber-50 text-amber-600" />
          <StatCard icon={IndianRupee}  label="Total Revenue"   value={`₹${globalRevenue.toLocaleString("en-IN")}`} accent="bg-emerald-50 text-emerald-600" />
          <StatCard icon={TrendingUp}   label="Confirmed"        value={allGroundBookings.filter(b=>b.status==="confirmed").length} accent="bg-violet-50 text-violet-600" />
        </div>
      </div>

      {/* ══ MAIN CONTENT ═════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-6 pb-16">
        {loadingGrounds ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
          </div>
        ) : grounds.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
            <p className="text-6xl mb-4">🏟️</p>
            <h3 className="text-lg font-bold text-gray-800 mb-2">No grounds listed yet</h3>
            <p className="text-gray-400 text-sm mb-6">Add your first ground to start receiving bookings.</p>
            <button
              onClick={() => navigate("/manage-grounds")}
              className="bg-green-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-green-700 transition"
            >
              + Add a Ground
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-4 gap-6">

            {/* ── Ground List Sidebar ─────────────────────── */}
            <div className="lg:col-span-1 space-y-3">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1 mb-2">Your Grounds</h2>
              {grounds.map((g) => {
                const gBookings = allBookings[g._id] || [];
                const gToday = gBookings.filter((b) => b.date === TODAY).length;
                const gRevenue = gBookings.filter((b) => b.status === "confirmed").reduce((s, b) => s + (b.total || 0), 0);
                const isSelected = selectedGround?._id === g._id;
                return (
                  <button
                    key={g._id}
                    onClick={() => { setSelectedGround(g); setActiveTab("today"); setFilterStatus("all"); setFilterDate(""); }}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 ${
                      isSelected
                        ? "bg-green-600 border-green-600 shadow-lg shadow-green-200"
                        : "bg-white border-gray-100 hover:border-green-200 hover:shadow-sm"
                    }`}
                  >
                    <div className={`flex items-center justify-between mb-1 ${isSelected ? "text-white" : "text-gray-900"}`}>
                      <p className="font-bold text-sm truncate pr-2">{g.name}</p>
                      <ChevronRight className={`w-4 h-4 flex-shrink-0 ${isSelected ? "text-green-200" : "text-gray-300"}`} />
                    </div>
                    <p className={`text-xs flex items-center gap-1 mb-2 ${isSelected ? "text-green-200" : "text-gray-400"}`}>
                      <MapPin className="w-3 h-3" />{g.location}
                    </p>
                    <div className={`flex gap-3 text-xs font-semibold ${isSelected ? "text-green-100" : "text-gray-500"}`}>
                      <span>{gToday} today</span>
                      <span>·</span>
                      <span>₹{gRevenue.toLocaleString("en-IN")}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* ── Ground Detail Panel ─────────────────────── */}
            <div className="lg:col-span-3 space-y-5">
              {selectedGround && (
                <>
                  {/* Ground Header */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <div className="flex items-start justify-between flex-wrap gap-3">
                      <div>
                        <h2 className="text-xl font-black text-gray-900">{selectedGround.name}</h2>
                        <p className="text-gray-400 text-sm flex items-center gap-1.5 mt-1">
                          <MapPin className="w-3.5 h-3.5" />{selectedGround.location} · {selectedGround.type}
                          <span className="mx-1">·</span>
                          <IndianRupee className="w-3 h-3" />₹{selectedGround.pricePerHour?.toLocaleString("en-IN")}/hr
                        </p>
                      </div>
                      <button
                        onClick={() => navigate(`/grounds/${selectedGround._id}`)}
                        className="flex items-center gap-1.5 text-sm text-green-600 font-semibold hover:text-green-700 transition"
                      >
                        <Eye className="w-4 h-4" /> View Page <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    {/* Mini stats */}
                    <div className="grid grid-cols-3 gap-3 mt-4">
                      {[
                        { label: "Total Bookings", value: bookings.length },
                        { label: "Revenue Earned", value: `₹${totalRevenue.toLocaleString("en-IN")}` },
                        { label: "Confirmed", value: confirmedCount },
                      ].map((s) => (
                        <div key={s.label} className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                          <p className="text-lg font-black text-gray-900">{s.value}</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">{s.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="flex gap-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-1.5">
                    {[
                      { key: "today",    label: `Today (${todayBookings.length})`    },
                      { key: "upcoming", label: `Upcoming (${upcomingBookings.length})` },
                      { key: "all",      label: `All Bookings (${bookings.length})`  },
                    ].map((t) => (
                      <button
                        key={t.key}
                        onClick={() => setActiveTab(t.key)}
                        className={`flex-1 py-2 px-3 rounded-xl text-sm font-semibold transition-all ${
                          activeTab === t.key
                            ? "bg-green-600 text-white shadow-sm"
                            : "text-gray-500 hover:text-gray-900"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>

                  {/* Today's Timeline */}
                  {activeTab === "today" && (
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                      <div className="px-5 py-4 border-b border-gray-50">
                        <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                          <Clock className="w-4 h-4 text-green-600" /> Today's Schedule —{" "}
                          <span className="text-gray-400 font-normal">
                            {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                          </span>
                        </h3>
                      </div>
                      <div className="p-4 space-y-2">
                        {TIME_SLOTS.map((slot) => {
                          const booking = todayBookings.find((b) => b.timeSlot === slot);
                          return (
                            <div
                              key={slot}
                              className={`flex items-center gap-4 p-3.5 rounded-xl border transition-all ${
                                booking
                                  ? "bg-green-50 border-green-200"
                                  : "bg-gray-50 border-gray-100"
                              }`}
                            >
                              <div className={`w-2 h-8 rounded-full flex-shrink-0 ${booking ? "bg-green-500" : "bg-gray-200"}`} />
                              <div className="flex-1 min-w-0">
                                <p className={`text-xs font-bold ${booking ? "text-green-800" : "text-gray-400"}`}>{slot}</p>
                                {booking && (
                                  <div className="flex flex-wrap gap-x-3 mt-0.5">
                                    <p className="text-sm font-bold text-gray-900">{booking.userName}</p>
                                    <p className="text-xs text-gray-500 flex items-center gap-1">
                                      <Users className="w-3 h-3" />{booking.userEmail}
                                    </p>
                                    {booking.userPhone && (
                                      <p className="text-xs text-gray-500">📞 {booking.userPhone}</p>
                                    )}
                                  </div>
                                )}
                              </div>
                              <div className="flex-shrink-0">
                                {booking ? (
                                  <div className="text-right">
                                    <p className="font-black text-green-700 text-sm">₹{booking.total?.toLocaleString("en-IN")}</p>
                                    <StatusBadge status={booking.status} />
                                  </div>
                                ) : (
                                  <span className="text-xs text-gray-300 font-medium">Available</span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                        {todayBookings.length === 0 && (
                          <div className="text-center py-8">
                            <p className="text-3xl mb-2">📅</p>
                            <p className="text-gray-400 text-sm font-medium">No bookings today</p>
                            <p className="text-gray-300 text-xs mt-1">All slots are available</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Upcoming Bookings */}
                  {activeTab === "upcoming" && (
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                      <div className="px-5 py-4 border-b border-gray-50">
                        <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                          <CalendarDays className="w-4 h-4 text-green-600" /> Upcoming Bookings
                        </h3>
                      </div>
                      {loadingBookings ? (
                        <div className="flex justify-center py-10">
                          <div className="w-7 h-7 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
                        </div>
                      ) : upcomingBookings.length === 0 ? (
                        <div className="text-center py-12">
                          <p className="text-3xl mb-2">🗓️</p>
                          <p className="text-gray-400 text-sm">No upcoming bookings</p>
                        </div>
                      ) : (
                        <div className="divide-y divide-gray-50">
                          {upcomingBookings.map((b) => (
                            <div key={b._id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50/50 transition-colors">
                              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                                <span className="text-white font-black text-sm">{b.userName?.charAt(0)?.toUpperCase()}</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-bold text-gray-900 text-sm">{b.userName}</p>
                                <div className="flex flex-wrap gap-x-3 mt-0.5">
                                  <p className="text-xs text-gray-400 flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />{b.date}
                                  </p>
                                  <p className="text-xs text-gray-400 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />{b.timeSlot}
                                  </p>
                                  <p className="text-xs text-gray-400">{b.userEmail}</p>
                                </div>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <p className="font-black text-gray-900 text-sm">₹{b.total?.toLocaleString("en-IN")}</p>
                                <StatusBadge status={b.status} />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* All Bookings Table */}
                  {activeTab === "all" && (
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                      <div className="px-5 py-4 border-b border-gray-50 flex flex-wrap gap-3 items-center justify-between">
                        <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                          <Users className="w-4 h-4 text-green-600" /> All Bookings
                        </h3>
                        <div className="flex gap-2 flex-wrap">
                          {/* Status filter */}
                          <div className="flex gap-1">
                            {["all", "confirmed", "pending", "cancelled"].map((s) => (
                              <button
                                key={s}
                                onClick={() => setFilterStatus(s)}
                                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all capitalize ${
                                  filterStatus === s
                                    ? "bg-green-600 text-white"
                                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                }`}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                          {/* Date filter */}
                          <input
                            type="date"
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                            className="px-3 py-1.5 border border-gray-200 rounded-full text-xs text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
                          />
                          {filterDate && (
                            <button
                              onClick={() => setFilterDate("")}
                              className="px-3 py-1.5 text-xs text-gray-400 hover:text-gray-700"
                            >
                              Clear
                            </button>
                          )}
                        </div>
                      </div>

                      {loadingBookings ? (
                        <div className="flex justify-center py-10">
                          <div className="w-7 h-7 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
                        </div>
                      ) : displayBookings.length === 0 ? (
                        <div className="text-center py-12">
                          <p className="text-3xl mb-2">📋</p>
                          <p className="text-gray-400 text-sm">No bookings found</p>
                          {(filterStatus !== "all" || filterDate) && (
                            <button
                              onClick={() => { setFilterStatus("all"); setFilterDate(""); }}
                              className="mt-3 text-xs text-green-600 font-semibold hover:underline"
                            >
                              Clear filters
                            </button>
                          )}
                        </div>
                      ) : (
                        <>
                          {/* Table */}
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="bg-gray-50 text-left">
                                  {["Player", "Date", "Time Slot", "Amount", "Payment", "Status"].map((h) => (
                                    <th key={h} className="px-5 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">{h}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-50">
                                {displayBookings.map((b) => (
                                  <tr key={b._id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-5 py-3.5">
                                      <p className="font-bold text-gray-900">{b.userName}</p>
                                      <p className="text-xs text-gray-400">{b.userEmail}</p>
                                      {b.userPhone && <p className="text-xs text-gray-400">📞 {b.userPhone}</p>}
                                    </td>
                                    <td className="px-5 py-3.5 text-gray-600 whitespace-nowrap">{b.date}</td>
                                    <td className="px-5 py-3.5 text-gray-600 whitespace-nowrap text-xs">{b.timeSlot}</td>
                                    <td className="px-5 py-3.5 font-black text-gray-900">₹{b.total?.toLocaleString("en-IN")}</td>
                                    <td className="px-5 py-3.5 text-gray-500 uppercase text-xs">{b.paymentMethod}</td>
                                    <td className="px-5 py-3.5"><StatusBadge status={b.status} /></td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          {/* Footer */}
                          <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                            <p className="text-xs text-gray-400">{displayBookings.length} booking{displayBookings.length !== 1 ? "s" : ""}</p>
                            <p className="text-xs font-bold text-gray-700">
                              Total: ₹{displayBookings.filter(b=>b.status==="confirmed").reduce((s,b)=>s+b.total,0).toLocaleString("en-IN")} confirmed
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
