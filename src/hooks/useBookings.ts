import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  fetchBookings,
  updateBookingStatus,
  clearBookingError,
} from "../store/slices/bookingSlice";

export const useBookings = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector(
    (state: RootState) => state.bookings
  );

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  const handleUpdateStatus = async (
    bookingId: string,
    status: "pending" | "confirmed" | "completed" | "cancelled"
  ) => {
    try {
      await dispatch(updateBookingStatus({ bookingId, status }));
    } catch (err) {
      console.error("Update booking status error:", err);
    }
  };

  const handleClearError = () => {
    dispatch(clearBookingError());
  };

  return {
    bookings,
    loading,
    error,
    handleUpdateStatus,
    handleClearError,
  };
};
