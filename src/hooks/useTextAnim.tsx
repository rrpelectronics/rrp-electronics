"use client"
import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Custom hook for text animation using GSAP
 * @param {Object} options - Animation configuration options
 * @param {string} options.selector - CSS selector for elements to animate (default: "[data-animate-text]")
 * @param {string} options.splitType - SplitText type: "lines", "words", or "chars" (default: "lines")
 * @param {number} options.opacity - Starting opacity (default: 0)
 * @param {number} options.y - Starting Y position (default: 10)
 * @param {number} options.duration - Animation duration in seconds (default: 0.8)
 * @param {number} options.stagger - Stagger delay between elements (default: 0.2)
 * @param {string} options.ease - GSAP easing function (default: "power2.out")
 * @param {string} options.triggerStart - ScrollTrigger start position (default: "top 90%")
 * @param {boolean} options.once - Whether animation should run only once (default: true)
 * @returns {Object} - Returns containerRef to attach to parent element
 */
interface TextAnimOptions {
  selector?: string;
  splitType?: "lines" | "words" | "chars";
  opacity?: number;
  y?: number;
  duration?: number;
  stagger?: number;
  ease?: string;
  triggerStart?: string;
  once?: boolean;
}

export const useTextAnim = (options: TextAnimOptions = {}) => {
  const {
    selector = "[data-animate-text]",
    splitType = "lines",
    opacity = 0,
    y = 20,
    duration = 0.8,
    stagger = 0.2,
    ease = "power2.out",
    triggerStart = "top 84%",
    once = true,
  } = options;

  const containerRef = useRef<any>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      // Find elements to animate
      const elements = container.querySelectorAll(selector);
      if (elements.length === 0) return;

      elements.forEach((el) => {
        // Skip hidden or empty elements
        if (!el.textContent || el.textContent.trim() === "") return;

        // Split text
        const split = new SplitText(el, { type: splitType });
        const splitElements = split[splitType] as HTMLElement[];

        // Safety check: if split failed, don't animate
        if (!splitElements || splitElements.length === 0) return;

        // Set overflow hidden for lines
        if (splitType === "lines") {
          gsap.set(splitElements, { overflow: "hidden" });
        }

        // Animate
        gsap.fromTo(
          splitElements,
          { opacity, y },
          {
            opacity: 1,
            y: 0,
            duration,
            stagger,
            ease,
            scrollTrigger: {
              trigger: el,
              start: triggerStart,
              once,
            },
          }
        );
      });

      // Refresh ScrollTrigger after a delay to ensure layout is ready
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    },
    {
      scope: containerRef,
      dependencies: [pathname, selector, splitType, opacity, y, duration, stagger, ease, triggerStart, once],
      revertOnUpdate: true,
    }
  );

  return { containerRef };
};

// Alternative hook with predefined animation presets
export const useTextAnimPresets = (preset = "default") => {
  const presets = {
    default: {
      splitType: "lines",
      opacity: 0,
      y: 10,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
      triggerStart: "top 90%",
      once: true,
    },
    fadeUp: {
      splitType: "lines",
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
      triggerStart: "top 85%",
      once: true,
    },
    slideIn: {
      splitType: "words",
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.05,
      ease: "back.out(1.7)",
      triggerStart: "top 80%",
      once: true,
    },
    typewriter: {
      splitType: "chars",
      opacity: 0,
      y: 0,
      duration: 0.05,
      stagger: 0.02,
      ease: "none",
      triggerStart: "top 90%",
      once: true,
    },
  };

  return useTextAnim(presets[preset] || presets.default);
};
