import { configureStore } from "@reduxjs/toolkit";
import vehicleReducer from "./slices/vehicleSlice";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import bookingReducer from "./slices/bookingSlice";
import dashboardReducer from "./slices/dashboardSlice";

export const store = configureStore({
  reducer: {
    vehicles: vehicleReducer,
    auth: authReducer,
    users: userReducer,
    bookings: bookingReducer,
    dashboard: dashboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
