import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Attach JWT token to every request if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("playeasy_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto-logout on 401 (expired/invalid token) so user doesn't stay stuck
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear stale auth data
      localStorage.removeItem("playeasy_token");
      localStorage.removeItem("playeasy_user");
      // Redirect to auth page only if not already there
      if (!window.location.pathname.includes("/auth")) {
        window.location.href = "/auth";
      }
    }
    return Promise.reject(error);
  }
);

// Auth
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

// Grounds
export const fetchGrounds = (params) => API.get("/grounds", { params });
export const fetchGroundById = (id) => API.get(`/grounds/${id}`);
export const createGround = (data) => API.post("/grounds", data);
export const updateGround = (id, data) => API.put(`/grounds/${id}`, data);
export const deleteGround = (id) => API.delete(`/grounds/${id}`);

// Bookings
export const createBooking = (data) => API.post("/bookings", data);
export const fetchBookings = () => API.get("/bookings");
export const cancelBooking = (id) => API.patch(`/bookings/${id}/cancel`);
export const fetchBookedSlots = (groundName, date) =>
  API.get("/bookings/slots", { params: { groundName, date } });
// Owner: bookings made on a specific ground (any player)
export const fetchGroundBookings = (groundName, date) =>
  API.get("/bookings/for-ground", { params: { groundName, ...(date && { date }) } });
// Owner: only grounds owned by the logged-in user
export const fetchMyGrounds = () => API.get("/grounds/my-grounds");

// Reviews
export const fetchReviews = (groundId) => API.get(`/reviews/${groundId}`);
export const createReview = (data) => API.post("/reviews", data);

export default API;
