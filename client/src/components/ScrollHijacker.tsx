import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface ScrollHijackerProps {
  children: React.ReactNode;
}

export default function ScrollHijacker({ children }: ScrollHijackerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const sectionsRef = useRef<HTMLElement[]>([]);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Get all sections
    const sections = Array.from(container.querySelectorAll('section')) as HTMLElement[];
    sectionsRef.current = sections;

    let scrollTimeout: NodeJS.Timeout;
    let isWheelScrolling = false;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isScrolling || isWheelScrolling) return;
      
      isWheelScrolling = true;
      clearTimeout(scrollTimeout);
      
      const direction = e.deltaY > 0 ? 1 : -1;
      const nextSection = Math.max(0, Math.min(sections.length - 1, currentSection + direction));
      
      if (nextSection !== currentSection) {
        scrollToSection(nextSection);
      }
      
      scrollTimeout = setTimeout(() => {
        isWheelScrolling = false;
      }, 150);
    };

    const scrollToSection = (index: number) => {
      if (isScrolling || index === currentSection) return;
      
      setIsScrolling(true);
      setCurrentSection(index);
      
      const targetSection = sections[index];
      if (targetSection) {
        targetSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
      
      setTimeout(() => {
        setIsScrolling(false);
      }, 800);
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return;
      
      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault();
          scrollToSection(Math.min(sections.length - 1, currentSection + 1));
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          scrollToSection(Math.max(0, currentSection - 1));
          break;
        case 'Home':
          e.preventDefault();
          scrollToSection(0);
          break;
        case 'End':
          e.preventDefault();
          scrollToSection(sections.length - 1);
          break;
      }
    };

    // Touch handling for mobile
    let touchStartY = 0;
    let touchEndY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      
      if (Math.abs(diff) > 50 && !isScrolling) {
        const direction = diff > 0 ? 1 : -1;
        const nextSection = Math.max(0, Math.min(sections.length - 1, currentSection + direction));
        scrollToSection(nextSection);
      }
    };

    // Add event listeners
    container.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('keydown', handleKeyDown);
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchend', handleTouchEnd);

    // Cleanup
    return () => {
      container.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeyDown);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      clearTimeout(scrollTimeout);
    };
  }, [currentSection, isScrolling]);

  // Navigation dots
  const navigateToSection = (index: number) => {
    if (!isScrolling) {
      const sections = sectionsRef.current;
      const targetSection = sections[index];
      if (targetSection) {
        setCurrentSection(index);
        targetSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      className="scroll-hijacked-container"
      style={{ 
        height: '100vh',
        overflowY: 'auto',
        scrollBehavior: 'smooth',
        scrollSnapType: 'y mandatory'
      }}
    >
      {children}
      
      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 space-y-4">
        {sectionsRef.current.map((_, index) => (
          <button
            key={index}
            onClick={() => navigateToSection(index)}
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              currentSection === index
                ? 'bg-primary border-primary shadow-lg scale-125'
                : 'bg-transparent border-white/50 hover:border-primary hover:bg-primary/30'
            }`}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Scroll Progress */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800/50 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
          initial={{ width: "0%" }}
          animate={{ 
            width: `${sectionsRef.current.length > 0 ? ((currentSection + 1) / sectionsRef.current.length) * 100 : 0}%` 
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}