import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type ClientFormDataT,
  type AccountantFormDataT,
  registerClientSchema,
} from "../../schemas/auth";
import { useState, type JSX } from "react";
// import { useNavigate } from "react-router";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { Checkbox } from "../ui/checkbox";
import RegisterAccountantForm from "./RegisterAccountantForm";
export default function RegisterForm(): JSX.Element {
  const { signUpAccountant, signUpClient } = useAuthStore();

  const [tab, setTab] = useState<"client" | "accountant">("client");

  const form = useForm<ClientFormDataT | AccountantFormDataT>({
    resolver: zodResolver(registerClientSchema),
    defaultValues: {
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      repeatPassword: "",
      phoneNumber: "",
      accountantBureau: "",
      certificationNumber: "",
      officeAddress: "",
      privacyPolicy: false,
      companyAddress: "",
    },
  });

  const onSubmit = (data: ClientFormDataT | AccountantFormDataT) => {
    console.log(data);
    return tab === "accountant" ? signUpAccountant(data) : signUpClient(data);
  };

  return (
    <div className="min-h-screen">
      <Tabs
        defaultValue="client"
        value={tab}
        onValueChange={(val) => setTab(val as "client" | "accountant")}
        className="flex flex-col items-center justify-center"
      >
        <TabsList>
          <TabsTrigger value="client">Klient</TabsTrigger>
          <TabsTrigger value="accountant">Księgowy</TabsTrigger>
        </TabsList>

        <TabsContent value="client">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex-col md:flex md:flex-row  gap-4 justify-center">
                <div className="flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
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
                </div>

                <div className="flex flex-col gap-4">
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

                  <FormField
                    control={form.control}
                    name="nip"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>NIP</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="companyAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nazwa firmy (opcjonalnie)</FormLabel>
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
        </TabsContent>
        <TabsContent value="accountant">
          <RegisterAccountantForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
