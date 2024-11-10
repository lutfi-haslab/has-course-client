import HeaderClient from "@/components/layout/HeaderClient";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <HeaderClient />
      {children}
    </div>
  );
};

export default layout;
