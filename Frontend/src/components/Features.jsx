import React from "react";

const features = [
  { icon: "⚡", title: "Instant Booking", desc: "Book your ground in under 60 seconds. No waiting, no calls." },
  { icon: "🔒", title: "Secured Payments", desc: "UPI, Card, Net Banking — all 100% encrypted and safe." },
  { icon: "🎯", title: "Reward Points", desc: "Earn points on every booking and redeem them for discounts." },
  { icon: "📞", title: "24/7 Support", desc: "Our team is always available to help you with any issue." },
];

const Features = () => {
  return (
    <section className="py-16 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose PlayEasy?</h2>
          <p className="text-gray-400 mt-3 text-sm max-w-md mx-auto">
            Everything you need to find, book, and enjoy your perfect cricket ground.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-3xl mb-4">{f.icon}</div>
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
