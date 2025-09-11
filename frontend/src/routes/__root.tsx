import { Outlet } from "react-router";
import ModalManager from "../components/organisms/ModalManager";
import { Toaster } from "sonner";
export default function rootRoute() {
  return (
    <div className="min-h-screen">
      <ModalManager />
      <Toaster position="top-left" />
      <Outlet></Outlet>
    </div>
  );
}
