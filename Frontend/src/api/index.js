import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Attach JWT token to every request if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("playeasy_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

// Grounds
export const fetchGrounds = (params) => API.get("/grounds", { params });
export const createGround = (data) => API.post("/grounds", data);
export const updateGround = (id, data) => API.put(`/grounds/${id}`, data);
export const deleteGround = (id) => API.delete(`/grounds/${id}`);

// Bookings
export const createBooking = (data) => API.post("/bookings", data);
export const fetchBookings = (email) => API.get("/bookings", { params: { email } });

export default API;
