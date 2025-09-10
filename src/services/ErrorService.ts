import {
  useError,
  type ErrorDisplayType,
  type ErrorT,
} from "@/store/error-store";
import type { AxiosError } from "axios";

class ErrorService {
  notify(error: ErrorT) {
    useError.getState().setError(error);
  }
  clear() {
    useError.getState().clearError();
  }
  fromAxios(err: AxiosError) {
    const status = err.response?.status;

    const mapAxiosToStatus: Record<number, ErrorDisplayType> = {
      401: "redirect",
      403: "toast",
      404: "redirect",
      500: "toast",
    };
    return {
      message: err.response?.data?.message || "Wystąpił błąd",
      statusCode: status,
      displayType: mapAxiosToStatus[status || 404],
    };
  }
}
export const errorService = new ErrorService();
