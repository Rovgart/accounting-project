import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Checkbox } from "../ui/checkbox";
import { Form } from "../ui/form"; // upewnij się, że masz Form jako wrapper
import { Button } from "../ui/button";
import { registerAccountantSchema } from "@/schemas/auth";

function RegisterAccountantForm() {
  const form = useForm({
    resolver: zodResolver(registerAccountantSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      password: "",
      repeatPassword: "",
      privacyPolicy: false,
      accountantBureau: "",
      certificationNumber: "",
      officeAddress: "",
      phoneNumber: "",
    },
  });
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex-col md:flex md:flex-row  justify-center gap-4">
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imię</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nazwisko</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hasło</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="repeatPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Powtórz hasło</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="accountantBureau"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nazwa biura księgowego</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="certificationNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numer certyfikatu</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="officeAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adres biura</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numer telefonu (opcjonalnie)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="privacyPolicy"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Akceptuję politykę prywatności</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-center gap-4">
          <Button size="lg" type="submit">
            Zarejestruj
          </Button>
          <Button size="lg" type="button">
            Logowanie
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default RegisterAccountantForm;
