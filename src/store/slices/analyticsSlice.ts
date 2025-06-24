import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
import { AnalyticsState } from "../../types";

const initialState: AnalyticsState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchAnalytics = createAsyncThunk(
  "analytics/fetchData",
  async () => {
    const response = await axiosInstance.get("/api/admin/analytics");
    return response.data;
  }
);

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    setAnalytics: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch analytics data";
      });
  },
});

export const { setAnalytics, clearError: clearAnalyticsError } =
  analyticsSlice.actions;
export default analyticsSlice.reducer;
