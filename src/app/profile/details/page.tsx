"use client";
import HeaderClient from "@/components/layout/HeaderClient";
import Loader from "@/components/shares/Loader";
import useRootPresenter from "../../_useRootPresenter";

export default function ProfilePage() {
  const { state, actions } = useRootPresenter();

  if (state.loader.user || state.loader.session) {
    return <Loader />;
  }

  return (
    <>
      <HeaderClient />
      <section className="bg-ct-blue-600  min-h-screen pt-20">
        <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex justify-center items-center">
          <div>
            <p className="mb-3 text-5xl text-center font-semibold">
              Profile Page
            </p>
            <div className="mt-8">
              <p className="mb-3">Id: {state?.user?.id}</p>
              <p className="mb-3">Role: {state?.user?.role}</p>
              <p className="mb-3">Email: {state?.user?.email}</p>
              <p className="mb-3">
                Provider: {state?.user?.app_metadata["provider"]}
              </p>
              <p className="mb-3">Created At: {state?.user?.created_at}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
