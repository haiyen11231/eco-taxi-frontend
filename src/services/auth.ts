import axios from "axios";
import { UserInfo } from "../types/auth";

type SignUpResponse = { message: string };
type LogInResponse = { id: number; accessToken: string; refreshToken: string };
type RefreshTokenResponse = { accessToken: string };

// axios.defaults.withCredentials = true;

export const signUp = async (
  name: string,
  email: string,
  phoneNumber: string,
  password: string
): Promise<SignUpResponse> => {
  const resp = await axios.post("/v1/user/signup", {
    name: name,
    email: email,
    phone_number: phoneNumber,
    password: password,
  });
  return resp.data;
};

export const logIn = async (
  phoneNumber: string,
  password: string
): Promise<LogInResponse> => {
  const resp = await axios.post("/v1/user/login", {
    phone_number: phoneNumber,
    password: password,
  });
  return resp.data;
};

// export const logOut = (token: string): Promise<UserInfo> => {
//   const resp = await axios.get("/v1/user", {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return resp.data;
// };

// export const forgotPassword = (token: string): Promise<UserInfo> => {
//   const resp = await axios.get("/v1/user", {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return resp.data;
// };

// export const forgotPassword = (token: string): Promise<UserInfo> => {
//   const resp = await axios.get("/v1/user", {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return resp.data;
// };

// export const updateUser = (token: string): Promise<UserInfo> => {
//   const resp = await axios.get("/v1/user", {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return resp.data;
// };

export const getUser = async (token: string): Promise<UserInfo> => {
  const resp = await axios.get("/v1/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return resp.data;
};

// export const changePassword = async (token: string): Promise<UserInfo> => {
//   const resp = await axios.get("/v1/user", {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return resp.data;
// };

// export const updateDistanceTravelled = async (token: string): Promise<UserInfo> => {
//   const resp = await axios.get("/v1/user", {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return resp.data;
// };

export const refreshToken = async (): Promise<RefreshTokenResponse> => {
  const resp = await axios.post("/v1/user/refresh-token");
  return resp.data;
};

export const authService = {
  logIn,
  signUp,
  refreshToken,
  getUser,
};
