import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ParallaxBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export default function ParallaxBackground({ children, className = '' }: ParallaxBackgroundProps) {
  const { scrollYProgress } = useScroll();
  
  // Create multiple layers with different speeds
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const backgroundY = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);
  const backgroundY2 = useTransform(smoothProgress, [0, 1], ["0%", "50%"]);
  const backgroundY3 = useTransform(smoothProgress, [0, 1], ["0%", "80%"]);
  
  const opacity1 = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 0.4, 0.1]);
  const opacity2 = useTransform(smoothProgress, [0, 0.3, 0.8, 1], [0.6, 0.8, 0.3, 0.1]);
  const scale1 = useTransform(smoothProgress, [0, 1], [1, 1.3]);
  const scale2 = useTransform(smoothProgress, [0, 1], [1, 1.5]);

  return (
    <div className={`fixed inset-0 pointer-events-none z-0 ${className}`}>
      {/* Layer 1 - Slowest moving background */}
      <motion.div 
        style={{ 
          y: backgroundY,
          opacity: opacity1,
          scale: scale1
        }}
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10"
      />
      
      {/* Layer 2 - Medium speed floating elements */}
      <motion.div 
        style={{ 
          y: backgroundY2,
          opacity: opacity2,
          scale: scale2
        }}
        className="absolute inset-0"
      >
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

      {/* Layer 3 - Fastest moving geometric shapes */}
      <motion.div 
        style={{ 
          y: backgroundY3,
          opacity: 0.3
        }}
        className="absolute inset-0"
      >
        <motion.div 
          className="absolute top-1/3 right-1/3 w-32 h-32 border border-primary/30 rounded-lg"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-1/5 w-24 h-24 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full"
          animate={{ 
            y: [0, -20, 0],
            x: [0, 10, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {children}
    </div>
  );
}