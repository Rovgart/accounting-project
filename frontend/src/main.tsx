"use client";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/routes";

const root = document.getElementById("root");

createRoot(root!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
