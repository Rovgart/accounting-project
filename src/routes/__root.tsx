import { Outlet } from "react-router";
import ModalManager from "../components/organisms/ModalManager";

export default function rootRoute() {
  return (
    <div className="min-h-screen">
      <ModalManager />

      <Outlet></Outlet>
    </div>
  );
}
