import { useNavigate } from "react-router";
import invoiceLogo from "../../assets/invoice-icon.svg";
import InvoiceButtons from "./InvoiceButtons";
import InvoiceStatusBadge from "./InvoiceStatusBadge";

export type InvoiceItemType = {
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number; // e.g. 0.23 for 23%
};
export type InvoiceType = {
  invoiceId: string;
  dateIssued: string; // ISO date string
  dueDate: string;
  customer: {
    name: string;
    vatId: string;
    address: string;
  };
  items: InvoiceItemType[];
  totalNet: number;
  totalVAT: number;
  totalGross: number;
  status: "paid" | "unpaid" | "overdue";
};
// const item: InvoiceItemType = {
//   description: "Usługa księgowa",
//   quantity: 1,
//   unitPrice: 1200.0,
//   taxRate: 0.23
// };

type InvoiceT = {
  invoice: InvoiceType;
};
export default function InvoiceItem({ invoice }: InvoiceT) {
  const navigate = useNavigate();
  const handleRedirect = (invoiceId) => {
    navigate(`/dashboard/invoices/${invoiceId}`);
  };
  const totalNetRounded = Math.round(Math.ceil(invoice.totalNet));
  return (
    <div
      onClick={() => handleRedirect(invoice.invoiceId)}
      className=" shadow-[var(--shadow-xs)] p-7 text-white shadow-black bg-[var(--color-primary-light)] rounded-md hover:bg-[var(--color-primary-dark)] cursor-pointer"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <picture className="size-12 ">
            <img className="size-full object-cover" src={invoiceLogo} alt="" />
          </picture>
          <InvoiceStatusBadge status={invoice.status} />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">{invoice.invoiceId}</span>
          <span className="text-white text-opacity-35 ">
            {invoice.customer.name}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center ">
        <div className="flex flex-col">
          <span className="text-xl">{totalNetRounded} zł</span>
        </div>
        <InvoiceButtons />
      </div>
    </div>
  );
}
