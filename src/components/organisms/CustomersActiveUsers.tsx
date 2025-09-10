import { UserRound } from "lucide-react";
import CustomerInfoItemLayout from "../molecules/CustomerInfoItemPanel";

function CustomersActiveUsers({ activeUsers }: { activeUsers: number }) {
  return (
    <CustomerInfoItemLayout>
      <UserRound />
      <span>Aktywni użytkownicy</span>
      <span className="font-semibold text-2xl">{activeUsers}</span>
    </CustomerInfoItemLayout>
  );
}

export default CustomersActiveUsers;
