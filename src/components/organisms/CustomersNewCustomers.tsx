import { UserRound } from "lucide-react";
import CustomerInfoItemLayout from "../molecules/CustomerInfoItemPanel";
function CustomersNewCustomers({ newCustomers }: { newCustomers: number }) {
  return (
    <CustomerInfoItemLayout>
      <UserRound />
      <span>Nowi kontrahenci</span>
      <span className="text-2xl font-semibold">{newCustomers}</span>
    </CustomerInfoItemLayout>
  );
}

export default CustomersNewCustomers;
