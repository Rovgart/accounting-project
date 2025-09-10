import axios from "axios";
import Cookies from "js-cookie";
import type { LoginDataT, LoginResponseT } from "../types/types";
import type { AccountantFormDataT, ClientFormDataT } from "@/schemas/auth";
import { errorService } from "@/services/ErrorService";
export class HTTPClient {
  private httpClient;
  constructor() {
    this.httpClient = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
    });

    this.httpClient.interceptors.request.use((req) => {
      const token = Cookies.get("access-token");
      if (token) {
        req.headers.Authorization = `Bearer ${token}`;
      }
      return req;
    });
    this.httpClient.interceptors.response.use(
      (res) => {
        console.log(res);
        return res;
      },
      (error) => {
        if (error?.response?.status === 401) {
          // Logic for not-authenticated users probably some redirecting
        }
        const appError = errorService.fromAxios(error);
        errorService.notify(appError);
        return Promise.reject(error);
      },
    );
  }

  async getInvoices() {
    const response = await axios.get(`${this.httpClient}/invoices/`);
    return response.data;
  }
  async login(data: LoginDataT): Promise<LoginResponseT> {
    const response = await this.httpClient.post("/auth/login", {
      ...data,
    });
    return response.data;
  }
  async registerClient(
    data: ClientFormDataT | AccountantFormDataT,
  ): Promise<LoginResponseT> {
    const response = await this.httpClient.post("/auth/register-client", {
      ...data,
    });
    return response.data;
  }
  async registerAccountant(data: AccountantFormDataT): Promise<LoginResponseT> {
    const response = await this.httpClient.post("/auth/register-accountant", {
      ...data,
    });
    return response.data;
  }
  async getInvoice(invoiceId: string) {
    const response = await this.httpClient.get(`/invoices/${invoiceId}`);
    return response.data;
  }
  async exportInvoiceToPdf(invoiceId: string) {
    const response = await this.httpClient.get(
      `/invoices/export/${invoiceId}/pdf`,
    );
    return response.data;
  }
  async exportInvoiceToCsv(invoiceId: string) {
    const response = await this.httpClient.get(
      `/invoices/export/${invoiceId}/csv`,
    );
    return response.data;
  }
  get instance() {
    return this.httpClient;
  }
}
export const httpClientSingleton = new HTTPClient();
