import Button from "../../components/atoms/Button";
import CustomersInfoPanel from "../../components/organisms/CustomersInfoPanel";
import CustomersList from "../../components/organisms/CustomersTable";
import customers from "../../mocks/customers.json";
function CustomersPage() {
  return (
    <div className="flex flex-col gap-4  p-6 ">
      <div className="flex justify-between ">
        <span className="font-semibold text-2xl">Kontrahenci</span>
        <div className="flex gap-4 items-center">
          <Button text="Dodaj klienta" variant="primary"></Button>
          <Button text="Eksportuj" variant="outlined"></Button>
        </div>
      </div>
      <CustomersInfoPanel />
      <CustomersList customers={customers} />
    </div>
  );
}

export default CustomersPage;
