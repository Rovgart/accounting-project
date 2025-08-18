import type { ReactNode } from "react";

function CustomerInfoItemLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col shadow-sm shadow-black rounded-md p-6 gap-2">
      {children}
    </div>
  );
}

export default CustomerInfoItemLayout;
