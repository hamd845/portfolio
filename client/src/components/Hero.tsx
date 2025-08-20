import { ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Scene3D from "./three/Scene3D";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { useRef } from "react";

export default function Hero() {
  const { scrollToSection } = useSmoothScroll();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Simplified animations for better performance
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={ref} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Scene3D />
      
      {/* Simplified Background */}
      <div className="absolute inset-0 mesh-gradient opacity-30" />
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-2xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-accent/15 to-success/15 rounded-full blur-2xl" />
      </div>
      
      {/* Hero Content */}
      <motion.div 
        style={{ opacity, y }}
        className="relative z-10 text-center px-4 max-w-6xl mx-auto"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="font-display text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-tight"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="block text-white dark:text-gray-900 mb-4 text-contrast font-medium"
          >
            Hi, I'm
          </motion.span>
          <motion.span 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
            className="text-white dark:text-gray-900 font-serif"
          >
            Hamd
          </motion.span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-xl md:text-3xl text-white/90 dark:text-gray-800 mb-12 max-w-4xl mx-auto font-light leading-relaxed text-contrast"
        >
          Full Stack Developer crafting <span className="text-primary font-semibold bg-white/10 dark:bg-black/10 px-2 py-1 rounded">premium digital experiences</span> with 
          cutting-edge technology and innovative solutions.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full"
        >
          <motion.button 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('projects')}
            className="px-10 py-5 bg-primary hover:bg-primary/90 rounded-2xl font-semibold text-white shadow-lg transition-all duration-300"
            data-testid="button-view-work"
          >
            <span className="flex items-center space-x-2">
              <span>Explore My Work</span>
              <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
            </span>
          </motion.button>
          <motion.a
            href="/Hamd_Elahi_Resume.pdf"
            download="Hamd_Elahi_Resume.pdf"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 glass-morphism border-2 border-primary/50 text-primary rounded-2xl font-semibold hover:bg-primary/10 transition-all duration-500 backdrop-blur-xl inline-block"
            data-testid="button-download-resume"
          >
            Download Resume
          </motion.a>
        </motion.div>
      </motion.div>
      
      {/* Enhanced Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={() => scrollToSection('about')}
      >
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center space-y-4"
        >
          <div className="w-8 h-14 border-2 border-primary/80 rounded-full flex justify-center glass-morphism">
            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-2 h-4 bg-gradient-to-b from-primary to-secondary rounded-full mt-3"
            />
          </div>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-primary/80 font-medium text-sm"
          >
            Scroll to explore
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}