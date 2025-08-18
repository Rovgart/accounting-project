import { useModalStore } from "../../store/modalStore";
import AddInvoiceModal from "./AddInvoiceModal";

export default function ModalManager() {
  const { modalType } = useModalStore();
  return <>{modalType === "add-invoice-modal" ? <AddInvoiceModal /> : ""}</>;
}
