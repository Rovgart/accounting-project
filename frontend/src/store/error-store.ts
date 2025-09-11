import { toast } from "sonner";
import { create } from "zustand";

export type ErrorDisplayType = "toast" | "silent" | "redirect";

export type ErrorT = {
  errorName: string;
  errorMessage: string;
  errorResponseCode?: string;
  displayType: ErrorDisplayType;
  context: string;
  date: string;
};

interface ErrorStoreI {
  error: ErrorT | null;
  setError: (error: ErrorT) => void;
  displayError: (error: ErrorT, type: ErrorDisplayType) => void;
  clearError: () => void;
}

export const useError = create<ErrorStoreI>((set) => ({
  error: null,

  setError: (error: ErrorT) => set({ error }),

  displayError: (error: ErrorT, type: ErrorDisplayType) => {
    set({ error });

    switch (type) {
      case "toast":
        toast.error(
          `${error.errorResponseCode || "ERR"}: ${error.errorMessage}`,
        );
        break;
      case "silent":
        console.log(
          `${error.errorResponseCode || "ERR"}: ${error.errorMessage}`,
        );
        break;
      case "redirect":
        window.location.href = "/404";
        break;
      default:
        break;
    }
  },

  clearError: () => set({ error: null }),
}));
