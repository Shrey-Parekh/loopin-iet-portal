
import { useEffect, useRef } from 'react';

export const useScrollAnimation = (threshold: number = 0.1) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      { threshold }
    );

    const element = elementRef.current;
    if (element) {
      element.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700');
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold]);

  return elementRef;
};
