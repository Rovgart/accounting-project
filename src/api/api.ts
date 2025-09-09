import axios from "axios";
import Cookies from "js-cookie";
import type { LoginDataT, LoginResponseT, RegisterDataT } from "../types/types";
export class HTTPClient {
  private httpClient;
  constructor() {
    this.httpClient = axios.create({
      baseURL: "http://localhost:8000/api",
    });

    this.httpClient.interceptors.request.use((req) => {
      const token = Cookies.get("access-token");
      if (token) {
        req.headers.Authorization = `Bearer ${token}`;
      }
      return req;
    });
    this.httpClient.interceptors.response.use((res) => {
      console.log(res);
      return res;
    });
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
  async register(data: RegisterDataT): Promise<LoginResponseT> {
    const response = await this.httpClient.post("/auth/register", {
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
