import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { UserInfo } from "../../types/auth";
import { AppState } from "..";
import { authService } from "../../services/auth";
import { GetUserResponse, LogOutResponse } from "../../types/auth";

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

const logOutAction = createAsyncThunk(
  "/v1/user/logout",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as AppState;

    if (state.auth.accessToken) {
      const resp: LogOutResponse = await authService.logOut(
        state.auth.accessToken
      );
      thunkAPI.dispatch(clearAccessToken());
      return resp;
    }
  }
);

// const updateUserAction = createAsyncThunk("/v1/user/logout", async (_, thunkAPI) => {
//   const state = thunkAPI.getState() as AppState;

//   if (state.auth.accessToken) {
//     const user = await authService.getUser(state.auth.accessToken);
//     return { user };
//   } else {
//     const { access_token } = await authService.refreshToken();

//     return {
//       user: await authService.getUser(access_token),
//       accessToken: access_token,
//     };
//   }
// });

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

// const changePasswordAction = createAsyncThunk("/v1/user", async (_, thunkAPI) => {
//   const state = thunkAPI.getState() as AppState;

//   if (state.auth.accessToken) {
//     const user = await authService.getUser(state.auth.accessToken);
//     return { user };
//   } else {
//     const { access_token } = await authService.refreshToken();

//     return {
//       user: await authService.getUser(access_token),
//       accessToken: access_token,
//     };
//   }
// });

// const updateDistanceTravelledAction = createAsyncThunk("/v1/user", async (_, thunkAPI) => {
//   const state = thunkAPI.getState() as AppState;

//   if (state.auth.accessToken) {
//     const user = await authService.getUser(state.auth.accessToken);
//     return { user };
//   } else {
//     const { access_token } = await authService.refreshToken();

//     return {
//       user: await authService.getUser(access_token),
//       accessToken: access_token,
//     };
//   }
// });

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
        if (state.user.distance_travelled === undefined)
          state.user.distance_travelled = 0;
        state.loading = false;
      })
      .addCase(getUserAction.rejected, (state) => {
        state.loading = false;
      })

      .addCase(logOutAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(logOutAction.fulfilled, (state, action) => {
        if (action.payload?.message) {
          console.log(action.payload.message);
        }
        state.loading = false;
      })
      .addCase(logOutAction.rejected, (state) => {
        state.loading = false;
      });
  },
});

const { addAccessToken, clearAccessToken } = authSlice.actions;
export { addAccessToken, clearAccessToken, logOutAction, getUserAction };
export default authSlice.reducer;
