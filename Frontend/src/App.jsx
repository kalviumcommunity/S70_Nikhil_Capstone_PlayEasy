import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Trending from "./components/Trending";
import Features from "./components/Features";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Auth from "./pages/Auth";
import PaymentPage from "./pages/PaymentPage";

// ✅ Import ManageGrounds component
import ManageGrounds from "./components/ManageGrounds";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Trending />
                <Features />
                <CTA />
              </>
            }
          />
          <Route path="/booking" element={<Booking />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/payment" element={<PaymentPage />} />
          
          {/* ✅ Add Manage Grounds route */}
          <Route path="/manage-grounds" element={<ManageGrounds />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
