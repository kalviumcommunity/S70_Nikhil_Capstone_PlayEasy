import React from "react";
import TrendingCard from "./TrendingCard";
import ground1 from "../assets/stadium1.jpg";
import ground2 from "../assets/stadium2.jpg";
import ground3 from "../assets/stadium3.jpg";


const grounds = [
  {
    image: ground1,
    name: "Green Field Arena",
    location: "Hyderabad",
    price: 1000,
    rating: 4.8,
  },
  {
    image: ground2,
    name: "Victory Cricket Ground",
    location: "Bangalore",
    price: 1200,
    rating: 4.6,
  },
  {
    image: ground3,
    name: "Hindustan Cricket Ground",
    location: "Delhi",
    price: 2000,
    rating: 4.9,
  },
];

const Trending = () => {
  return (
    <section className="py-14 bg-gray-50" id="trending">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">🔥 Trending Grounds</h2>
            <p className="text-gray-400 text-sm mt-1">Most booked this week</p>
          </div>
          <a
            href="/booking"
            className="text-sm text-green-600 font-semibold hover:underline hidden sm:block"
          >
            View All →
          </a>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {grounds.map((ground, index) => (
            <TrendingCard
              key={index}
              image={ground.image}
              name={ground.name}
              location={ground.location}
              price={ground.price}
              rating={ground.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trending;
