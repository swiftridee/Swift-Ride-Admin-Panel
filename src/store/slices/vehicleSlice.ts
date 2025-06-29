import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";

interface RentalPlan {
  duration: "12 Hour" | "2 Day" | "3 Day" | "1 Week";
  priceRange: {
    min: number;
    max: number;
  };
}

interface Vehicle {
  _id?: string;
  name: string;
  brand: string;
  vehicleType: "Car" | "Mini Bus" | "Bus" | "Coaster";
  location: string;
  seats: number;
  features: string[];
  image: string;
  rentalPlans: RentalPlan[];
  status: "Available" | "Unavailable";
  createdAt?: string;
  updatedAt?: string;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface VehicleState {
  vehicles: Vehicle[];
  loading: boolean;
  error: string | null;
  selectedVehicle: Vehicle | null;
  pagination: PaginationInfo;
  filters: {
    brand?: string;
    vehicleType?: string;
    location?: string;
    status?: string;
  };
}

const initialState: VehicleState = {
  vehicles: [],
  loading: false,
  error: null,
  selectedVehicle: null,
  pagination: {
    page: 1,
    limit: 3,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  },
  filters: {},
};

// Async thunks
export const getVehicles = createAsyncThunk(
  "vehicles/getAll",
  async (
    params: {
      page?: number;
      limit?: number;
      filters?: VehicleState["filters"];
    } = {}
  ) => {
    try {
      const queryParams = new URLSearchParams({
        page: (params.page || 1).toString(),
        limit: (params.limit || 10).toString(),
        ...(params.filters || {}),
      });

      const response = await axiosInstance.get(
        `/api/admin/vehicles?${queryParams}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch vehicles"
      );
    }
  }
);

export const createVehicle = createAsyncThunk(
  "vehicles/create",
  async (vehicleData: any) => {
    try {
      const response = await axiosInstance.post(
        "/api/admin/vehicles",
        vehicleData
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to create vehicle"
      );
    }
  }
);

export const updateVehicle = createAsyncThunk(
  "vehicles/update",
  async ({ id, vehicleData }: { id: string; vehicleData: any }) => {
    try {
      const response = await axiosInstance.put(
        `/api/admin/vehicles/${id}`,
        vehicleData
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to update vehicle"
      );
    }
  }
);

export const deleteVehicle = createAsyncThunk(
  "vehicles/delete",
  async (id: string) => {
    try {
      await axiosInstance.delete(`/api/admin/vehicles/${id}`);
      return id;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to delete vehicle"
      );
    }
  }
);

const vehicleSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {
    setSelectedVehicle: (state, action) => {
      state.selectedVehicle = action.payload;
    },
    clearSelectedVehicle: (state) => {
      state.selectedVehicle = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
      state.pagination.page = 1; // Reset to first page when filters change
    },
    clearFilters: (state) => {
      state.filters = {};
      state.pagination.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create vehicle
      .addCase(createVehicle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createVehicle.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles = [...state.vehicles, action.payload.data];
      })
      .addCase(createVehicle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Get vehicles
      .addCase(getVehicles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVehicles.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(getVehicles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      // Update vehicle
      .addCase(updateVehicle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVehicle.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.vehicles.findIndex(
          (v: any) => v._id === action.payload.data._id
        );
        if (index !== -1) {
          state.vehicles[index] = action.payload.data;
        }
      })
      .addCase(updateVehicle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Delete vehicle
      .addCase(deleteVehicle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteVehicle.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles = state.vehicles.filter(
          (v: any) => v._id !== action.payload
        );
      })
      .addCase(deleteVehicle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setSelectedVehicle,
  clearSelectedVehicle,
  clearError,
  setFilters,
  clearFilters,
} = vehicleSlice.actions;
export default vehicleSlice.reducer;
