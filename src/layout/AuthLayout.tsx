import { Outlet } from "react-router";
import icon from "../assets/register-photo.svg";
export default function AuthLayout() {
  return (
    <div className="min-h-screen grid grid-cols-[40%_60%] items-center  ">
      <div className="px-4 py-6 col-[1/-1] lg:col-[1/2] mx-auto m-0">
        <Outlet />
      </div>
      <picture className="size-[640px] overflow-hidden lg:block hidden  mx-auto">
        <img
          className="size-full overflow-hidden object-cover"
          src={icon}
          alt=""
        />
      </picture>
    </div>
  );
}
