import { useEffect, useRef } from 'react';

export const useScrollAnimation = <T extends HTMLElement = HTMLElement>(threshold: number = 0.1, animationClass: string = 'animate-fade-in-up') => {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(animationClass);
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
  }, [threshold, animationClass]);

  return elementRef;
};
