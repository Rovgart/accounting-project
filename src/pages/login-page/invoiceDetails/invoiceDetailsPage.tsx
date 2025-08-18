// import { useEffect } from "react";
// import { useParams } from "react-router";
import InvoiceDetailsLayout from "../../../layout/InvoiceDetailsLayout";
import InvoiceDetailsItems from "../../../components/organisms/InvoiceDetailsItems";
import invoices from "../../../mocks/mocks.json";
export default function InvoiceDetailsPage() {
  // const invoiceId = useParams();
  // useEffect(()=>{

  // })
  return (
    <InvoiceDetailsLayout>
      <div className="col-[2/3] flex flex-col gap-4">
        <div className="flex justify-between ">
          <div className="flex flex-col">
            <h1 className="font-semibold">Invoice</h1>
            <div className="font-light class flex flex-col">
              <span>Your company name</span>
              <span>Address</span>
              <span>City, State 12345</span>
              <span>contact@company.com</span>
              <span>555 123-4567</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-light">Invoice Number</span>
            <span className="font-light">Issue Date</span>
            <span className="font-light">Due Date</span>
          </div>
        </div>
        <hr />
        <div className="flex justify-between">
          <div className="flex flex-col">
            <span>Bill to:</span>
            <span>Client Company Ltd.</span>
            <span>Client City, State 67890</span>
            <span>client@email.com</span>
          </div>
          <div className="flex flex-col">
            <span>Payment Details</span>
            <span>Payments Terms: Net 30</span>
            <span>Payment Method: Bank Transfer</span>
            <span>Account: ****1234</span>
          </div>
        </div>
        <div>
          <InvoiceDetailsItems invoiceItemsDetails={invoices[0].items} />
        </div>
        <div className="flex justify-end ">
          <div className="flex flex-col shadow-black shadow-md p-4 gap-2 rounded-md">
            <div className="flex justify-between gap-4">
              <span>Subtotal</span>
              <span>3000 zł</span>
            </div>
            <hr />
            <div className="flex justify-between gap-4">
              <span>Tax (8.5%)</span>
              <span>225 zł</span>
            </div>
            <hr />
            <div className="flex items-center justify-center">
              <span>Total: 3225 zł </span>
            </div>
            <hr />
          </div>
        </div>
        <div className="flex flex-col gap-4  p-4 shadow-md shadow-black rounded-md">
          <h1 className="font-semibold">Notes</h1>
          <span>
            Thank you for your business! Payment is due within 30 days of the
            invoice date. Please include the invoice number with your payment.
          </span>
        </div>
        <hr />
      </div>
    </InvoiceDetailsLayout>
  );
}
