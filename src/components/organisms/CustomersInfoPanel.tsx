import CustomerInfoTotalCustomers from "./CustomerInfoTotalCustomers";
import CustomersActiveUsers from "./CustomersActiveUsers";
import CustomersNewCustomers from "./CustomersNewCustomers";
import CustomersTotalOrders from "./CustomersTotalOrders";

function CustomersInfoPanel() {
  return (
    <div className="flex justify-center gap-4">
      <CustomerInfoTotalCustomers totalCustomers={48} />
      <CustomersNewCustomers newCustomers={2200} />
      <CustomersActiveUsers activeUsers={4000} />
      <CustomersTotalOrders totalOrders={3500} />
    </div>
  );
}

export default CustomersInfoPanel;
