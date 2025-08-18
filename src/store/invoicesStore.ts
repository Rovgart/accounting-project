import { create } from "zustand";
import type { InvoiceType } from "../components/molecules/InvoiceItem";
import { httpClientSingleton } from "../api/api";

type useInvoicesStoreT = {
  usersInvoices: InvoiceType[];
  setUsersInvoice: (fetchedInvoices: InvoiceType[]) => void;
  fetchUsersInvoices: () => Promise<InvoiceType[]>;
};
export const useInvoicesStore = create<useInvoicesStoreT>((set) => ({
  usersInvoices: [],
  setUsersInvoice: (fetchedInvoices) =>
    set(() => ({ usersInvoices: fetchedInvoices })),
  fetchUsersInvoices: httpClientSingleton.getInvoices,
}));
