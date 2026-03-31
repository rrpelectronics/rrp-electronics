// hooks/useParallax.js
import { useEffect, useRef } from 'react';

export const useParallax = (speed = 1) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const updateParallax = ({ scroll }) => {
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scroll;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Check if element is in viewport
      if (rect.bottom >= 0 && rect.top <= windowHeight) {
        const progress = (scroll - elementTop + windowHeight) / (windowHeight + elementHeight);
        const yPos = (progress - 0.5) * speed * 100;
        element.style.transform = `translateY(${yPos}px)`;
      }
    };

    const initParallax = () => {
      if (window.lenis) {
        window.lenis.on('scroll', updateParallax);
      } else {
        // Fallback to native scroll
        const handleScroll = () => {
          updateParallax({ scroll: window.pageYOffset });
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }
    };

    const cleanup = initParallax();

    return () => {
      if (window.lenis) {
        window.lenis.off('scroll', updateParallax);
      }
      if (cleanup) cleanup();
    };
  }, [speed]);

  return elementRef;
};
