import { Outlet } from "react-router";
import MenuItem from "../components/atoms/MenuItem";
import Layout from "../layout/layout";
import DashboardUserPanel from "../layout/DashboardUserPanel";
export default function Dashboard() {
  return (
    <Layout>
      <article className="grid grid-cols-[20%_80%] gap-6 text-black h-full w-full  ">
        <div className="hidden sm:flex  px-4 py-6 flex-col gap-4 h-screen w-auto bg-gray-100 sm:sticky sm:left-0 ">
          <MenuItem to="" menuText="Dashboard" />
          <MenuItem to="invoices" menuText="Faktury" />
          <MenuItem to="customers" menuText="Kontrahenci" />
          <MenuItem to="payments" menuText="Płatnosci" />
          <MenuItem to="settings" menuText="Ustawienia" />
        </div>
        <div className="h-full w-full">
          <DashboardUserPanel />
          <Outlet />
        </div>
      </article>
    </Layout>
  );
}
