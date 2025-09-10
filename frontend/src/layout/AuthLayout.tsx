import { Outlet } from "react-router";
import { useState } from "react";
export default function AuthLayout() {
  useState();
  return (
    <>
      <div className="    ">
        <div className="px-4 rounded-sm border shadow-md py-6 col-[1/-1] lg:col-[1/2] mx-auto m-0">
          <Outlet />
        </div>
      </div>
    </>
  );
}
