import { useForm } from "react-hook-form";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  accountantSchema,
  type ClientFormDataT,
  type AccountantFormDataT,
  clientSchema,
} from "../../schemas/auth";
import { type FormEvent, type JSX } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useAuthStore } from "../../store/auth-store";
import type { RegisterDataT } from "../../types/types";

export default function RegisterForm(): JSX.Element {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const isAccountant = searchParams.get("role") === "accountant";
  const schema = isAccountant ? accountantSchema : clientSchema;
  const { signUp } = useAuthStore();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ClientFormDataT | AccountantFormDataT>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      repeatPassword: "",
      privacyPolicy: false,
      nip: "",
    },
  });
  const onSubmit = (data: RegisterDataT) => {
    console.log(data);
    signUp(data);
    navigate("/dashboard");
  };
  const handleRedirect = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form
      className="bg-white px-4 py-4.5 flex flex-col gap-4 rounded-md w-full shadow-sm shadow-black"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex gap-2 items-center">
        <Input
          variants="outlined"
          {...register("email")}
          label="E-mail"
          type="email"
          name="email"
          error={errors.email && errors.email.message}
        />
        <Input
          variants="outlined"
          {...register("firstname")}
          label="Imię"
          name="firstname"
          error={errors.firstname && errors.firstname.message}
        />
      </div>
      <div className="flex gap-2 items-center">
        <Input
          variants="outlined"
          {...register("lastname")}
          label="Nazwisko"
          name="lastname"
          error={errors.lastname && errors.lastname.message}
        />
        <Input
          variants="outlined"
          {...register("password")}
          label="Hasło"
          type="password"
          name="password"
          error={errors.password && errors.password.message}
        />
      </div>
      <div className="flex gap-2 items-center">
        <Input
          variants="outlined"
          {...register("repeatPassword")}
          label="Powtórz hasło"
          type="password"
          name="repeatPassword"
          error={errors.repeatPassword && errors.repeatPassword.message}
        />
        <Input
          variants="outlined"
          {...register("nip")}
          label="NIP"
          name="nip"
          type="number"
          error={errors.nip && errors.nip.message}
        />
      </div>
      <Input
        variants="outlined"
        label="Adres firmy (opcjonalnie)"
        {...register("companyAddress")}
        name="companyAddress"
        type="text"
        error={errors.companyAddress && errors.companyAddress.message}
      />
      {isAccountant ? (
        <div className="flex flex-col gap-2 ">
          <div className="flex items-center gap-2">
            <Input
              variants="outlined"
              type="text"
              {...register("accountantBureau")}
              name="accountantBureau"
              label="Nazwa biura rachunkowego"
              error={errors.accountantBureau && errors.accountantBureau.message}
            />
            <Input
              variants="outlined"
              type="text"
              {...register("certificationNumber")}
              name="certificationNumber"
              label="Numer uprawnień / certyfikatu"
              error={
                errors.certificationNumber && errors.certificationNumber.message
              }
            />
          </div>
          <div className="flex items-center gap-2">
            <Input
              variants="outlined"
              {...register("officeAddress")}
              name="officeAddress"
              type="text"
              label="Adres biura"
              error={errors.officeAddress && errors.officeAddress.message}
            />
            <Input
              variants="outlined"
              {...register("phoneNumber")}
              name="phoneNumber"
              type="text"
              label="Numer telefonu"
              error={errors.phoneNumber && errors.phoneNumber.message}
            />
          </div>
          <Input
            variants="outlined"
            {...register("companiesServed")}
            name="companiesServed"
            type="text"
            label="Typ obsługiwanych firm"
          />
        </div>
      ) : (
        ""
      )}
      <div className="flex items-center justify-center gap-2 ">
        <Input
          type="checkbox"
          variants="outlined"
          {...register("privacyPolicy")}
          name="privacyPolicy"
          error={errors.privacyPolicy && errors.privacyPolicy.message}
        />
        <span className="text-xs">
          Akceptuję warunki oraz politykę prywatności
        </span>
      </div>
      <div className="flex justify-between items-center">
        <Button variant="primary" text="Załóż konto"></Button>
        <Button
          type="button"
          onClick={() =>
            setSearchParams((prev) => {
              const currentRole = prev.get("role");
              return currentRole ? {} : { role: "accountant" };
            })
          }
          variant="outlined"
          text={`${isAccountant ? "Rejestruje się jako klient" : "Rejestruję się jako księgowy/a"}`}
        ></Button>
      </div>
    </form>
  );
}
