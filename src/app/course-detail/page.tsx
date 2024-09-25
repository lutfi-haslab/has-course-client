import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@radix-ui/react-accordion'
import { Award, BookOpen, Clock, GraduationCap, Search, Star, PlayCircle, Download, Users } from 'lucide-react'
import Link from 'next/link'


export default function CourseDetail() {
  const courseContent = [
    {
      section: "Introduction to Web Development",
      lessons: [
        "What is Web Development?",
        "Setting Up Your Development Environment",
        "Introduction to HTML",
        "Introduction to CSS",
      ]
    },
    {
      section: "JavaScript Fundamentals",
      lessons: [
        "Variables and Data Types",
        "Control Structures",
        "Functions and Scope",
        "DOM Manipulation",
      ]
    },
    {
      section: "Advanced JavaScript",
      lessons: [
        "ES6+ Features",
        "Asynchronous JavaScript",
        "Working with APIs",
        "JavaScript Modules",
      ]
    },
    {
      section: "Introduction to React",
      lessons: [
        "React Basics",
        "Components and Props",
        "State and Lifecycle",
        "Hooks",
      ]
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link className="flex items-center space-x-2" href="/">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">LearnHub</span>
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
              <Link className="text-sm font-medium text-gray-700 hover:text-primary dark:text-gray-200 dark:hover:text-primary" href="#">
                Courses
              </Link>
              <Link className="text-sm font-medium text-gray-700 hover:text-primary dark:text-gray-200 dark:hover:text-primary" href="#">
                Pricing
              </Link>
              <Link className="text-sm font-medium text-gray-700 hover:text-primary dark:text-gray-200 dark:hover:text-primary" href="#">
                About
              </Link>
              <Button variant="outline" className="ml-4">Log in</Button>
              <Button>Sign up</Button>
            </nav>
            <button className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary">
              <span className="sr-only">Open menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Course Hero Section */}
      <div className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Web Development Bootcamp</h1>
          <p className="text-xl mb-6">
            Master the art of web development with our comprehensive bootcamp. Learn everything from HTML and CSS to advanced JavaScript and React.
          </p>
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 mr-1" />
              <span className="font-bold mr-1">4.8</span>
              <span className="text-gray-300">(1,234 ratings)</span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-1" />
              <span>12,345 students</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-1" />
              <span>80 hours</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="w-5 h-5 mr-1" />
              <span>12 modules</span>
            </div>
            <div className="flex items-center">
              <Award className="w-5 h-5 mr-1" />
              <span>Certificate of completion</span>
            </div>
          </div>
          <p className="mb-6">Created by <span className="font-bold">John Doe</span></p>
          <Button size="lg" className="bg-primary hover:bg-primary-dark">Enroll Now</Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">What you'll learn</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["Build modern, responsive websites", "Master JavaScript and React", "Work with APIs and databases", "Deploy your applications to the web"].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <h2 className="text-2xl font-semibold mb-4">Course Content</h2>
            <Accordion type="single" collapsible className="w-full">
              {courseContent.map((section, index) => (
                <AccordionItem value={`section-${index}`} key={index} className="border rounded-lg mb-2">
                  <AccordionTrigger className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <div className="flex justify-between items-center w-full">
                      <span className="font-semibold">{section.section}</span>
                      <span className="text-sm text-gray-500">{section.lessons.length} lessons</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-2 bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2">
                      {section.lessons.map((lesson, lessonIndex) => (
                        <li key={lessonIndex} className="flex items-center">
                          <PlayCircle className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{lesson}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div>
            <Card className="sticky top-20">
              <CardContent className="p-0">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Course Preview"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <p className="text-3xl font-bold mb-4">$99.99</p>
                  <Link href="/open-course">
                    <Button className="w-full mb-4" >Enroll Now</Button>
                  </Link>
                  <p className="text-sm text-center text-gray-500 mb-4">30-day money-back guarantee</p>
                  <h3 className="font-semibold mb-2">This course includes:</h3>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center">
                      <PlayCircle className="w-4 h-4 mr-2 text-gray-400" />
                      80 hours on-demand video
                    </li>
                    <li className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-2 text-gray-400" />
                      20 articles
                    </li>
                    <li className="flex items-center">
                      <Download className="w-4 h-4 mr-2 text-gray-400" />
                      50 downloadable resources
                    </li>
                    <li className="flex items-center">
                      <Award className="w-4 h-4 mr-2 text-gray-400" />
                      Certificate of completion
                    </li>
                    <li className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      Lifetime access
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Instructor Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Your Instructor</h2>
          <Card>
            <CardContent className="flex items-start p-6">
              <img
                src="/placeholder.svg?height=120&width=120"
                alt="John Doe"
                className="rounded-full w-24 h-24 mr-6"
              />
              <div>
                <h3 className="text-xl font-semibold mb-2">John Doe</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">Senior Web Developer</p>
                <div className="flex items-center mb-4">
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  <span className="font-bold mr-1">4.8</span>
                  <span className="text-gray-500">(234 reviews)</span>
                </div>
                <p className="text-sm mb-4">
                  John is a seasoned web developer with over 10 years of experience in the industry. He has worked with Fortune 500 companies and has a passion for teaching the next generation of developers.
                </p>
                <Button variant="outline">View Profile</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}