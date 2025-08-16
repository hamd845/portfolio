import { ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);

  return (
    <section ref={ref} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Scene3D />
      
      {/* Parallax Background Layers */}
      <motion.div 
        style={{ y }} 
        className="absolute inset-0 mesh-gradient opacity-30"
      />
      
      {/* Hero Content */}
      <motion.div 
        style={{ opacity }}
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
            className="block text-light-text dark:text-foreground mb-4"
          >
            Hi, I'm
          </motion.span>
          <motion.span 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
            className="premium-gradient bg-clip-text text-transparent animate-pulse-glow font-serif"
          >
            Hamd
          </motion.span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-xl md:text-3xl text-gray-300 dark:text-gray-600 mb-12 max-w-4xl mx-auto font-light leading-relaxed"
        >
          Full Stack Developer crafting <span className="text-primary font-semibold">premium digital experiences</span> with 
          cutting-edge technology and innovative solutions.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.button 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('projects')}
            className="px-10 py-5 premium-gradient rounded-2xl font-semibold text-white shadow-2xl hover:shadow-primary/40 transition-all duration-500 glass-morphism backdrop-blur-xl"
            data-testid="button-view-work"
          >
            <span className="flex items-center space-x-2">
              <span>Explore My Work</span>
              <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
            </span>
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 glass-morphism border-2 border-primary/50 text-primary rounded-2xl font-semibold hover:bg-primary/10 transition-all duration-500 backdrop-blur-xl"
            data-testid="button-download-resume"
          >
            Download Resume
          </motion.button>
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