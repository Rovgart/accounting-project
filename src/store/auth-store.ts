import { create } from "zustand";
import { httpClientSingleton } from "../api/api";
import type { LoginDataT, LoginResponseT } from "../types/types";
import Cookies from "js-cookie";

import type { AccountantFormDataT, ClientFormDataT } from "@/schemas/auth";
type useAuthStoreT = {
  isAuthenticated: boolean;
  fullName: string | null;
  access_token: string | null;
  refresh_token: string | null;
  setIsAuthenticated: () => void;
  login: (data: LoginDataT) => Promise<LoginResponseT>;
  signUpClient: (data: ClientFormDataT) => Promise<LoginResponseT>;
  signUpAccountant: (data: AccountantFormDataT) => Promise<LoginResponseT>;
};
export const useAuthStore = create<useAuthStoreT>((set) => ({
  isAuthenticated: false,
  fullName: null,
  access_token: null,
  refresh_token: null,
  setIsAuthenticated: () => set(() => ({ isAuthenticated: true })),
  signUpClient: async (data: ClientFormDataT): Promise<LoginResponseT> => {
    const tokens = await httpClientSingleton.registerClient(data);
    return tokens;
  },
  signUpAccountant: async (
    data: AccountantFormDataT,
  ): Promise<LoginResponseT> => {
    const tokens = await httpClientSingleton.registerAccountant(data);
    return tokens;
  },
  login: async (data: LoginDataT): Promise<LoginResponseT> => {
    const response = await httpClientSingleton.login(data);
    Cookies.set("access_token", response.access_token);
    return response;
  },
}));
