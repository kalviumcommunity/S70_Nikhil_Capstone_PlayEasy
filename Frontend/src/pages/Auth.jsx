import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/Toast";
import { loginUser, registerUser } from "../api";
import groundImg from "../assets/cricket-ground.jpg";

const Auth = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const toast = useToast();

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const { data } = await loginUser({ email: formData.email, password: formData.password });
      login(data.user, data.token);
      toast.success(`Welcome back, ${data.user.name.split(" ")[0]}! 🏏`);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      const { data } = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      login(data.user, data.token);
      toast.success(`Account created! Welcome, ${data.user.name.split(" ")[0]}! 🎉`);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Left — Image */}
      <div
        className="hidden md:block w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${groundImg})` }}
      >
        <div className="absolute inset-0 bg-green-900/40 flex flex-col justify-end p-10">
          <h2 className="text-white text-3xl font-bold mb-2">Book Your Ground</h2>
          <p className="text-green-100 text-sm">
            Join thousands of cricket enthusiasts booking their perfect ground on PlayEasy.
          </p>
        </div>
      </div>

      {/* Right — Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-6 py-10">
        <div className="w-full max-w-md">
          {/* Logo */}
          <p className="text-green-600 text-2xl font-bold mb-8 text-center">
            Play<span className="text-gray-900">Easy</span>
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-1 text-center">
            {activeTab === "login" ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-center text-sm text-gray-400 mb-7">
            {activeTab === "login" ? "Sign in to continue" : "Fill in your details to get started"}
          </p>

          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-7">
            {["login", "signup"].map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setFormData({ name: "", email: "", password: "", confirmPassword: "" }); }}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-white text-green-600 shadow"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab === "login" ? "Login" : "Sign Up"}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={activeTab === "login" ? handleLogin : handleSignup} className="space-y-4">
            {activeTab === "signup" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder={activeTab === "login" ? "Enter your password" : "Create a password"}
                autoComplete={activeTab === "login" ? "current-password" : "new-password"}
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
              />
            </div>

            {activeTab === "signup" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                />
              </div>
            )}

            {activeTab === "login" && (
              <div className="text-right">
                <a href="#" className="text-xs text-green-600 hover:underline">Forgot Password?</a>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition shadow-sm disabled:opacity-60 disabled:cursor-not-allowed text-sm"
            >
              {loading ? "Please wait..." : activeTab === "login" ? "Login" : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">or continue with</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social */}
          <div className="flex gap-3">
            {[
              { src: "https://img.icons8.com/ios-filled/20/google-logo.png", alt: "Google" },
              { src: "https://img.icons8.com/ios-filled/20/facebook-new.png", alt: "Facebook" },
              { src: "https://img.icons8.com/ios-filled/20/mac-os.png", alt: "Apple" },
            ].map(({ src, alt }) => (
              <button
                key={alt}
                type="button"
                className="flex-1 flex items-center justify-center gap-2 border border-gray-200 py-2.5 rounded-xl hover:bg-gray-50 transition text-sm text-gray-600"
              >
                <img src={src} alt={alt} className="w-4 h-4" />
                {alt}
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            {activeTab === "login" ? (
              <>Don&apos;t have an account?{" "}
                <button onClick={() => setActiveTab("signup")} className="text-green-600 font-semibold hover:underline">Sign up free</button>
              </>
            ) : (
              <>Already have an account?{" "}
                <button onClick={() => setActiveTab("login")} className="text-green-600 font-semibold hover:underline">Log in</button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
