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
  },
  {
    image: ground2,
    name: "Victory Cricket Ground",
    location: "Bangalore",
    price: 1200,
  },
  {
    image:ground3,
    name: "Hindustan Cricket Ground",
    location: "Delhi",
    price: 2000,
  }

 
];

const Trending = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Trending Grounds</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {grounds.map((ground, index) => (
            <TrendingCard
              key={index}
              image={ground.image}
              name={ground.name}
              location={ground.location}
              price={ground.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trending;
