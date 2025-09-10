"use client";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/auth";
import loginIcon from "../../assets/login-form-icon.svg";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../store/auth-store";
import type { LoginDataT } from "../../types/types";
import { Input } from "@/components/ui/input";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export default function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });
  const { login } = useAuthStore();
  const onSubmit = (data: LoginDataT) => {
    console.log(data);
    login(data);
    navigate("/dashboard");
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" max-w-[75%] mx-auto flex flex-col gap-4 px-4 py-6 shadow-md shadow-[var(--color-text)] bg-white rounded-md w-full  "
    >
      <picture className="sm:size-[256px] size-[128px]">
        <source srcSet={loginIcon} />
        <img
          className="size-full object-cover"
          src={loginIcon}
          alt="Login Icon"
        />
      </picture>
      <div className="flex flex-col gap-2">
        <Label>Email</Label>
        <Input
          {...register("email")}
          type="email"
          error={errors.email?.message}
          variants="outlined"
          name="email"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Hasło</Label>
        <Input
          {...register("password")}
          type="password"
          error={errors.password?.message}
          variants="outlined"
          name="password"
        />
      </div>
      <div className="flex gap-4 items-center justify-center">
        <Checkbox id="rememberMe" />
        <Label>Zapamiętaj mnie</Label>
      </div>
      <Button type="submit">Zaloguj </Button>
    </form>
  );
}
