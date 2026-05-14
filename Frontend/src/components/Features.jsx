import React from "react";

const features = [
  {
    icon: "⚡",
    title: "Instant Booking",
    desc: "Book your ground in under 60 seconds. No waiting, no calls.",
    color: "from-yellow-400/20 to-orange-400/10",
    border: "border-yellow-200",
  },
  {
    icon: "🔒",
    title: "Secured Payments",
    desc: "UPI, Card, Net Banking — all 100% encrypted and safe.",
    color: "from-blue-400/20 to-indigo-400/10",
    border: "border-blue-200",
  },
  {
    icon: "🎯",
    title: "Reward Points",
    desc: "Earn points on every booking and redeem them for discounts.",
    color: "from-green-400/20 to-emerald-400/10",
    border: "border-green-200",
  },
  {
    icon: "📞",
    title: "24/7 Support",
    desc: "Our team is always available to help you with any issue.",
    color: "from-purple-400/20 to-pink-400/10",
    border: "border-purple-200",
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-green-50 text-green-600 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-100 mb-3">
            Why PlayEasy?
          </span>
          <h2 className="text-3xl font-bold text-gray-900">Everything You Need</h2>
          <p className="text-gray-400 mt-3 text-sm max-w-md mx-auto">
            Everything you need to find, book, and enjoy your perfect cricket ground.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className={`bg-gradient-to-br ${f.color} rounded-2xl p-6 border ${f.border} hover:shadow-md hover:-translate-y-1 transition-all duration-200`}
            >
              <div className="text-3xl mb-4 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                {f.icon}
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
