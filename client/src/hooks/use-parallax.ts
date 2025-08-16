import { useScroll, useTransform, useSpring } from "framer-motion";
import { RefObject } from "react";

interface ParallaxOptions {
  target?: RefObject<HTMLElement>;
  offset?: any;
  yRange?: [string, string];
  stiffness?: number;
  damping?: number;
}

export function useParallax({
  target,
  offset = ["start end", "end start"],
  yRange = ["0%", "50%"],
  stiffness = 100,
  damping = 30
}: ParallaxOptions = {}) {
  const { scrollYProgress } = useScroll({
    target,
    offset
  });

  const springConfig = { stiffness, damping, restDelta: 0.001 };
  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], yRange),
    springConfig
  );

  return { y, scrollYProgress };
}