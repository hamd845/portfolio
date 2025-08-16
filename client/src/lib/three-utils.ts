// Utility functions for Three.js integration
// This file can be expanded with actual Three.js utilities when implementing full 3D features

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface FloatingElementConfig {
  position: Vector3;
  size: number;
  color: string;
  animationDelay: number;
  animationDuration: number;
}

export function createFloatingElement(config: FloatingElementConfig): HTMLDivElement {
  const element = document.createElement('div');
  element.className = 'animate-float';
  element.style.position = 'absolute';
  element.style.left = `${config.position.x}%`;
  element.style.top = `${config.position.y}%`;
  element.style.width = `${config.size}px`;
  element.style.height = `${config.size}px`;
  element.style.background = config.color;
  element.style.borderRadius = '50%';
  element.style.animationDelay = `${config.animationDelay}s`;
  element.style.animationDuration = `${config.animationDuration}s`;
  element.style.opacity = '0.3';
  
  return element;
}

export function generateRandomVector3(
  xRange: [number, number] = [0, 100],
  yRange: [number, number] = [0, 100],
  zRange: [number, number] = [0, 100]
): Vector3 {
  return {
    x: Math.random() * (xRange[1] - xRange[0]) + xRange[0],
    y: Math.random() * (yRange[1] - yRange[0]) + yRange[0],
    z: Math.random() * (zRange[1] - zRange[0]) + zRange[0],
  };
}

export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}
