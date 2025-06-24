import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
import { BookingState } from "../../types";

const initialState: BookingState = {
  bookings: [],
  loading: false,
  error: null,
};

export const fetchBookings = createAsyncThunk("bookings/fetchAll", async () => {
  const response = await axiosInstance.get("/api/admin/bookings");
  return response.data;
});

export const updateBookingStatus = createAsyncThunk(
  "bookings/updateStatus",
  async ({ id, status }: { id: string; status: string }) => {
    const response = await axiosInstance.put(`/api/admin/bookings/${id}`, {
      status,
    });
    return response.data;
  }
);

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    setBookings: (state, action: PayloadAction<any[]>) => {
      state.bookings = action.payload;
      state.loading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success && action.payload.data) {
          state.bookings = action.payload.data.map((booking: any) => ({
            bookingId: booking._id,
            userName: booking.user?.name || "Unknown",
            vehicle:
              `${booking.vehicle?.brand || ""} ${
                booking.vehicle?.vehicleType || ""
              }`.trim() || "Unknown Vehicle",
            startDate: new Date(booking.startDate).toLocaleString(),
            endDate: new Date(booking.endDate).toLocaleString(),
            includeDriver: booking.includeDriver ? "Yes" : "No",
            price: booking.price || 0,
            status: booking.status || "pending",
            pickupLocation: booking.pickupLocation || "N/A",
            dropLocation: booking.dropLocation || "N/A",
            rentalPlan: booking.rentalPlan?.name || "N/A",
          }));
        } else {
          state.error = "Failed to load bookings";
          state.bookings = [];
        }
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch bookings";
        state.bookings = [];
      })
      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        if (action.payload.success && action.payload.data) {
          const booking = action.payload.data;
          const index = state.bookings.findIndex(
            (b) => b.bookingId === booking._id
          );
          if (index !== -1) {
            state.bookings[index] = {
              bookingId: booking._id,
              userName: booking.user?.name || "Unknown",
              vehicle:
                `${booking.vehicle?.brand || ""} ${
                  booking.vehicle?.vehicleType || ""
                }`.trim() || "Unknown Vehicle",
              startDate: new Date(booking.startDate).toLocaleString(),
              endDate: new Date(booking.endDate).toLocaleString(),
              includeDriver: booking.includeDriver ? "Yes" : "No",
              price: booking.price || 0,
              status: booking.status || "pending",
              pickupLocation: booking.pickupLocation || "N/A",
              dropLocation: booking.dropLocation || "N/A",
              rentalPlan: booking.rentalPlan?.name || "N/A",
            };
          }
        }
      });
  },
});

export const { setBookings, clearError: clearBookingError } =
  bookingSlice.actions;
export default bookingSlice.reducer;
