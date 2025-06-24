import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
import { AuthState, LoginCredentials } from "../../types";

// Initialize state from localStorage
const token = localStorage.getItem("token");
const storedUser = localStorage.getItem("user");
const user = storedUser ? JSON.parse(storedUser) : null;

const initialState: AuthState = {
  user: user,
  token: token,
  isAuthenticated: !!token && !!user,
  loading: false,
  error: null,
};

export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/auth/admin/login",
        credentials
      );
      if (response.data) {
        // Store both token and user data in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        return response.data;
      }
      return rejectWithValue("Invalid credentials");
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || "Login failed");
      }
      return rejectWithValue("Network error occurred");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: any; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      // Store in localStorage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      // Clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload as string;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      });
  },
});

export const { setCredentials, logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
