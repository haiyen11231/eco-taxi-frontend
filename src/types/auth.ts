export type SignUpResponse = { message: string };
export type LogInResponse = {
  id: number;
  access_token: string;
  refresh_token: string;
};
export type LogOutResponse = { message: string };
export type ForgotPasswordResponse = { message: string };
export type UpdateUserResponse = { message: string };
export type GetUserResponse = {
  id: number;
  name: string;
  phone_number: string;
  email: string;
  distance_travelled: number;
};
export type ChangePasswordResponse = { message: string };
export type UpdateDistanceTravelledResponse = {
  message: string;
};
export type RefreshTokenResponse = { access_token: string };

// export type UserInfo = {
//   id: number;
//   name: string;
//   phoneNumber: string;
//   email: string;
//   distanceTravelled: number;
// };
