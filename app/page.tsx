"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TextPlugin } from "gsap/TextPlugin"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Moon, Sun, Menu, X, Github, Linkedin, Mail, ExternalLink, Send } from "lucide-react"
import { ThemeProvider, useTheme } from "next-themes"
import Image from "next/image"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, TextPlugin)
}

export default function Portfolio() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <PortfolioContent />
    </ThemeProvider>
  )
}

function PortfolioContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const heroRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Hero animations
    const tl = gsap.timeline()
    tl.from(".hero-title", {
      duration: 1.5,
      y: 100,
      opacity: 0,
      ease: "power4.out",
      stagger: 0.2,
    })
      .from(
        ".hero-subtitle",
        {
          duration: 1,
          y: 50,
          opacity: 0,
          ease: "power3.out",
        },
        "-=0.5",
      )
      .from(
        ".hero-cta",
        {
          duration: 0.8,
          y: 30,
          opacity: 0,
          ease: "back.out(1.7)",
        },
        "-=0.3",
      )

    // Typing animation
    gsap.to(".typing-text", {
      duration: 3,
      text: "Full Stack Developer & AI Enthusiast",
      ease: "none",
      delay: 1,
    })

    // Scroll progress
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollTop / docHeight
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", updateScrollProgress)

    // Parallax effects
    gsap.utils.toArray(".parallax").forEach((element: any) => {
      gsap.to(element, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
    })

    // Section animations
    gsap.utils.toArray(".fade-in").forEach((element: any) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )
    })

    // Project cards animation
    gsap.utils.toArray(".project-card").forEach((card: any, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 100, rotationX: -15 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1,
          ease: "power3.out",
          delay: index * 0.2,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )
    })

    return () => {
      window.removeEventListener("scroll", updateScrollProgress)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [mounted])

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Portfolio
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection(heroRef)} className="hover:text-purple-400 transition-colors">
                Home
              </button>
              <button onClick={() => scrollToSection(aboutRef)} className="hover:text-purple-400 transition-colors">
                About
              </button>
              <button onClick={() => scrollToSection(projectsRef)} className="hover:text-purple-400 transition-colors">
                Projects
              </button>
              <button onClick={() => scrollToSection(contactRef)} className="hover:text-purple-400 transition-colors">
                Contact
              </button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="ml-4"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4">
              <button
                onClick={() => scrollToSection(heroRef)}
                className="block hover:text-purple-400 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection(aboutRef)}
                className="block hover:text-purple-400 transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection(projectsRef)}
                className="block hover:text-purple-400 transition-colors"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection(contactRef)}
                className="block hover:text-purple-400 transition-colors"
              >
                Contact
              </button>
            </div>
          )}
        </div>

        {/* Scroll Progress Bar */}
        <div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Float speed={2} rotationIntensity={1} floatIntensity={2}>
              <Sphere args={[1, 100, 200]} scale={2.5}>
                <MeshDistortMaterial
                  color={theme === "dark" ? "#8b5cf6" : "#a855f7"}
                  attach="material"
                  distort={0.3}
                  speed={2}
                  roughness={0.2}
                />
              </Sphere>
            </Float>
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
          </Canvas>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="hero-title text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
            Sneha Saraf
          </h1>
          <div className="hero-subtitle text-xl md:text-2xl mb-8 h-8">
            <span className="typing-text"></span>
          </div>
          <p className="hero-subtitle text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Building innovative web applications and AI-powered solutions. Passionate about creating user-centric
            experiences that solve real-world problems through technology.
          </p>
          <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              onClick={() => scrollToSection(projectsRef)}
            >
              View My Work
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection(contactRef)}>
              Get In Touch
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-purple-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="fade-in text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Me
            </h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="fade-in">
                <div className="relative w-80 h-80 mx-auto rounded-full overflow-hidden border-4 border-purple-400/20">
                  <Image
                    src="/placeholder.svg?height=320&width=320"
                    alt="Profile"
                    fill
                    className="object-cover parallax"
                  />
                </div>
              </div>

              <div className="fade-in space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I'm a passionate full-stack developer with expertise in building modern web applications and
                  AI-powered solutions. My journey in tech has been driven by a desire to create meaningful digital
                  experiences that make a positive impact on people's lives.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I specialize in developing comprehensive web solutions, from mental health support systems to
                  collaborative platforms and e-commerce applications. I love combining cutting-edge technology with
                  user-centered design to build applications that are both powerful and intuitive.
                </p>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  {[
                    "React",
                    "Next.js",
                    "Node.js",
                    "Python",
                    "MongoDB",
                    "PostgreSQL",
                    "AI/ML",
                    "PWA",
                    "TypeScript",
                    "Express.js",
                    "Socket.io",
                    "AWS",
                  ].map((skill, index) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="justify-center py-2 hover:bg-purple-500/20 transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} className="py-20 bg-muted/50">
        <div className="container mx-auto px-6">
          <h2 className="fade-in text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Mental Health Bot",
                description:
                  "AI-powered chatbot providing mental health support with natural language processing and personalized responses.",
                image: "/placeholder.svg?height=300&width=400",
                tech: ["Python", "NLP", "React", "Node.js"],
                link: "https://github.com/sneha-024",
              },
              {
                title: "Feedback Survey System",
                description:
                  "Comprehensive survey platform with real-time analytics, customizable forms, and detailed reporting.",
                image: "/placeholder.svg?height=300&width=400",
                tech: ["React", "Node.js", "MongoDB", "Chart.js"],
                link: "https://github.com/sneha-024",
              },
              {
                title: "E-commerce PWA",
                description:
                  "Progressive Web App for e-commerce with offline functionality, push notifications, and seamless user experience.",
                image: "/placeholder.svg?height=300&width=400",
                tech: ["PWA", "React", "Service Workers", "Stripe"],
                link: "https://github.com/sneha-024",
              },
              {
                title: "Skilsphere Learning Platform",
                description:
                  "Interactive learning management system with course creation, progress tracking, and collaborative features.",
                image: "/placeholder.svg?height=300&width=400",
                tech: ["Next.js", "PostgreSQL", "Socket.io", "AWS"],
                link: "https://github.com/sneha-024",
              },
              {
                title: "Collaborative Docs",
                description:
                  "Real-time collaborative document editor with live editing, comments, and version control features.",
                image: "/placeholder.svg?height=300&width=400",
                tech: ["React", "Socket.io", "MongoDB", "WebRTC"],
                link: "https://github.com/sneha-024",
              },
            ].map((project, index) => (
              <Card
                key={index}
                className="project-card group hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 bg-background/50 backdrop-blur-sm"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Button
                    size="icon"
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm hover:bg-white/30"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="fade-in text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Let's Work Together
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="fade-in space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Get In Touch</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    I'm always excited to discuss new opportunities and innovative projects. Whether you want to
                    collaborate on an AI solution, need help with web development, or just want to connect, I'd love to
                    hear from you!
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4 group cursor-pointer">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                      <Mail className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">sarafsneha0@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 group cursor-pointer">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                      <Github className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="font-medium">GitHub</p>
                      <p className="text-muted-foreground">@sneha-024</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 group cursor-pointer">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                      <Linkedin className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="font-medium">LinkedIn</p>
                      <p className="text-muted-foreground">sneha-saraf-7962b3286</p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="fade-in border-0 bg-background/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Name</label>
                      <Input
                        placeholder="Your name"
                        className="focus:ring-2 focus:ring-purple-400 transition-all duration-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        className="focus:ring-2 focus:ring-purple-400 transition-all duration-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Message</label>
                      <Textarea
                        placeholder="Tell me about your project..."
                        rows={5}
                        className="focus:ring-2 focus:ring-purple-400 transition-all duration-300 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 group"
                    >
                      <Send className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-muted-foreground">© {new Date().getFullYear()} Sneha Saraf. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-purple-400"
                onClick={() => window.open("https://github.com/sneha-024", "_blank")}
              >
                <Github className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-purple-400"
                onClick={() => window.open("https://www.linkedin.com/in/sneha-saraf-7962b3286/", "_blank")}
              >
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-purple-400"
                onClick={() => window.open("mailto:sarafsneha0@gmail.com", "_blank")}
              >
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
