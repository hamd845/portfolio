import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ParallaxWrapperProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export default function ParallaxWrapper({ 
  children, 
  speed = 0.5, 
  direction = 'up',
  className = '' 
}: ParallaxWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Create smooth spring animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Different parallax transforms based on direction
  const getTransform = () => {
    const range = 100 * speed;
    switch (direction) {
      case 'up':
        return useTransform(smoothProgress, [0, 1], [range, -range]);
      case 'down':
        return useTransform(smoothProgress, [0, 1], [-range, range]);
      case 'left':
        return useTransform(smoothProgress, [0, 1], [range, -range]);
      case 'right':
        return useTransform(smoothProgress, [0, 1], [-range, range]);
      default:
        return useTransform(smoothProgress, [0, 1], [range, -range]);
    }
  };

  const transform = getTransform();

  const getMotionStyle = () => {
    if (direction === 'left' || direction === 'right') {
      return { x: transform };
    }
    return { y: transform };
  };

  return (
    <motion.div
      ref={ref}
      style={getMotionStyle()}
      className={className}
    >
      {children}
    </motion.div>
  );
}