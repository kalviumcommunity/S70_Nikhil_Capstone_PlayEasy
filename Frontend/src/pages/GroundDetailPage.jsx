import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Shield, Check, Info } from "lucide-react";
import { fetchGroundById } from "../api";
import { useToast } from "../components/Toast";
import BookingDetails from "../components/BookingDetails";

// Import local images as fallbacks
import fallbackGround1 from "../assets/ground1.jpg";
import fallbackGround2 from "../assets/ground2.jpg";
import fallbackGround3 from "../assets/ground3.jpg";
import fallbackGround4 from "../assets/ground4.jpg";

const STATIC_IMAGE_FALLBACKS = [fallbackGround1, fallbackGround2, fallbackGround3, fallbackGround4];

const GroundDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [ground, setGround] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const getGround = async () => {
      setLoading(true);
      try {
        const res = await fetchGroundById(id);
        setGround(res.data);
      } catch {
        toast.error("Failed to load ground details.");
        navigate("/booking");
      } finally {
        setLoading(false);
      }
    };
    getGround();
  }, [id, navigate, toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-500 font-medium">Loading ground details...</p>
        </div>
      </div>
    );
  }

  if (!ground) return null;

  // Resolve images (either array of strings or single string or fallbacks)
  const imageGallery = [];
  if (ground.images && ground.images.length > 0) {
    imageGallery.push(...ground.images);
  } else if (ground.image) {
    imageGallery.push(ground.image);
  }
  // Make sure we have at least 3 images for a premium gallery look
  while (imageGallery.length < 3) {
    const idx = imageGallery.length % STATIC_IMAGE_FALLBACKS.length;
    imageGallery.push(STATIC_IMAGE_FALLBACKS[idx]);
  }

  const rating = ground.rating || ground.ratings || 4.5;
  const type = ground.type || "Outdoor";

  // Generate dynamic, premium description
  const defaultDescription = ground.description || 
    `${ground.name} is a premier cricket venue located in ${ground.location}. Tailored specifically for cricket lovers, this ${type.toLowerCase()} ground features high-quality professional playing surfaces, excellent lighting for day-night matches, and all necessary facilities for a stellar game. Whether you are playing a competitive local league match or a casual corporate game with colleagues, ${ground.name} offers the perfect playing atmosphere.`;

  // Map Embed URL
  const mapQuery = encodeURIComponent(`${ground.name} ${ground.location}`);
  const mapEmbedUrl = `https://maps.google.com/maps?q=${mapQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Top Breadcrumb & Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button
          onClick={() => navigate("/booking")}
          className="flex items-center gap-2 text-gray-600 hover:text-green-600 font-medium transition mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Grounds</span>
        </button>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* LEFT 2 COLUMNS: Detail Gallery & Specs */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Image Gallery */}
            <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm p-4">
              <div className="relative rounded-2xl overflow-hidden h-[300px] sm:h-[400px] bg-gray-100">
                <img
                  src={imageGallery[activeImageIndex]}
                  alt={ground.name}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute top-4 left-4 bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                  {type}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                {imageGallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-16 sm:w-24 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition ${
                      activeImageIndex === idx ? "border-green-500 scale-95" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`${ground.name} thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Header info */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-4">
              <div className="flex justify-between items-start flex-wrap gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">{ground.name}</h1>
                  <p className="text-gray-500 font-medium flex items-center gap-1 mt-2">
                    <MapPin className="w-4 h-4 text-green-500" />
                    <span>{ground.location}</span>
                  </p>
                </div>
                <div className="flex items-center gap-1.5 bg-yellow-50 border border-yellow-100 text-yellow-700 px-3.5 py-1.5 rounded-2xl text-sm font-bold shadow-sm">
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  <span>{Number(rating).toFixed(1)} / 5.0</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-5 mt-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2.5">About the Venue</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{defaultDescription}</p>
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">🏟️ Ground Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {ground.amenities && ground.amenities.length > 0 ? (
                  ground.amenities.map((amenity, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 bg-gray-50 border border-gray-100 p-3.5 rounded-2xl text-xs font-semibold text-gray-700 hover:bg-green-50/30 hover:border-green-200/50 transition-colors"
                    >
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm col-span-full">Standard amenities provided.</p>
                )}
              </div>
            </div>

            {/* Map Integration */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">📍 Location &amp; Directions</h3>
              <div className="rounded-2xl overflow-hidden border border-gray-100 h-64 bg-gray-50 relative">
                <iframe
                  title={`Map location of ${ground.name}`}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={mapEmbedUrl}
                  allowFullScreen
                />
              </div>
            </div>

            {/* Safety & Booking terms */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex gap-4 items-start bg-gradient-to-r from-green-50/20 to-transparent">
              <Shield className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-900 text-sm mb-0.5">PlayEasy Booking Guarantee</h4>
                <p className="text-gray-500 text-xs leading-relaxed">
                  100% verified grounds. Instant check-in confirmation and standard safety measures are strictly enforced at all partnered sports facilities.
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT 1 COLUMN: Sticky booking details */}
          <div className="relative">
            <div className="sticky top-24">
              <BookingDetails ground={ground} />
              
              <div className="mt-4 p-4 rounded-2xl bg-amber-50/50 border border-amber-100 flex gap-2.5 items-start text-amber-800">
                <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed font-medium">
                  <strong>Note:</strong> Bookings can be modified or cancelled up to 24 hours prior to the scheduled slot time.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default GroundDetailPage;
