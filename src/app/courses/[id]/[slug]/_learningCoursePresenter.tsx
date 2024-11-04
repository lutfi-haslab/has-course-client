"use client";

import { getUserSession } from "@/lib/getUserSession";
import { useEffect, useState } from "react";

function useCourseContent() {
  const courseContent = [
    {
      section: "Introduction to React",
      completed: true,
      lessons: [
        { title: "What is React?", type: "video", completed: true },
        {
          title: "Setting up your development environment",
          type: "pdf",
          completed: true,
        },
        {
          title: "Your first React component",
          type: "markdown",
          completed: true,
        },
      ],
    },
    {
      section: "React Fundamentals",
      completed: false,
      lessons: [
        { title: "JSX syntax", type: "video", completed: true },
        { title: "Props and State", type: "markdown", completed: false },
        { title: "Handling events", type: "pdf", completed: false },
      ],
    },
    {
      section: "Advanced React Concepts",
      completed: false,
      lessons: [
        { title: "Hooks in-depth", type: "video", completed: false },
        { title: "Context API", type: "markdown", completed: false },
        { title: "Performance optimization", type: "pdf", completed: false },
      ],
    },
  ];

  return courseContent;
}

function useMarkdownContent() {
  const markdownContent = `
    # Props and State in React
    
    React components use props and state to manage data.
    
    ## Props
    
    Props are read-only and are passed from parent to child components.
    
    Example:
    \`\`\`jsx
    function Welcome(props) {
      return <h1>Hello, {props.name}</h1>;
    }
    \`\`\`
    
    ## State
    
    State is mutable and is managed within a component.
    
    Example:
    \`\`\`jsx
    function Counter() {
      const [count, setCount] = useState(0);
      return (
        <div>
          <p>You clicked {count} times</p>
          <button onClick={() => setCount(count + 1)}>
            Click me
          </button>
        </div>
      );
    }
    \`\`\`
    `;

  return markdownContent;
}

export default function useOpenCoursePresenter() {
  const courseContent = useCourseContent();
  const markdownContent = useMarkdownContent();
  const [activeLesson, setActiveLesson] = useState(courseContent[0].lessons[0]);
  const totalLessons = courseContent.reduce(
    (acc, section) => acc + section.lessons.length,
    0
  );
  const completedLessons = courseContent.reduce(
    (acc, section) =>
      acc + section.lessons.filter((lesson) => lesson.completed).length,
    0
  );
  const progressPercentage = Math.round(
    (completedLessons / totalLessons) * 100
  );

  return {
    courseContent,
    markdownContent,
    activeLesson,
    setActiveLesson,
    totalLessons,
    completedLessons,
    progressPercentage,
  };
}
