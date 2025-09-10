import { create } from "zustand";

type useInvoiceFormStatusStoreT = {
  steps: [];
  currentStep: number;
  setNextStep: () => void;
  setPreviousStep: () => void;
};
export const useInvoiceFormStatusStore = create<useInvoiceFormStatusStoreT>(
  (set) => ({
    steps: [
      { step: 1, data: "" },
      { step: 2, data: "" },
      { step: 3, data: "" },
    ],
    currentStep: 1,
    setNextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
    setPreviousStep: () =>
      set((state) => ({ currentStep: state.currentStep - 1 })),
  }),
);
