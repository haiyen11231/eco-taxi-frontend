import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { UserInfo } from "../../types/auth";
import { AppState } from "..";
import { authService } from "../../services/auth";
import {
  ChangePasswordRequest,
  GetUserResponse,
  LogOutResponse,
  UpdateUserRequest,
} from "../../types/auth";
import { AxiosError } from "axios";

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

const updateUserAction = createAsyncThunk(
  "/v1/user/update",
  async ({ name, phone_number, email }: UpdateUserRequest, thunkAPI) => {
    const state = thunkAPI.getState() as AppState;

    try {
      if (state.auth.accessToken) {
        return await authService.updateUser(
          state.auth.accessToken,
          name,
          phone_number,
          email
        );
      } else {
        const { access_token } = await authService.refreshToken();
        thunkAPI.dispatch(addAccessToken(access_token)); // Store new access token
        return await authService.updateUser(
          access_token,
          name,
          phone_number,
          email
        );
      }
    } catch (err) {
      const error = err as AxiosError;
      // Handle specific error for expired token if necessary
      if (error.response && error.response.status === 401) {
        // Token is expired, try to refresh
        const { access_token } = await authService.refreshToken();
        thunkAPI.dispatch(addAccessToken(access_token));
        return await authService.updateUser(
          access_token,
          name,
          phone_number,
          email
        );
      }
      // Optionally, rethrow the error to be handled elsewhere
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// const getUserAction = createAsyncThunk("/v1/user", async (_, thunkAPI) => {
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

const getUserAction = createAsyncThunk("auth/getUser", async (_, thunkAPI) => {
  const state = thunkAPI.getState() as AppState;

  try {
    if (state.auth.accessToken) {
      const user = await authService.getUser(state.auth.accessToken);
      return { user };
    } else {
      const { access_token } = await authService.refreshToken();
      thunkAPI.dispatch(addAccessToken(access_token)); // Store new access token
      const user = await authService.getUser(access_token);
      return { user, accessToken: access_token };
    }
  } catch (err) {
    const error = err as AxiosError;
    // Handle specific error for expired token if necessary
    if (error.response && error.response.status === 401) {
      // Token is expired, try to refresh
      const { access_token } = await authService.refreshToken();
      thunkAPI.dispatch(addAccessToken(access_token));
      const user = await authService.getUser(access_token);
      return { user, accessToken: access_token };
    }
    // Optionally, rethrow the error to be handled elsewhere
    return thunkAPI.rejectWithValue(error);
  }
});

const changePasswordAction = createAsyncThunk(
  "/v1/user/change-password",
  async ({ old_password, new_password }: ChangePasswordRequest, thunkAPI) => {
    const state = thunkAPI.getState() as AppState;

    try {
      if (state.auth.accessToken) {
        return await authService.changePassword(
          state.auth.accessToken,
          old_password,
          new_password
        );
      } else {
        const { access_token } = await authService.refreshToken();
        thunkAPI.dispatch(addAccessToken(access_token)); // Store new access token
        return await authService.changePassword(
          access_token,
          old_password,
          new_password
        );
      }
    } catch (err) {
      const error = err as AxiosError;
      // Handle specific error for expired token if necessary
      if (error.response && error.response.status === 401) {
        // Token is expired, try to refresh
        const { access_token } = await authService.refreshToken();
        thunkAPI.dispatch(addAccessToken(access_token));
        return await authService.changePassword(
          access_token,
          old_password,
          new_password
        );
      }
      // Optionally, rethrow the error to be handled elsewhere
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const updateDistanceTravelledAction = createAsyncThunk(
  "/v1/user/update-distance",
  async (distance: number, thunkAPI) => {
    const state = thunkAPI.getState() as AppState;

    try {
      if (state.auth.accessToken) {
        return await authService.updateDistanceTravelled(
          state.auth.accessToken,
          distance
        );
      } else {
        const { access_token } = await authService.refreshToken();
        thunkAPI.dispatch(addAccessToken(access_token)); // Store new access token
        return await authService.updateDistanceTravelled(
          access_token,
          distance
        );
      }
    } catch (err) {
      const error = err as AxiosError;
      // Handle specific error for expired token if necessary
      if (error.response && error.response.status === 401) {
        // Token is expired, try to refresh
        const { access_token } = await authService.refreshToken();
        thunkAPI.dispatch(addAccessToken(access_token));
        return await authService.updateDistanceTravelled(
          access_token,
          distance
        );
      }
      // Optionally, rethrow the error to be handled elsewhere
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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
      .addCase(getUserAction.rejected, (state, action) => {
        state.loading = false;
        console.error("Failed to fetch user:", action.payload);
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
      })

      .addCase(updateUserAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserAction.fulfilled, (state, action) => {
        if (action.payload?.message) {
          console.log(action.payload.message);
        }
        state.loading = false;
      })
      .addCase(updateUserAction.rejected, (state, action) => {
        state.loading = false;
        console.error("Failed to update user:", action.payload);
      })

      .addCase(changePasswordAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(changePasswordAction.fulfilled, (state, action) => {
        if (action.payload?.message) {
          console.log(action.payload.message);
        }
        state.loading = false;
      })
      .addCase(changePasswordAction.rejected, (state, action) => {
        state.loading = false;
        console.error("Failed to change password:", action.payload);
      })

      .addCase(updateDistanceTravelledAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateDistanceTravelledAction.fulfilled, (state, action) => {
        if (action.payload?.message) {
          console.log(action.payload.message);
        }
        state.loading = false;
      })
      .addCase(updateDistanceTravelledAction.rejected, (state, action) => {
        state.loading = false;
        console.error("Failed to update distance travelled:", action.payload);
      });
  },
});

const { addAccessToken, clearAccessToken } = authSlice.actions;
export {
  addAccessToken,
  clearAccessToken,
  logOutAction,
  updateUserAction,
  getUserAction,
  changePasswordAction,
  updateDistanceTravelledAction,
};
export default authSlice.reducer;
