"use client";
import { useForm } from "react-hook-form";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/auth";
import loginIcon from "../../assets/login-form-icon.svg";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../store/auth-store";
import type { LoginDataT } from "../../types/types";

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
      className=" max-w-[75%] mx-auto px-4 py-6 shadow-md shadow-[var(--color-text)] bg-white rounded-md w-full  "
    >
      <picture className="sm:size-[256px] size-[128px]">
        <source srcSet={loginIcon} />
        <img
          className="size-full object-cover"
          src={loginIcon}
          alt="Login Icon"
        />
      </picture>
      <Input
        {...register("email")}
        label="Email"
        type="email"
        error={errors.email?.message}
        variants="outlined"
        name="email"
      />
      <Input
        {...register("password")}
        label="Hasło"
        type="password"
        error={errors.password?.message}
        variants="outlined"
        name="password"
      />
      <div className="flex gap-4 items-center justify-center">
        <Input {...register("rememberMe")} type="checkbox" name="rememberMe" />
        <span>Zapamiętaj mnie</span>
      </div>
      <Button type="submit" variant="primary" text="Zaloguj" />
    </form>
  );
}
