import { ChevronDown } from "lucide-react";
import ParticleBackground from "./three/ParticleBackground";
import FloatingElements from "./three/FloatingElements";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

export default function Hero() {
  const { scrollToSection } = useSmoothScroll();

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />
      <FloatingElements />
      
      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <h1 className="font-poppins text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-slide-up">
          <span className="block text-light-text dark:text-foreground">Hi, I'm</span>
          <span className="text-gradient animate-glow">
            Hamd
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 dark:text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in" 
           style={{ animationDelay: '0.3s' }}>
          Full Stack Developer specializing in React, Next.js, and modern web technologies.
          Creating exceptional digital experiences with cutting-edge technology.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in" 
             style={{ animationDelay: '0.6s' }}>
          <button 
            onClick={() => scrollToSection('projects')}
            className="px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-lg font-semibold text-white hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105"
            data-testid="button-view-work"
          >
            View My Work
          </button>
          <button 
            className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-300"
            data-testid="button-download-resume"
          >
            Download Resume
          </button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
           onClick={() => scrollToSection('about')}>
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
        <ChevronDown className="w-6 h-6 text-primary mt-2 mx-auto" />
      </div>
    </section>
  );
}
