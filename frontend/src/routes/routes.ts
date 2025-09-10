import LoginPage from "./loginPage";
import Dashboard from "./dashboard";
import { createBrowserRouter } from "react-router";
import rootRoute from "./__root";
import AuthLayout from "../layout/AuthLayout";
import InvoiceDetailsPage from "../pages/login-page/invoiceDetails/invoiceDetailsPage";
import DashboardHome from "./DashboardHome";
import RegisterForm from "../components/molecules/RegisterForm";
import CustomersPage from "../pages/login-page/CustomersPage";
import SettingsPage from "../pages/SettingsPage";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: rootRoute,
    children: [
      {
        path: "login",
        Component: LoginPage,
      },
      {
        path: "auth",
        Component: AuthLayout,
        children: [
          { path: "login", Component: LoginPage },
          { path: "register", Component: RegisterForm },
        ],
      },
      {
        path: "dashboard",
        Component: Dashboard,
        children: [
          { index: true, Component: DashboardHome },
          { path: "customers", Component: CustomersPage },
          { path: "settings", Component: SettingsPage },
        ],
      },
      {
        path: "/dashboard/invoices/:invoiceId",
        Component: InvoiceDetailsPage,
      },
    ],
  },
]);
