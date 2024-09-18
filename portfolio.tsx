"use client"

import { useEffect, useRef, useState } from "react"
import { Github, Linkedin, ExternalLink, Download, Mail, MapPin, Calendar, Code, Coffee, Music, Sun, Moon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Component() {
  const [activeSection, setActiveSection] = useState("about")
  const [isScrolling, setIsScrolling] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const sectionRefs = {
    about: useRef(null),
    education: useRef(null),
    projects: useRef(null),
  }

  useEffect(() => {
    const observers = Object.entries(sectionRefs).map(([id, ref]) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id)
            }
          })
        },
        { threshold: 0.5 }
      )
      if (ref.current) {
        observer.observe(ref.current)
      }
      return observer
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  useEffect(() => {
    const smoothScroll = (e: MouseEvent) => {
      e.preventDefault()
      const target = e.target as HTMLAnchorElement
      const targetId = target.getAttribute("href")
      if (targetId && targetId.startsWith("#")) {
        setIsScrolling(true)
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" })
          setTimeout(() => setIsScrolling(false), 1000)
        }
      }
    }

    const links = document.querySelectorAll('a[href^="#"]')
    links.forEach((link) => {
      link.addEventListener("click", smoothScroll)
    })

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", smoothScroll)
      })
    }
  }, [])

  const headerThemes = {
    about: isDarkMode ? "bg-gradient-to-r from-gray-900 to-gray-800" : "bg-gradient-to-r from-blue-500 to-purple-500",
    education: isDarkMode ? "bg-gradient-to-r from-gray-900 to-gray-800" : "bg-gradient-to-r from-red-800 to-red-600",
    projects: isDarkMode ? "bg-gradient-to-r from-gray-900 to-gray-800" : "bg-gradient-to-r from-green-500 to-teal-500",
  }

  const sectionThemes = {
    about: isDarkMode ? "bg-gradient-to-br from-gray-900 to-gray-800" : "bg-gradient-to-br from-blue-400 to-purple-500",
    education: isDarkMode ? "bg-gradient-to-br from-gray-900 to-gray-800" : "bg-gradient-to-br from-red-800 to-red-600",
    projects: isDarkMode ? "bg-gradient-to-br from-gray-900 to-gray-800" : "bg-gradient-to-br from-green-400 to-teal-500",
  }

  const [coffeeCount, setCoffeeCount] = useState(0)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <header
        className={`sticky top-0 z-10 ${
          headerThemes[activeSection]
        } transition-colors duration-300 ease-in-out text-white`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">John Doe</h1>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-300"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
          <nav className="flex items-center space-x-4">
            <Link
              href="#about"
              className={`hover:underline transition-all duration-300 ${
                activeSection === "about" ? "text-yellow-300" : ""
              }`}
            >
              About
            </Link>
            <Link
              href="#education"
              className={`hover:underline transition-all duration-300 ${
                activeSection === "education" ? "text-yellow-300" : ""
              }`}
            >
              Education
            </Link>
            <Link
              href="#projects"
              className={`hover:underline transition-all duration-300 ${
                activeSection === "projects" ? "text-yellow-300" : ""
              }`}
            >
              Projects
            </Link>
            <a
              href="https://github.com/johndoe"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity duration-300"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com/in/johndoe"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity duration-300"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="/path-to-your-resume.pdf"
              download
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
            >
              <Download className="h-4 w-4 mr-2" />
              Resume
            </a>
          </nav>
        </div>
      </header>

      <main className={`${isScrolling ? "pointer-events-none" : ""} transition-colors duration-300`}>
        <section
          id="about"
          ref={sectionRefs.about}
          className={`min-h-screen flex items-center ${sectionThemes.about} ${isDarkMode ? 'text-gray-100' : 'text-white'}`}
        >
          <div className="container mx-auto px-4 py-16">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3 relative group">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="John Doe"
                  width={300}
                  height={300}
                  className="rounded-full shadow-lg border-4 border-white dark:border-gray-800 transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-blue-600 dark:bg-purple-600 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <div className="md:w-2/3">
                <h2 className="text-4xl font-bold mb-4">About Me</h2>
                <p className="text-xl mb-6">
                  I'm a passionate web developer with expertise in React, Node.js, and modern web technologies. I love
                  creating user-friendly and efficient web applications. With a keen eye for design and a strong
                  foundation in computer science, I strive to build innovative solutions that make a difference.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Mail className="h-6 w-6 mr-2" />
                    <span>john.doe@example.com</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-6 w-6 mr-2" />
                    <span>Phoenix, Arizona</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-6 w-6 mr-2" />
                    <span>Available for hire</span>
                  </div>
                  <div className="flex items-center">
                    <ExternalLink className="h-6 w-6 mr-2" />
                    <span>Portfolio: johndoe.dev</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12">
              <h3 className="text-2xl font-semibold mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {["React", "Node.js", "TypeScript", "Next.js", "GraphQL", "Tailwind CSS", "MongoDB", "AWS"].map(
                  (skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        isDarkMode ? 'bg-gray-700 text-gray-100 hover:bg-gray-600' : 'bg-white text-blue-600 hover:bg-blue-100'
                      } transition-colors duration-300`}
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>
            <div className="mt-12">
              <h3 className="text-2xl font-semibold mb-4">Fun Facts</h3>
              <div className="flex flex-wrap gap-4">
                <div className={`flex items-center rounded-lg p-3 transition-transform duration-300 hover:scale-105 ${
                  isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white bg-opacity-20 hover:bg-opacity-30'
                }`}>
                  <Code className="h-6 w-6 mr-2" />
                  <span>I love solving coding challenges</span>
                </div>
                <div className={`flex items-center rounded-lg p-3 transition-transform duration-300 hover:scale-105 ${
                  isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white bg-opacity-20 hover:bg-opacity-30'
                }`}>
                  <Coffee
                    className="h-6 w-6 mr-2 cursor-pointer"
                    onClick={() => setCoffeeCount((prev) => prev + 1)}
                  />
                  <span>
                    I've had {coffeeCount} cup{coffeeCount !== 1 ? "s" : ""} of coffee today
                  </span>
                </div>
                <div className={`flex items-center rounded-lg p-3 transition-transform duration-300 hover:scale-105 ${
                  isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white bg-opacity-20 hover:bg-opacity-30'
                }`}>
                  <Music className="h-6 w-6 mr-2" />
                  <span>I play guitar in my free time</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="education"
          ref={sectionRefs.education}
          className={`min-h-screen flex items-center ${sectionThemes.education}`}
        >
          <div className="container mx-auto px-4 py-16">
            <div className={`p-8 rounded-lg shadow-md border-l-4 border-[#FFC627] h-full flex flex-col md:flex-row justify-center items-center md:items-start gap-8 ${
              isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
            }`}>
              <div className="md:w-2/3">
                <h2 className="text-4xl font-bold mb-8 text-[#FFC627]">Education</h2>
                <h3 className="text-3xl font-semibold text-[#FFC627] mb-2">Arizona State University</h3>
                <p className={`text-xl mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Bachelor of Science in Computer Science</p>
                <ul className={`list-disc list-inside space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li>Graduated with honors (Magna Cum Laude)</li>
                  <li>Member of the Computer Science Student Association</li>
                  <li>Participated in the ASU Innovation Challenge</li>
                  <li>Completed internship at a leading tech company</li>
                  <li>Senior project: AI-powered personal assistant application</li>
                </ul>
              </div>
              <div className="md:w-1/3 relative group">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Arizona State University Logo"
                  width={300}
                  height={300}
                  className="rounded-full bg-white p-2 transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#FFC627] rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="projects"
          ref={sectionRefs.projects}
          className={`min-h-screen flex items-center ${sectionThemes.projects}`}
        >
          <div className="container mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold mb-8 text-white">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "E-commerce Platform",
                  description: "A full-stack e-commerce solution built with React, Node.js, and MongoDB.",
                  link: "https://github.com/johndoe/ecommerce-platform",
                },
                {
                  title: "Weather App",
                  description: "A responsive weather application using React and integrating with a weather API.",
                  link: "https://github.com/johndoe/weather-app",
                },
                {
                  title: "Task Management System",
                  description: "A collaborative task management tool built with React and Firebase.",
                  link: "https://github.com/johndoe/task-management",
                },
                {
                  title: "Portfolio Website",
                  description: "A personal portfolio website showcasing my projects and skills (you're looking at it!).",
                  link: "https://github.com/johndoe/portfolio",
                },
              ].map((project, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 ${
                    isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
                  }`}
                >
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt={project.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h3 className={`text-xl font-semibold mb-2 ${
                    isDarkMode ? 'text-teal-400' : 'text-teal-600'
                  }`}>{project.title}</h3>
                  <p className={`mb-4 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>{project.description}</p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center ${
                      isDarkMode ? 'text-teal-400 hover:text-teal-300' : 'text-teal-600 hover:text-teal-800'
                    } transition-colors duration-300`}
                  >
                    View Project <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
