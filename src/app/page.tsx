"use client";
import HeaderClient from "@/components/layout/HeaderClient";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookOpen, CheckCircle, Users } from "lucide-react";
import Link from "next/link";
import useRootPresenter from "./_useRootPresenter";

export default function LandingPage() {
  const { state, actions } = useRootPresenter();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <HeaderClient />
      <main className="flex-1">
        <section className="bg-gradient-to-r from-primary to-primary-dark text-white">
          <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                Learn without limits
              </h1>
              <p className="mt-6 text-xl">
                Start, switch, or advance your career with more than 5,000
                courses, Professional Certificates, and degrees from world-class
                universities and companies.
              </p>
              <div className="mt-10 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Link href="/auth/login">
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-gray-100"
                  >
                    Join for Free
                  </Button>
                </Link>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary"
                >
                  Try LearnHub Business
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl text-center mb-12">
              Featured Courses
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Web Development Bootcamp",
                  description: "Learn full-stack web development",
                  price: "$99.99",
                  image: "https://source.unsplash.com/random/800x600?web",
                  link: "/course-detail",
                },
                {
                  title: "Data Science Fundamentals",
                  description: "Master the basics of data science",
                  price: "$89.99",
                  image: "https://source.unsplash.com/random/800x600?data",
                  link: "/course-detail",
                },
                {
                  title: "Digital Marketing Mastery",
                  description: "Become a digital marketing expert",
                  price: "$79.99",
                  image: "https://source.unsplash.com/random/800x600?marketing",
                  link: "/course-detail",
                },
              ].map((course, index) => (
                <Card key={index} className="overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-48 w-full object-cover"
                  />
                  <CardHeader>
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">
                      {course.price}
                    </span>
                    <Link href={course.link} className="text-primary">
                      <Button>Enroll Now</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-gray-100 dark:bg-gray-800 py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl text-center mb-12">
              Why Choose LearnHub?
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: BookOpen,
                  title: "Wide Range of Courses",
                  description:
                    "Access thousands of courses in various subjects",
                },
                {
                  icon: Users,
                  title: "Expert Instructors",
                  description:
                    "Learn from industry professionals and thought leaders",
                },
                {
                  icon: CheckCircle,
                  title: "Flexible Learning",
                  description: "Study at your own pace, anytime and anywhere",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md"
                >
                  <feature.icon className="w-12 h-12 mb-4 text-primary" />
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Start Your Learning Journey Today
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Join millions of learners and transform your career with
                LearnHub.
              </p>
              <div className="mt-8">
                <form className="sm:flex justify-center">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full sm:w-64"
                  />
                  <Button
                    type="submit"
                    className="mt-3 sm:mt-0 sm:ml-3 w-full sm:w-auto"
                  >
                    Get Started
                  </Button>
                </form>
                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                  By signing up, you agree to our Terms of Service and Privacy
                  Policy.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">
                Company
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link className="text-gray-300 hover:text-white" href="#">
                    About
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-300 hover:text-white" href="#">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-300 hover:text-white" href="#">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">
                Community
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link className="text-gray-300 hover:text-white" href="#">
                    Learners
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-300 hover:text-white" href="#">
                    Partners
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-300 hover:text-white" href="#">
                    Developers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">
                Legal
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link className="text-gray-300 hover:text-white" href="#">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-300 hover:text-white" href="#">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-300 hover:text-white" href="#">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">
                Connect
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link className="text-gray-300 hover:text-white" href="#">
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-300 hover:text-white" href="#">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-300 hover:text-white" href="#">
                    LinkedIn
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8">
            <p className="text-center text-sm text-gray-400">
              © 2024 LearnHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
