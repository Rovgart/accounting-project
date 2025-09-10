import type { ReactNode } from "react";

export default function InvoiceDetailsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <article className="grid grid-cols-[minmax(0,10rem)_minmax(0,1fr)_minmax(0,10rem)]">
      {children}
    </article>
  );
}
