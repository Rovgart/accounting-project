import {
  useError,
  type ErrorDisplayType,
  type ErrorT,
} from "@/store/error-store";
import type { AxiosError } from "axios";

type ErrorMessageTypeT = "silent" | "toast" | "redirect";

class ErrorService {
  notify(error: ErrorT, errorMessageType: ErrorMessageTypeT) {
    const errorStore = useError.getState();

    errorStore.displayError(error, errorMessageType);
  }

  clear() {
    useError.getState().clearError();
  }

  fromAxios(err: AxiosError): ErrorT {
    const status = err.response?.status;

    const mapAxiosToStatus: Record<number, ErrorDisplayType> = {
      401: "redirect",
      403: "toast",
      404: "redirect",
      422: "toast",
      500: "toast",
    };

    const message = err.response?.data?.message || "Wystąpił błąd";
    const code = status?.toString() || "0";

    return {
      errorName: err.name || "AxiosError",
      errorMessage: message,
      errorResponseCode: code,
      displayType: mapAxiosToStatus[status || 404],
      context: err.config?.url || "unknown",
      date: new Date().toISOString(),
    };
  }
}

export const errorService = new ErrorService();
