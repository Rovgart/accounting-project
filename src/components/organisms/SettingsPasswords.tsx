import { useForm } from "react-hook-form";
import Input from "../atoms/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "../../schemas/auth";
function SettingsPasswords() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
  });
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col">
        <h1 className="font-semibold">Password</h1>
        <span className="text-sm">Modify your current password</span>
      </div>
      <div className="flex justify-between">
        <form onSubmit={handleSubmit(onSubmit)} action="">
          <Input
            {...register("changePassword")}
            type="password"
            label="Current password"
            variants="outlined"
            error={errors.changePassword && errors.changePassword.message}
          />
          <Input
            {...register("repeatChangePassword")}
            type="repeatChangePassword"
            label="New password"
            variants="outlined"
            error={
              errors.repeatChangePassword && errors.repeatChangePassword.message
            }
          />
        </form>
      </div>
    </div>
  );
}

export default SettingsPasswords;
