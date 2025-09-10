import { toast } from "sonner";
import { create } from "zustand";
export type ErrorT = {
  errorName: string;
  errorMessage: string;
  errorResponseCode?: string;
  displayType: ErrorDisplayType;
  context: string;
  date: string;
};
export type ErrorDisplayType = "toast" | "silent" | "redirect";
interface ErrorStoreI {
  setError: (error: string) => void;
  error: ErrorT | null;
  displayError: (error: ErrorT, type: ErrorDisplayType) => void;
  clearError: () => void;
}
export const useError = create<ErrorStoreI>((set) => ({
  displayError: (error: ErrorT, type: ErrorDisplayType) => {
    switch (type) {
      case "toast":
        toast(`${error.errorResponseCode}: ${error.errorMessage}`);
        break;
      case "silent":
        console.log(`${error.errorResponseCode}:${error.errorMessage}`);
        break;
      default:
        break;
    }
  },
  error: null,
  setError: (err: string) => set(() => ({ error: err })),
  clearError: () => set(() => ({ error: null })),
}));
