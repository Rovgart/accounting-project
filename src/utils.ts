export const translateInvoiceStatus = (
  status: "paid" | "overdue" | "unpaid",
) => {
  switch (status) {
    case "paid":
      return "Zapłacono";
    case "overdue":
      return "Po terminie";
    case "unpaid":
      return "Nie zapłacono";
  }
};
