import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface ScrollHijackerProps {
  children: React.ReactNode;
}

export default function ScrollHijacker({ children }: ScrollHijackerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [totalSections, setTotalSections] = useState(0);
  const sectionsRef = useRef<HTMLElement[]>([]);
  
  // Motion values for smooth animations
  const scrollProgress = useMotionValue(0);
  const smoothProgress = useSpring(scrollProgress, { 
    stiffness: 100, 
    damping: 30, 
    restDelta: 0.001 
  });

  // Parallax effects
  const backgroundY = useTransform(smoothProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(smoothProgress, [0, 1], ["0%", "20%"]);

  const scrollToSection = useCallback((index: number) => {
    if (isScrolling || index === currentSection || index < 0 || index >= totalSections) return;
    
    setIsScrolling(true);
    setCurrentSection(index);
    
    const container = containerRef.current;
    const sections = sectionsRef.current;
    
    if (container && sections[index]) {
      // Smooth scroll to section
      const targetSection = sections[index];
      const containerHeight = container.clientHeight;
      const targetOffset = targetSection.offsetTop;
      
      // Update scroll progress
      scrollProgress.set(index / Math.max(1, totalSections - 1));
      
      // Scroll with custom easing
      container.scrollTo({
        top: targetOffset,
        behavior: 'smooth'
      });
      
      // Reset scrolling state after animation
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    }
  }, [isScrolling, currentSection, totalSections, scrollProgress]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Get all sections and set up references
    const sections = Array.from(container.querySelectorAll('section')) as HTMLElement[];
    sectionsRef.current = sections;
    setTotalSections(sections.length);

    let wheelTimeout: NodeJS.Timeout;
    let isWheelActive = false;

    // Enhanced wheel handling with debouncing
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (isScrolling || isWheelActive) return;
      
      clearTimeout(wheelTimeout);
      isWheelActive = true;
      
      const direction = e.deltaY > 0 ? 1 : -1;
      const nextSection = Math.max(0, Math.min(sections.length - 1, currentSection + direction));
      
      if (nextSection !== currentSection) {
        scrollToSection(nextSection);
      }
      
      wheelTimeout = setTimeout(() => {
        isWheelActive = false;
      }, 100);
    };

    // Improved keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return;
      
      let targetSection = currentSection;
      
      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
        case ' ': // Spacebar
          e.preventDefault();
          targetSection = Math.min(sections.length - 1, currentSection + 1);
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          targetSection = Math.max(0, currentSection - 1);
          break;
        case 'Home':
          e.preventDefault();
          targetSection = 0;
          break;
        case 'End':
          e.preventDefault();
          targetSection = sections.length - 1;
          break;
        default:
          return;
      }
      
      scrollToSection(targetSection);
    };

    // Enhanced touch handling
    let touchStartY = 0;
    let touchStartTime = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrolling) return;
      
      const touchEndY = e.changedTouches[0].clientY;
      const touchEndTime = Date.now();
      const timeDiff = touchEndTime - touchStartTime;
      const distance = touchStartY - touchEndY;
      
      // Only trigger if it's a quick swipe (less than 300ms) and significant distance
      if (timeDiff < 300 && Math.abs(distance) > 50) {
        const direction = distance > 0 ? 1 : -1;
        const nextSection = Math.max(0, Math.min(sections.length - 1, currentSection + direction));
        scrollToSection(nextSection);
      }
    };

    // Scroll detection for manual scrolling
    const handleScroll = () => {
      if (isScrolling) return;
      
      const scrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      
      // Find the section that's most visible
      let mostVisibleSection = 0;
      let maxVisibility = 0;
      
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        const visibleHeight = Math.min(rect.bottom, containerRect.bottom) - Math.max(rect.top, containerRect.top);
        const visibility = Math.max(0, visibleHeight) / containerHeight;
        
        if (visibility > maxVisibility) {
          maxVisibility = visibility;
          mostVisibleSection = index;
        }
      });
      
      if (mostVisibleSection !== currentSection) {
        setCurrentSection(mostVisibleSection);
        scrollProgress.set(mostVisibleSection / Math.max(1, sections.length - 1));
      }
    };

    // Add event listeners
    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('keydown', handleKeyDown);
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Initial setup
    scrollProgress.set(0);

    // Cleanup
    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleKeyDown);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      clearTimeout(wheelTimeout);
    };
  }, [currentSection, isScrolling, scrollToSection, scrollProgress, totalSections]);

  // Click handler for navigation dots
  const handleDotClick = (index: number) => {
    scrollToSection(index);
  };

  return (
    <div className="relative">
      {/* Enhanced Background Effects */}
      <motion.div 
        style={{ y: backgroundY }}
        className="fixed inset-0 pointer-events-none z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360] 
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-accent/20 to-success/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0] 
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.div>

      {/* Main Content Container */}
      <div 
        ref={containerRef}
        className="relative z-10 h-screen overflow-y-auto scroll-smooth"
        style={{ 
          scrollBehavior: 'smooth',
          scrollSnapType: 'y mandatory'
        }}
      >
        <motion.div style={{ y: textY }}>
          {children}
        </motion.div>
      </div>
      
      {/* Enhanced Navigation Dots */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 space-y-3">
        {Array.from({ length: totalSections }).map((_, index) => (
          <motion.button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`group relative w-4 h-4 rounded-full border-2 transition-all duration-300 ${
              currentSection === index
                ? 'bg-primary border-primary shadow-lg shadow-primary/50'
                : 'bg-transparent border-white/30 hover:border-primary hover:bg-primary/20'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to section ${index + 1}`}
          >
            {/* Tooltip */}
            <span className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {index === 0 && 'Home'}
              {index === 1 && 'About'}
              {index === 2 && 'Skills'}
              {index === 3 && 'Projects'}
              {index === 4 && 'Contact'}
              {index === 5 && 'Footer'}
            </span>
          </motion.button>
        ))}
      </div>
      
      {/* Enhanced Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-900/50 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-primary via-secondary to-accent relative overflow-hidden"
          style={{ 
            width: useTransform(smoothProgress, [0, 1], ["0%", "100%"])
          }}
        >
          {/* Animated shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>
      </div>

      {/* Section Transition Effects */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-20"
        animate={{ 
          opacity: isScrolling ? 0.1 : 0 
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
        animate={{ 
          opacity: currentSection === 0 ? 1 : 0,
          y: currentSection === 0 ? 0 : 20
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center space-y-2 text-white/60">
          <span className="text-sm font-medium">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [2, 6, 2] }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}