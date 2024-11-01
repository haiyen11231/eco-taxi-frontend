import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import paymentSlice from "./payment/paymentSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    payment: paymentSlice,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type DispatchApp = typeof store.dispatch;
