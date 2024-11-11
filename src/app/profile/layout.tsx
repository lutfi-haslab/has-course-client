import HeaderClient from "@/components/layout/HeaderClient";
import React from "react";
import { ProfileProvider } from "./(context)/_useProfile";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProfileProvider>
      <div>
        <HeaderClient />
        {children}
      </div>
    </ProfileProvider>
  );
};

export default layout;
