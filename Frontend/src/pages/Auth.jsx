import React, { useState } from "react";
import groundImg from "../assets/cricket-ground.jpg"; // Replace with correct image path

const Auth = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="flex min-h-screen">
      {/* Left Side Image */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${groundImg})` }}
      ></div>

      {/* Right Side Form */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-3/4 max-w-md">
          <h2 className="text-2xl font-semibold text-center mb-2">
            {activeTab === "login" ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-center text-sm text-gray-500 mb-6">
            {activeTab === "login"
              ? "Please enter your details"
              : "Please fill in the details to sign up"}
          </p>

          {/* Tab Switch */}
          <div className="flex justify-center mb-6 space-x-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("login")}
              className={`pb-2 text-sm font-medium ${
                activeTab === "login"
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab("signup")}
              className={`pb-2 text-sm font-medium ${
                activeTab === "signup"
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500"
              }`}
            >
              Signup
            </button>
          </div>

          {/* FORM */}
          <form>
            {activeTab === "signup" && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email or Phone</label>
              <input
                type="text"
                placeholder="Enter your email or phone"
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {activeTab === "signup" && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            )}

            {activeTab === "login" && (
              <div className="text-right text-sm mb-4">
                <a href="#" className="text-green-600 hover:underline">
                  Forgot Password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              {activeTab === "login" ? "Login" : "Sign Up"}
            </button>

            {/* Social Login */}
            <div className="mt-6 text-center">
              <p className="text-sm mb-3">Or Continue with</p>
              <div className="flex justify-center space-x-4">
                <button className="border p-2 rounded">
                  <img src="https://img.icons8.com/ios-filled/20/google-logo.png" alt="Google" />
                </button>
                <button className="border p-2 rounded">
                  <img src="https://img.icons8.com/ios-filled/20/facebook-new.png" alt="Facebook" />
                </button>
                <button className="border p-2 rounded">
                  <img src="https://img.icons8.com/ios-filled/20/mac-os.png" alt="Apple" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
