import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import paymentSlice from "./payment/paymentSlice";
// import bookingSlice from "./booking/bookingSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    payment: paymentSlice,
    // booking: bookingSlice,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type DispatchApp = typeof store.dispatch;
