import { useEffect, useRef } from 'react';

interface ScrollEffectsOptions {
  threshold?: number;
  rootMargin?: string;
  effectClass?: string;
}

export function useScrollEffects(options: ScrollEffectsOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -100px 0px',
    effectClass = 'scroll-effect-fade'
  } = options;

  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Add initial effect class
    element.classList.add(effectClass);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, effectClass]);

  return elementRef;
}

// Hook for multiple elements with staggered animations
export function useStaggeredScrollEffects(
  selector: string,
  options: ScrollEffectsOptions & { staggerDelay?: number } = {}
) {
  const containerRef = useRef<HTMLElement>(null);
  const { staggerDelay = 100, ...scrollOptions } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(selector);
    
    elements.forEach((element, index) => {
      element.classList.add(scrollOptions.effectClass || 'scroll-effect-fade');
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                entry.target.classList.add('visible');
              }, index * staggerDelay);
            }
          });
        },
        {
          threshold: scrollOptions.threshold || 0.1,
          rootMargin: scrollOptions.rootMargin || '0px 0px -50px 0px'
        }
      );

      observer.observe(element);
    });

    return () => {
      elements.forEach((element) => {
        const observer = new IntersectionObserver(() => {});
        observer.unobserve(element);
      });
    };
  }, [selector, staggerDelay, scrollOptions]);

  return containerRef;
}