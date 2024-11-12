"use client";
import HeaderClient from "@/components/layout/HeaderClient";
import React from "react";
import { ProfileProvider } from "./(context)/_useProfile";
import { SidebarProvider } from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";

const layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <SidebarProvider>
      <ProfileProvider>
        {pathname !== "/profile/pengajaran-saya" && <HeaderClient />}
        <div>
          {children}
        </div>
      </ProfileProvider>
    </SidebarProvider>
  );
};

export default layout;
