import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import SocialMedia from "@/components/SocialMedia";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";
import ParallaxBackground from "@/components/ParallaxBackground";
import ParallaxWrapper from "@/components/ParallaxWrapper";
import { useEffect } from "react";
import { motion } from "framer-motion";
import FloatingElements from "@/components/FloatingElements";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/hamd845",
  },
  {
    name: "LinkedIn", 
    icon: Linkedin,
    url: "https://www.linkedin.com/in/hamd-codes-113658311/",
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: "https://x.com/CodesHamd23703",
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/hamd_code/",
  }
];

export default function Home() {

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
      {/* Parallax Background Layer */}
      <ParallaxBackground />
      
      <Navigation />
      <FloatingElements />
      
      {/* Main Content Sections with Parallax */}
      <main className="relative z-10">
        <ParallaxWrapper speed={0.3} direction="up">
          <Hero />
        </ParallaxWrapper>
        
        <ParallaxWrapper speed={0.5} direction="down">
          <About />
        </ParallaxWrapper>
        
        <ParallaxWrapper speed={0.4} direction="up">
          <Skills />
        </ParallaxWrapper>
        
        <ParallaxWrapper speed={0.6} direction="down">
          <Projects />
        </ParallaxWrapper>
        
        <ParallaxWrapper speed={0.4} direction="up">
          <SocialMedia />
        </ParallaxWrapper>
        
        <ParallaxWrapper speed={0.3} direction="down">
          <Contact />
        </ParallaxWrapper>
        
        {/* Footer with Parallax */}
        <ParallaxWrapper speed={0.2} direction="down">
          <footer className="py-12 px-4 border-t border-gray-700/20 dark:border-gray-200/20">
            <div className="max-w-7xl mx-auto text-center">
              <div className="font-display text-2xl font-bold mb-4">
                <span className="text-gradient-hero">Hamd</span>
              </div>
              <p className="text-gray-400 dark:text-gray-600 mb-6">
                Building the future, one line of code at a time.
              </p>
              
              {/* Social Media Links */}
              <div className="flex justify-center space-x-6 mb-8">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-gray-800 dark:bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors duration-300"
                    data-testid={`footer-social-${social.name.toLowerCase()}`}
                  >
                    <social.icon className="w-5 h-5 text-white dark:text-gray-800" />
                  </motion.a>
                ))}
              </div>
              
              <p className="text-sm text-gray-500">
                © 2024 Portfolio. All rights reserved. Designed & Developed with ❤️
              </p>
            </div>
          </footer>
        </ParallaxWrapper>
      </main>
    </motion.div>
  );
}
