import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type ClientFormDataT,
  type AccountantFormDataT,
  accountantSchema,
  clientSchema,
} from "../../schemas/auth";
import { useState, type JSX } from "react";
import { useSearchParams } from "react-router";
import { useAuthStore } from "../../store/auth-store";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Checkbox } from "../ui/checkbox";
export default function RegisterForm(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const isAccountant = searchParams.get("role") === "accountant";
  const schema = isAccountant ? accountantSchema : clientSchema;
  const { signUp } = useAuthStore();
  const form = useForm<ClientFormDataT | AccountantFormDataT>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      repeatPassword: "",
      privacyPolicy: false,
      nip: "",
    },
  });
  const onSubmit = (data: ClientFormDataT | AccountantFormDataT) => {
    console.log(data);
    signUp(data);
  };
  const searchParamsHandler = () => {
    return searchParams.get("role") === "accountant"
      ? setSearchParams()
      : setSearchParams({ role: "accountant" });
  };
  // const handleRedirect = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  // };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          render={() => (
            <FormItem>
              <FormLabel>Hasło</FormLabel>
              <FormControl>
                <Input type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="repeatPassword"
          render={() => (
            <FormItem>
              <FormLabel>Powtórz hasło</FormLabel>
              <FormControl>
                <Input type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isAccountant && (
          <>
            <FormItem>
              <FormLabel>Biuro księgowe</FormLabel>
              <FormControl>
                <Input />
              </FormControl>
              <FormMessage />
            </FormItem>
            <FormItem>
              <FormLabel>Numer certyfikatu</FormLabel>
              <FormControl>
                <Input type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Wpisz adres biura</FormLabel>
              <FormControl>
                <Input />
              </FormControl>
              <FormMessage />
            </FormItem>
          </>
        )}
        <FormField
          control={form.control}
          name="phoneNumber"
          render={() => (
            <FormItem>
              <FormLabel>Numer telefonu (opcjonalnie)</FormLabel>
              <FormControl>
                <Input />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem className="flex  mx-auto gap-4 items-center justify-center">
          <FormControl>
            <Checkbox
              checked={isChecked}
              onCheckedChange={() => {
                setIsChecked((prevState) => !prevState);
              }}
            />
          </FormControl>
          <FormLabel>Akceptuję politykę prywatności</FormLabel>
          <FormMessage />
        </FormItem>
        <div className="flex justify-between items-center gap-4">
          <Button type="submit">Wyślij</Button>
          <Button
            type="button"
            onClick={searchParamsHandler}
            variant={"secondary"}
          >
            Rejestruje się jako {isAccountant ? "klient" : "księgowy"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
