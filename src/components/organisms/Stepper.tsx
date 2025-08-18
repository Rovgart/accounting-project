import { useInvoiceFormStatusStore } from "../../store/createInvoiceStatusStore";
import Dot from "../molecules/Dot";

export default function Stepper() {
  const { steps } = useInvoiceFormStatusStore();
  return (
    <div className="flex items-center px-2 py-4 justify-center gap-4">
      {steps.map((_, index) => (
        <Dot key={index} />
      ))}
    </div>
  );
}
