"use client";

import useRootPresenter from "@/app/_useRootPresenter";
import Link from "next/link";
import { Button } from "../ui/button";

const MiniHeaderClient = () => {
  const { state, actions } = useRootPresenter();

  return (
    <header className="absolute top-0 z-50 w-[calc(100%-16rem)] border-b bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-end w-full">
          <nav className="hidden md:flex items-center space-x-4">
            <Link
              className="text-sm font-medium text-gray-700 hover:text-primary dark:text-gray-200 dark:hover:text-primary"
              href="/courses"
            >
              Courses
            </Link>

            {state.session ? (
              <div className="flex space-x-4">
                <Link href="/profile" className="text-ct-dark-600">
                  <Button variant="outline" className="ml-4">
                    Profile
                  </Button>
                </Link>
                <Button
                  className="bg-red-500 hover:bg-red-800"
                  onClick={actions.logOut}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link href="/auth/login" className="text-ct-dark-600">
                  <Button variant="outline" className="ml-4">
                    Log in
                  </Button>
                </Link>
                <Link href="/auth/register" className="text-ct-dark-600">
                  <Button>Sign up</Button>
                </Link>
              </>
            )}
          </nav>
          <button className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary">
            <span className="sr-only">Open menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default MiniHeaderClient;
