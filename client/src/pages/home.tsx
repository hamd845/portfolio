import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { useEffect } from "react";

export default function Home() {
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    // Set proper meta tags for SEO
    document.title = "Portfolio - Premium Developer Experience";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Premium personal portfolio showcasing modern web development projects with advanced animations and 3D effects');
    }
    
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'portfolio, web developer, React, Next.js, Three.js, modern design');
    }
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg dark:bg-background text-light-text dark:text-foreground overflow-x-hidden">
      {/* Scroll Progress Indicator */}
      <div 
        className="scroll-indicator"
        style={{ width: `${scrollProgress}%` }}
      />
      
      <Navigation />
      
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      
      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-700/20 dark:border-gray-200/20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="font-poppins text-2xl font-bold mb-4">
            <span className="text-gradient">Portfolio</span>
          </div>
          <p className="text-gray-400 dark:text-gray-600 mb-6">
            Building the future, one line of code at a time.
          </p>
          <p className="text-sm text-gray-500">
            © 2024 Portfolio. All rights reserved. Designed & Developed with ❤️
          </p>
        </div>
      </footer>
    </div>
  );
}
