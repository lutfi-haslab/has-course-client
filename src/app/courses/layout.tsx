"use client";
import HeaderClient from "@/components/layout/HeaderClient";
import React from "react";
import useCoursesPresenter from "./_useCoursesPresenter";
import useRootPresenter from "../_useRootPresenter";
import Loader from "@/components/shares/Loader";

const layout = ({ children }: { children: React.ReactNode }) => {
  const { state, actions } = useRootPresenter();
  if (state.loader.session || state.loader.user) {
    return <Loader />;
  }
  return (
    <div>
      <HeaderClient  />
      <React.Fragment>{children}</React.Fragment>
    </div>
  );
};

export default layout;
