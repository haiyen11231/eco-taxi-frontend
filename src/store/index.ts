import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import paymentSlice from "./paymentSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    payment: paymentSlice,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type DispatchApp = typeof store.dispatch;
