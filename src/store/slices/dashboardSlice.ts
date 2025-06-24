import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/utils/axios";

interface DashboardStats {
  totalVehicles: number;
  availableVehicles: number;
  unavailableVehicles: number;
  totalUsers: number;
  totalBookings: number;
  revenue: {
    total: number;
    average: number;
  };
  vehicleTypes: {
    [key: string]: number;
  };
}

interface DashboardState {
  stats: DashboardStats;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  stats: {
    totalVehicles: 0,
    availableVehicles: 0,
    unavailableVehicles: 0,
    totalUsers: 0,
    totalBookings: 0,
    revenue: {
      total: 0,
      average: 0,
    },
    vehicleTypes: {},
  },
  loading: false,
  error: null,
};

// Async thunk for fetching dashboard stats
export const fetchDashboardStats = createAsyncThunk(
  "dashboard/fetchStats",
  async () => {
    const response = await axios.get("/api/admin/stats");
    return response.data.data;
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch dashboard stats";
      });
  },
});

export default dashboardSlice.reducer;
