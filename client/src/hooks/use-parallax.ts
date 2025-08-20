import { useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { RefObject } from 'react';

interface ParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  range?: [number, number];
  smooth?: boolean;
}

export function useParallax(
  ref: RefObject<HTMLElement>,
  options: ParallaxOptions = {}
) {
  const {
    speed = 0.5,
    direction = 'up',
    range = [0, 1],
    smooth = true
  } = options;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const progress = smooth 
    ? useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
      })
    : scrollYProgress;

  const getTransformRange = (): [number, number] => {
    const baseRange = 100 * speed;
    switch (direction) {
      case 'up':
        return [baseRange, -baseRange];
      case 'down':
        return [-baseRange, baseRange];
      case 'left':
        return [baseRange, -baseRange];
      case 'right':
        return [-baseRange, baseRange];
      default:
        return [baseRange, -baseRange];
    }
  };

  const transformRange = getTransformRange();
  const transform = useTransform(progress, range, transformRange);

  return {
    scrollYProgress: progress,
    transform,
    y: direction === 'up' || direction === 'down' ? transform : 0,
    x: direction === 'left' || direction === 'right' ? transform : 0,
  };
}

export function useMultiLayerParallax() {
  const { scrollYProgress } = useScroll();
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return {
    layer1: useTransform(smoothProgress, [0, 1], ["0%", "20%"]),
    layer2: useTransform(smoothProgress, [0, 1], ["0%", "40%"]),
    layer3: useTransform(smoothProgress, [0, 1], ["0%", "60%"]),
    layer4: useTransform(smoothProgress, [0, 1], ["0%", "80%"]),
    opacity1: useTransform(smoothProgress, [0, 0.5, 1], [1, 0.8, 0.3]),
    opacity2: useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.8, 1, 0.6, 0.2]),
    scale: useTransform(smoothProgress, [0, 1], [1, 1.2]),
    scrollYProgress: smoothProgress
  };
}