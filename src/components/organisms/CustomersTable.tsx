import CustomerStatusBadge from "../molecules/CustomerStatusBadge";
import Customer from "./Customer";

type CustomersT = {
  name: string;
  business_name: string;
  date: string;
  sales: string;
  status: "online" | "offline";
  amount: number;
};

function CustomersList({ customers }: { customers: CustomersT[] }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md mt-4">
      <table>
        <tr>
          <th className="px-6 py-3 font-semibold">Nazwa</th>
          <th className="px-6 py-3 font-semibold">Nazwa przedsiębiorstwa</th>
          <th className="px-6 py-3 font-semibold">Data</th>
          <th className="px-6 py-3 font-semibold">Sprzedaże</th>
          <th className="px-6 py-3 font-semibold">Status</th>
          <th className="px-6 py-3 font-semibold">Ilość</th>
        </tr>
        {customers.map((customer, index) => (
          <tr
            key={index}
            className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
          >
            <td className="px-6 py-4">
              <Customer name={customer.name} />
            </td>
            <td className="px-6 py-4 text-right">{customer.business_name}</td>
            <td className="px-6 py-4 text-right">{customer.date}</td>
            <td className="px-6 py-4 text-right">{customer.sales}</td>
            {/* <td className="px-6 py-4 text-right"> */}
            <td>
              <CustomerStatusBadge status={customer.status} />
            </td>
            {/* </td> */}
            <td className="px-6 py-4 text-right font-semibold">
              {customer.amount.toFixed(2)} zł
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default CustomersList;
