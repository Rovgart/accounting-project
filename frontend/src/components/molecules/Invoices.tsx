import { useInvoicesStore } from "../../store/invoicesStore";
import type { InvoiceType } from "./InvoiceItem";
import InvoiceItem from "./InvoiceItem";

export type InvoicesT = {
  invoices: InvoiceType[];
};
export default function Invoices({ invoices }: InvoicesT) {
  const { usersInvoices, fetchUsersInvoices, setUsersInvoice } =
    useInvoicesStore();
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-4 h-[600px] overflow-scroll">
      {invoices.map((inv) => (
        <InvoiceItem key={inv.invoiceId} invoice={inv} />
      ))}
      {/* {usersInvoices.map((inv)=>(
                <InvoiceItem key={inv.invoiceId} invoice={inv}/>
            ))} */}
    </div>
  );
}
