import Link from "next/link";
import createSupabaseServerClient from "@/utils/supabase/server";
import { GraduationCap, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { getUserSession } from "@/lib/getUserSession";

const Header = async () => {
  const { data } = await getUserSession();

  const logoutAction = async () => {
    "use server";
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link className="flex items-center space-x-2" href="#">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              LearnHub
            </span>
          </Link>
          <div className="hidden md:block flex-1 px-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                className="w-full pl-10 pr-4 py-2 rounded-full border-gray-300 focus:border-primary focus:ring-primary"
                placeholder="Search for anything"
                type="search"
              />
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            <Link
              className="text-sm font-medium text-gray-700 hover:text-primary dark:text-gray-200 dark:hover:text-primary"
              href="#"
            >
              Courses
            </Link>
            <Link
              className="text-sm font-medium text-gray-700 hover:text-primary dark:text-gray-200 dark:hover:text-primary"
              href="#"
            >
              Pricing
            </Link>
            <Link
              className="text-sm font-medium text-gray-700 hover:text-primary dark:text-gray-200 dark:hover:text-primary"
              href="#"
            >
              About
            </Link>

            {!data.session && (
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

            {data.session && (
              <form action={logoutAction} className="flex space-x-4">
                <Link href="/profile" className="text-ct-dark-600">
                  <Button variant="outline" className="ml-4">
                    Profile
                  </Button>
                </Link>
                <Button className="bg-red-500 hover:bg-red-800">Logout</Button>
              </form>
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

export default Header;
