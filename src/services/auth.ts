import axios from "axios";
import { UserInfo } from "../type/auth";

type LogInResponse = { id: number; accessToken: string };

// axios.defaults.withCredentials = true;

export const logIn = async (
  phoneNumber: number,
  password: string
): Promise<LogInResponse> => {
  const resp = await axios.post("/api/auth/login", {
    phoneNumber,
    password,
  });
  return resp.data;
};

export const signUp = async (
  name: string,
  email: string,
  phoneNumber: number,
  password: string
): Promise<LogInResponse> => {
  const resp = await axios.post("/api/auth/signup", {
    phoneNumber,
    password,
  });
  return resp.data;
};

export const refreshToken = async (): Promise<LogInResponse> => {
  const resp = await axios.post("/api/auth/refreshtoken");
  return resp.data;
};

export const getUser = async (token: string): Promise<UserInfo> => {
  const resp = await axios.post("/api/auth/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return resp.data;
};

export const authService = {
  logIn,
  signUp,
  refreshToken,
  getUser,
};
