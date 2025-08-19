import { SlidersHorizontal } from "lucide-react";
import Button from "../components/atoms/Button";
import Invoices from "../components/molecules/Invoices";
import { useModalStore } from "../store/modalStore";
import invoicesMocks from "../mocks/mocks.json";

function DashboardHome() {
  const { openModal, modalType } = useModalStore();

  const invoiceModalHandler = () => {
    console.log("Clicked");
    console.log(modalType);
    openModal("add-invoice-modal");
  };
  return (
    <div className="col-[1/-1] p-6 md:col-2    ">
      <div className="flex items-center justify-between px-2 py-4">
        <span className="text-3xl text-black font-semibold">
          Bieżące faktury
        </span>
        <div className="flex items-center justify-center gap-4">
          <SlidersHorizontal />
          <Button
            type="button"
            onClick={invoiceModalHandler}
            text="Dodaj fakturę"
            variant="outlined"
          />
        </div>
      </div>
      <Invoices invoices={invoicesMocks} />
    </div>
  );
}

export default DashboardHome;
