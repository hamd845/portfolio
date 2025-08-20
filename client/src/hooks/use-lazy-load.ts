import { useState, useEffect, useRef } from 'react';

interface UseLazyLoadOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useLazyLoad(options: UseLazyLoadOptions = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // If Intersection Observer is not supported, load immediately
    if (!window.IntersectionObserver) {
      setIsVisible(true);
      setHasLoaded(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true);
          setHasLoaded(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '50px'
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [hasLoaded, options.threshold, options.rootMargin]);

  return { isVisible, hasLoaded, elementRef };
}

// Hook for lazy loading images with progressive enhancement
export function useLazyImage(src: string, options: UseLazyLoadOptions = {}) {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { isVisible, elementRef } = useLazyLoad(options);

  useEffect(() => {
    if (isVisible && src && !imageLoaded && !imageError) {
      const img = new Image();
      
      img.onload = () => {
        setImageSrc(src);
        setImageLoaded(true);
      };
      
      img.onerror = () => {
        setImageError(true);
      };
      
      img.src = src;
    }
  }, [isVisible, src, imageLoaded, imageError]);

  return {
    imageSrc,
    imageLoaded,
    imageError,
    elementRef,
    isVisible
  };
}

// Hook for WebGL feature detection and optimization
export function useWebGLOptimization() {
  const [webglSupported, setWebglSupported] = useState(true);
  const [webglContext, setWebglContext] = useState<WebGLRenderingContext | null>(null);
  const [performanceLevel, setPerformanceLevel] = useState<'high' | 'medium' | 'low'>('high');

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) {
      setWebglSupported(false);
      return;
    }

    const webglContext = gl as WebGLRenderingContext;
    setWebglContext(webglContext);

    // Basic performance detection
    const renderer = webglContext.getParameter(webglContext.RENDERER) as string;
    const vendor = webglContext.getParameter(webglContext.VENDOR) as string;
    
    // Simple heuristic for performance level
    if (renderer && renderer.toLowerCase().includes('intel')) {
      setPerformanceLevel('medium');
    } else if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
      setPerformanceLevel('low');
    }

    // Check for WebGL extensions that might indicate better performance
    const extensions = webglContext.getSupportedExtensions();
    if (extensions && extensions.includes('WEBGL_draw_buffers')) {
      setPerformanceLevel('high');
    }

  }, []);

  return {
    webglSupported,
    webglContext,
    performanceLevel,
    optimizationSettings: {
      antialias: performanceLevel === 'high',
      shadows: performanceLevel !== 'low',
      maxPixelRatio: performanceLevel === 'high' ? 2 : 1,
      particleCount: performanceLevel === 'high' ? 100 : performanceLevel === 'medium' ? 50 : 20
    }
  };
}