import { useForm } from "react-hook-form";
import { useInvoiceFormStatusStore } from "../../store/createInvoiceStatusStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { addInvoiceSchema } from "../../schemas/auth";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
export default function CreateInvoiceForm() {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(addInvoiceSchema),
    defaultValues: {
      invoiceNumber: "",
      createdDate: "",
      sellingDate: "",
      sellingPlace: "",
    },
  });
  const { setNextStep } = useInvoiceFormStatusStore();
  const onSubmit = (data) => {
    setNextStep();
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 flex flex-col gap-4">
      <Input
        {...register("invoiceNumber")}
        label="Numer faktury"
        type="text"
        variants="outlined"
      />
      <Input
        {...register("createdDate")}
        label="Data wystawienia"
        type="text"
        variants="outlined"
      />
      <Input
        {...register("sellingDate")}
        label="Data sprzedaży"
        type="text"
        variants="outlined"
      />
      <Input
        {...register("sellingPlace")}
        label="Miejsce wystawienia"
        type="text"
        variants="outlined"
      />
      <Button className="w-1/2" text="Dalej" type="submit" variant="outlined" />
    </form>
  );
}
