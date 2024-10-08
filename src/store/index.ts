import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type DispatchApp = typeof store.dispatch;
