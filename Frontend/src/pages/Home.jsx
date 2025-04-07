import React from "react";
import Hero from "../components/Hero";
import Trending from "../components/Trending";
import Features from "../components/Features";
import CTA from "../components/CTA";

const Home = () => {
  return (
    <div>
      <Hero />
      <Trending />
      <Features />
      <CTA />
    </div>
  );
};

export default Home;
