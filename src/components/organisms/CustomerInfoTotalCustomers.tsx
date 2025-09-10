import { UserRound } from "lucide-react";
import CustomerInfoItemLayout from "../molecules/CustomerInfoItemPanel";
type CustomInfoTotalCustomersPropsT = {
  totalCustomers: number;
};

function CustomerInfoTotalCustomers({
  totalCustomers,
}: CustomInfoTotalCustomersPropsT) {
  return (
    <CustomerInfoItemLayout>
      <UserRound />
      <span>Wszyscy kontrahenci</span>
      <span className="text-2xl font-semibold">{totalCustomers}</span>
    </CustomerInfoItemLayout>
  );
}

export default CustomerInfoTotalCustomers;
