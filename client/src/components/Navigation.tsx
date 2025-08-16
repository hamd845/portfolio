import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

export default function Navigation() {
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollToSection } = useSmoothScroll();

  useEffect(() => {
    // Check for saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setIsDark(savedTheme === 'dark');
    document.documentElement.classList.toggle('dark', savedTheme !== 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme !== 'dark');
  };

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-dark-bg/80 dark:bg-background/80 border-b border-gray-700/20 dark:border-gray-200/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-poppins font-bold text-gradient">
            Portfolio
          </div>
          
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => handleNavClick('hero')}
              className="hover:text-primary transition-colors duration-300"
              data-testid="nav-home"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('about')}
              className="hover:text-primary transition-colors duration-300"
              data-testid="nav-about"
            >
              About
            </button>
            <button 
              onClick={() => handleNavClick('projects')}
              className="hover:text-primary transition-colors duration-300"
              data-testid="nav-projects"
            >
              Projects
            </button>
            <button 
              onClick={() => handleNavClick('contact')}
              className="hover:text-primary transition-colors duration-300"
              data-testid="nav-contact"
            >
              Contact
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-dark-card dark:bg-gray-100 hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors duration-300"
              data-testid="theme-toggle"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <button 
              onClick={() => handleNavClick('hero')}
              className="block w-full text-left px-4 py-2 hover:text-primary transition-colors duration-300"
              data-testid="mobile-nav-home"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('about')}
              className="block w-full text-left px-4 py-2 hover:text-primary transition-colors duration-300"
              data-testid="mobile-nav-about"
            >
              About
            </button>
            <button 
              onClick={() => handleNavClick('projects')}
              className="block w-full text-left px-4 py-2 hover:text-primary transition-colors duration-300"
              data-testid="mobile-nav-projects"
            >
              Projects
            </button>
            <button 
              onClick={() => handleNavClick('contact')}
              className="block w-full text-left px-4 py-2 hover:text-primary transition-colors duration-300"
              data-testid="mobile-nav-contact"
            >
              Contact
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
