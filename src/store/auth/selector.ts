import { useSelector } from "react-redux";
import { AppState } from "..";

export const useAuthLoadingSelector = () =>
  useSelector((state: AppState) => state.auth.loading);

export const useUserSelector = () =>
  useSelector((state: AppState) => state.auth.user);
