import { ShoppingCart } from "lucide-react";
import CustomerInfoItemLayout from "../molecules/CustomerInfoItemPanel";
function CustomersTotalOrders({ totalOrders }: { totalOrders: number }) {
  return (
    <CustomerInfoItemLayout>
      <ShoppingCart />
      <span>Wszystkie zamówienia</span>
      <span className="text-2xl font-semibold">{totalOrders}</span>
    </CustomerInfoItemLayout>
  );
}

export default CustomersTotalOrders;
