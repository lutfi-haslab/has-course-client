"use client";
import HeaderClient from "@/components/layout/HeaderClient";
import Loader from "@/components/shares/Loader";
import React from "react";
import useRootPresenter from "../_useRootPresenter";
import { CourseProvider } from "./(context)/_useCourse";

const layout = ({ children }: { children: React.ReactNode }) => {
  const { state, actions } = useRootPresenter();
  if (state.loader.session || state.loader.user) {
    return <Loader />;
  }
  return (
    <CourseProvider>
      <div>
        <HeaderClient />
        <React.Fragment>{children}</React.Fragment>
      </div>
    </CourseProvider>
  );
};

export default layout;
