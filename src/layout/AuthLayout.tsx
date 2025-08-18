import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="bg-[var(--color-theme)]  min-h-screen min-w-screen ">
      <div className=" max-w-[50%]  m-auto ">
        <Outlet />
      </div>
    </div>
  );
}
