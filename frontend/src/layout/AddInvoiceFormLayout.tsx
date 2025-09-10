import { type ReactNode } from "react";
import Stepper from "../components/organisms/Stepper";

function AddInvoiceFormLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      {children}
      <Stepper />
    </div>
  );
}

export default AddInvoiceFormLayout;
