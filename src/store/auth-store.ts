import { create } from "zustand";
import { httpClientSingleton } from "../api/api";
import type { LoginDataT, LoginResponseT, RegisterDataT } from "../types/types";
import { AxiosError } from "axios";

type useAuthStoreT = {
  isAuthenticated: boolean;
  fullName: string | null;
  access_token: string | null;
  refresh_token: string | null;
  setIsAuthenticated: () => void;
  login: (data: LoginDataT) => Promise<LoginDataT>;
  signUp: (data: RegisterDataT) => Promise<LoginDataT>;
};
export const useAuthStore = create<useAuthStoreT>((set) => ({
  isAuthenticated: false,
  fullName: null,
  access_token: null,
  refresh_token: null,
  setIsAuthenticated: () => set(() => ({ isAuthenticated: true })),
  signUp: async (data: RegisterDataT): Promise<LoginResponseT> => {
    try {
      const tokens = await httpClientSingleton.register(data);
      return tokens;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.message);
      } else {
        throw new Error("Unexpected error occurred");
      }
    }
  },
  login: async (data: LoginDataT) => {
    try {
      const response = await httpClientSingleton.login(data);
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.message);
      } else {
        throw new Error("Unexpected error occurred");
      }
    }
  },
}));
