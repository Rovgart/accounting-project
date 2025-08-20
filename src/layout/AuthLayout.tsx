import { Outlet } from "react-router";
import icon from "../assets/register-photo.svg";
export default function AuthLayout() {
  return (
    <div className="min-h-screen grid grid-cols-[40%_60%] items-center  ">
      <div className="px-4 py-6">
        <Outlet />
      </div>
      <picture className="w-3/4 h-screen overflow-hidden  mx-auto">
        <img className="size-full object-cover" src={icon} alt="" />
      </picture>
    </div>
  );
}
