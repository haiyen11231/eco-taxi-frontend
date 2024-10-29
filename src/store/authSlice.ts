import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "../types/auth";
import { authService } from "../services/auth";
import { AppState } from ".";

type AuthStateType = {
  loading: boolean;
  user: UserInfo | null;
  accessToken: string | null;
};

const initialState: AuthStateType = {
  loading: false,
  user: null,
  accessToken: null,
};

const getUserAction = createAsyncThunk("/auth/getUser", async (_, thunkAPI) => {
  const state = thunkAPI.getState() as AppState;

  if (state.auth.accessToken) {
    const user = await authService.getUser(state.auth.accessToken);
    return { user };
  } else {
    const { accessToken } = await authService.refreshToken();

    return {
      user: await authService.getUser(accessToken),
      accessToken: accessToken,
    };
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserAction.fulfilled, (state, action) => {
        if (action.payload.accessToken) {
          state.accessToken = action.payload.accessToken;
        }
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(getUserAction.rejected, (state) => {
        state.loading = false;
      });
  },
});

const { addAccessToken } = authSlice.actions;
export { addAccessToken, getUserAction };
export default authSlice.reducer;
