import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { useEffect } from "react";
import { motion } from "framer-motion";
import ScrollProgress from "@/components/ScrollProgress";
import FloatingElements from "@/components/FloatingElements";

export default function Home() {
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    // Set proper meta tags for SEO
    document.title = "Hamd - Portfolio | Full Stack Developer";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Hamd\'s portfolio showcasing modern web development projects with React, Node.js, and advanced animations');
    }
    
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'Hamd, portfolio, web developer, React, Node.js, Three.js, TypeScript, modern design');
    }
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-dark-bg dark:bg-background text-light-text dark:text-foreground overflow-x-hidden scroll-smooth"
    >
      {/* Enhanced Scroll Progress Indicator */}
      <ScrollProgress />
      
      <Navigation />
      <FloatingElements />
      
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Stats />
        <Testimonials />
        <Contact />
      </main>
      
      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-700/20 dark:border-gray-200/20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="font-display text-2xl font-bold mb-4">
            <span className="text-gradient">Hamd</span>
          </div>
          <p className="text-gray-400 dark:text-gray-600 mb-6">
            Building the future, one line of code at a time.
          </p>
          <p className="text-sm text-gray-500">
            © 2024 Portfolio. All rights reserved. Designed & Developed with ❤️
          </p>
        </div>
      </footer>
    </motion.div>
  );
}
