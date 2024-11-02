import axios from "axios";
import {
  ChangePasswordResponse,
  ForgotPasswordResponse,
  GetUserResponse,
  LogInResponse,
  LogOutResponse,
  RefreshTokenResponse,
  SignUpResponse,
  UpdateDistanceTravelledResponse,
  UpdateUserResponse,
} from "../types/auth";

axios.defaults.withCredentials = true;

// Function to set up Axios interceptors
// const setupAxiosInterceptors = () => {
//   axios.interceptors.request.use(
//     (config) => {
//       const state = store.getState();
//       const accessToken = state.auth.accessToken;

//       if (accessToken) {
//         config.headers.Authorization = `Bearer ${accessToken}`;
//       }

//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

//   axios.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       const originalRequest = error.config;

//       // Handle 401 Unauthorized error by refreshing token
//       if (
//         error.response &&
//         error.response.status === 401 &&
//         !originalRequest._retry
//       ) {
//         originalRequest._retry = true;

//         // Refresh the token
//         const { access_token } = await authService.refreshToken();
//         store.dispatch(addAccessToken(access_token));

//         // Set the new access token in headers and retry the request
//         originalRequest.headers.Authorization = `Bearer ${access_token}`;
//         return axios(originalRequest);
//       }

//       return Promise.reject(error);
//     }
//   );
// };

// // Initialize interceptors on app startup
// setupAxiosInterceptors();

axios.defaults.withCredentials = true;

export const signUp = async (
  name: string,
  phoneNumber: string,
  email: string,
  password: string
): Promise<SignUpResponse> => {
  const resp = await axios.post("/v1/user/signup", {
    name,
    phone_number: phoneNumber,
    email,
    password,
  });

  return resp.data;
};

export const logIn = async (
  phoneNumber: string,
  password: string
): Promise<LogInResponse> => {
  const resp = await axios.post("/v1/user/login", {
    phone_number: phoneNumber,
    password,
  });
  return resp.data;
};

export const logOut = async (token: string): Promise<LogOutResponse> => {
  const resp = await axios.delete("/v1/user/logout", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return resp.data;
};

// export const logOut = async (): Promise<LogOutResponse> => {
//   const resp = await axios.delete("/v1/user/logout");
//   return resp.data;
// };

export const forgotPassword = async (
  email: string,
  newPassword: string
): Promise<ForgotPasswordResponse> => {
  const resp = await axios.patch("/v1/user/reset-password", {
    email: email,
    new_password: newPassword,
  });
  return resp.data;
};

export const updateUser = async (
  token: string,
  name: string,
  phoneNumber: string,
  email: string
): Promise<UpdateUserResponse> => {
  const resp = await axios.patch(
    "/v1/user/update",
    {
      name,
      phone_number: phoneNumber,
      email,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return resp.data;
};

// export const updateUser = async (
//   token: string,
//   name: string,
//   phoneNumber: string,
//   email: string
// ): Promise<UpdateUserResponse> => {
//   const resp = await axios.patch(
//     "/v1/user/update",
//     {
//       name,
//       phone_number: phoneNumber,
//       email,
//     }
//   );
//   return resp.data;
// };

export const getUser = async (token: string): Promise<GetUserResponse> => {
  const resp = await axios.get("/v1/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return resp.data;
};
// export const getUser = async (): Promise<GetUserResponse> => {
//   const resp = await axios.get("/v1/user");
//   return resp.data;
// };

export const changePassword = async (
  token: string,
  oldPassword: string,
  newPassword: string
): Promise<ChangePasswordResponse> => {
  const resp = await axios.patch(
    "/v1/user/change-password",
    {
      old_password: oldPassword,
      new_password: newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return resp.data;
};

// export const changePassword = async (
//   oldPassword: string,
//   newPassword: string
// ): Promise<ChangePasswordResponse> => {
//   const resp = await axios.patch(
//     "/v1/user/change-password",
//     {
//       old_password: oldPassword,
//       new_password: newPassword,
//     }
//   );
//   return resp.data;
// };

export const updateDistanceTravelled = async (
  token: string,
  distance: number
): Promise<UpdateDistanceTravelledResponse> => {
  const resp = await axios.patch(
    "/v1/user/update-distance",
    {
      distance,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return resp.data;
};

// export const updateDistanceTravelled = async (
//   token: string,
//   distance: number
// ): Promise<UpdateDistanceTravelledResponse> => {
//   const resp = await axios.patch(
//     "/v1/user/update-distance",
//     {
//       distance,
//     }
//   );
//   return resp.data;
// };

export const refreshToken = async (): Promise<RefreshTokenResponse> => {
  const resp = await axios.post("/v1/user/refresh-token");
  return resp.data;
};

export const authService = {
  signUp,
  logIn,
  logOut,
  forgotPassword,
  updateUser,
  getUser,
  changePassword,
  updateDistanceTravelled,
  refreshToken,
};
