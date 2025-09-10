type InvoiceDetailsItemsT = {
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
};

type InvoiceDetailsItemsPropsT = {
  invoiceItemsDetails: InvoiceDetailsItemsT[];
};

function InvoiceDetailsItems({
  invoiceItemsDetails,
}: InvoiceDetailsItemsPropsT) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md mt-4">
      <table className="min-w-full border border-gray-200 divide-y divide-gray-200 text-sm text-left">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-6 py-3 font-semibold">Opis</th>
            <th className="px-6 py-3 font-semibold text-right">Ilość</th>
            <th className="px-6 py-3 font-semibold text-right">
              Stawka podatku (%)
            </th>
            <th className="px-6 py-3 font-semibold text-right">
              Cena jednostkowa (zł)
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {invoiceItemsDetails.map((item, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <td className="px-6 py-4">{item.description}</td>
              <td className="px-6 py-4 text-right">{item.quantity}</td>
              <td className="px-6 py-4 text-right">{item.taxRate}%</td>
              <td className="px-6 py-4 text-right font-semibold">
                {item.unitPrice.toFixed(2)} zł
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InvoiceDetailsItems;
