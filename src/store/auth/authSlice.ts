import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { UserInfo } from "../../types/auth";
import { AppState } from "..";
import { authService } from "../../services/auth";
import { GetUserResponse } from "../../types/auth";

type AuthStateType = {
  loading: boolean;
  user: GetUserResponse | null;
  accessToken: string | null;
};

const initialState: AuthStateType = {
  loading: false,
  user: null,
  accessToken: null,
};

const getUserAction = createAsyncThunk("/v1/user", async (_, thunkAPI) => {
  const state = thunkAPI.getState() as AppState;

  if (state.auth.accessToken) {
    const user = await authService.getUser(state.auth.accessToken);
    return { user };
  } else {
    const { access_token } = await authService.refreshToken();

    return {
      user: await authService.getUser(access_token),
      accessToken: access_token,
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
    clearAccessToken: (state) => {
      state.accessToken = null;
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

const { addAccessToken, clearAccessToken } = authSlice.actions;
export { addAccessToken, clearAccessToken, getUserAction };
export default authSlice.reducer;
