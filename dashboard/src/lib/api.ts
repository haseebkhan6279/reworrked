import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

export const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("rw-admin-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("rw-admin-token");
      if (!window.location.pathname.includes("/sign-in")) {
        window.location.href = "/sign-in";
      }
    }
    return Promise.reject(err);
  }
);
