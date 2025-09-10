import { useInvoiceFormStatusStore } from "../../store/createInvoiceStatusStore";
import CreateInvoiceForm from "../molecules/InvoiceInformationForm";
import Modal from "../molecules/Modal";
import Stepper from "./Stepper";
export default function AddInvoiceModal() {
  const { currentStep } = useInvoiceFormStatusStore();
  return (
    <Modal modalSize="lg">
      <div className="  bg-white p-6  rounded-md px-6 py-4">
        {currentStep === 1 ? <CreateInvoiceForm /> : ""}
        {currentStep === 2 ? <CreateInvoiceForm /> : ""}
        {currentStep === 3 ? <CreateInvoiceForm /> : ""}
      </div>
      <Stepper />
    </Modal>
  );
}
