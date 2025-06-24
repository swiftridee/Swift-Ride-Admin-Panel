import axios from "axios";
import { AuthResponse } from "@/types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if it exists
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth utilities
export const auth = {
  // Register new user
  async register(
    name: string,
    email: string,
    password: string,
    city: string,
    cnic: string
  ): Promise<AuthResponse> {
    const response = await axiosInstance.post<AuthResponse>(
      "/api/auth/register",
      {
        name,
        email,
        password,
        city,
        cnic,
      }
    );

    if (response.data.success) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }

    return response.data;
  },

  // Login user
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await axiosInstance.post<AuthResponse>(
      "/api/auth/admin/login",
      {
        email: email,
        password: password,
      }
    );

    if (response.data.success) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }

    return response.data;
  },

  // Logout user
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem("token") && !!localStorage.getItem("user");
  },
};

export default axiosInstance;
