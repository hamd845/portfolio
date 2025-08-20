import { ChevronDown } from "lucide-react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

export default function Hero() {
  const { scrollToSection } = useSmoothScroll();

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Simplified Background */}
      <div className="absolute inset-0 mesh-gradient opacity-30" />
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-2xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-accent/15 to-success/15 rounded-full blur-2xl" />
      </div>
      
      {/* Hero Content */}
      <div className="relative z-20 text-center px-4 max-w-6xl mx-auto">
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-tight">
          <span className="block text-white dark:text-gray-900 mb-4 text-contrast font-medium">
            Hi, I'm
          </span>
          <span className="text-white dark:text-gray-900 font-serif">
            Hamd
          </span>
        </h1>
        
        <p className="text-xl md:text-3xl text-white/90 dark:text-gray-800 mb-12 max-w-4xl mx-auto font-light leading-relaxed text-contrast">
          Full Stack Developer crafting <span className="text-primary font-semibold bg-white/10 dark:bg-black/10 px-2 py-1 rounded">premium digital experiences</span> with 
          cutting-edge technology and innovative solutions.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full max-w-2xl mx-auto">
          <button 
            onClick={() => scrollToSection('projects')}
            className="w-full sm:w-auto px-10 py-5 bg-primary hover:bg-primary/90 rounded-2xl font-semibold text-white shadow-lg transition-all duration-200 z-30 relative"
            data-testid="button-view-work"
          >
            <span className="flex items-center justify-center space-x-2">
              <span>Explore My Work</span>
              <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
            </span>
          </button>
          <a
            href="/Hamd_Elahi_Resume.pdf"
            download="Hamd_Elahi_Resume.pdf"
            className="w-full sm:w-auto px-10 py-5 bg-white/10 border-2 border-primary/50 text-white hover:bg-primary/20 rounded-2xl font-semibold transition-all duration-200 inline-block z-30 relative text-center"
            data-testid="button-download-resume"
          >
            Download Resume
          </a>
        </div>
      </div>
      
      {/* Simple Scroll Indicator */}
      <div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer z-30"
        onClick={() => scrollToSection('about')}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-14 border-2 border-primary/80 rounded-full flex justify-center bg-white/10">
            <div className="w-2 h-4 bg-primary rounded-full mt-3" />
          </div>
          <div className="text-primary/80 font-medium text-sm">
            Scroll to explore
          </div>
        </div>
      </div>
    </section>
  );
}