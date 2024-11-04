"use client"
import HeaderClient from "@/components/layout/HeaderClient";
import React from "react";
import useCoursesPresenter from "./_useCoursesPresenter";

const layout = ({ children }: { children: React.ReactNode }) => {
  const { session } = useCoursesPresenter();
  return (
    <div>
      <HeaderClient session={session} />
      <React.Fragment>{children}</React.Fragment>
    </div>
  );
};

export default layout;
