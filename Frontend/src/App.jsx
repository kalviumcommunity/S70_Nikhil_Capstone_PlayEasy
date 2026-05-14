import React from "react";
import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./components/Toast";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Auth from "./pages/Auth";
import PaymentPage from "./pages/PaymentPage";
import ManageGrounds from "./components/ManageGrounds";
import MyBookings from "./pages/MyBookings";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/login" element={<Auth />} />
              <Route path="/signup" element={<Auth />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/my-bookings" element={<MyBookings />} />
              <Route path="/manage-grounds" element={<ManageGrounds />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ToastProvider>
    </AuthProvider>
  );
};

export default App;
