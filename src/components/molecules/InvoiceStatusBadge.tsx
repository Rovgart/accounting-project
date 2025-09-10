import { translateInvoiceStatus } from "../../utils";

export default function InvoiceStatusBadge({
  status,
}: {
  status: "paid" | "overdue" | "unpaid";
}) {
  const baseClass =
    "rounded-md flex flex-col items-center justify-center px-1 py-2 text-white w-1/2";
  const renderStatus = (status: "paid" | "overdue" | "unpaid") => {
    switch (status.toLowerCase()) {
      case "paid":
        return " bg-[var(--color-success)] ";
      case "unpaid":
        return " bg-[var(--color-error)] ";
      case "overdue":
        return " bg-[var(--color-dark-accent)]";
    }
  };
  const badgeClasses = [baseClass, renderStatus(status)].join("");
  return <div className={badgeClasses}>{translateInvoiceStatus(status)}</div>;
}
