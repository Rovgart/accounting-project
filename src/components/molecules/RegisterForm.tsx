import { useForm } from "react-hook-form";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../schemas/auth";
import type { JSX } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../store/auth-store";
import type { RegisterDataT } from "../../types/types";

export default function RegisterForm(): JSX.Element {
  const navigate = useNavigate();
  const { signUp } = useAuthStore();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      repeatPassword: "",
      nip: "",
      companyAddress: "",
      privacyPolicy: false,
    },
  });
  const onSubmit = (data: RegisterDataT) => {
    console.log(data);
    signUp(data);
    navigate("/dashboard");
  };
  return (
    <form
      className="bg-white px-4 py-6 flex flex-col gap-4 rounded-md w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
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
        {...register("password")}
        label="Hasło"
        type="password"
        name="password"
        error={errors.password && errors.password.message}
      />
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
      <Input
        variants="outlined"
        label="Adres firmy (opcjonalnie)"
        {...register("companyAddress")}
        name="companyAddress"
        type="text"
        error={errors.companyAddress && errors.companyAddress.message}
      />
      <div className="flex items-center justify-center  gap-2">
        <Input
          type="checkbox"
          variants="outlined"
          {...register("privacyPolicy")}
          name="privacyPolicy"
          error={errors.privacyPolicy && errors.privacyPolicy.message}
        />
        <span>Polityka prywatności </span>
      </div>
      <Button variant="primary" text="Załóż konto"></Button>
    </form>
  );
}
