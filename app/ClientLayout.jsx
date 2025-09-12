"use client";
import { ReactLenis } from "lenis/react";
import { useState, useEffect, useRef } from "react";
import { HeaderHeightProvider } from "@/app/context/HeaderHeightContext";
import FloatingNavbar from "@/app/components/FloatingNavbar";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { FooterProvider } from "@/app/context/FooterContext";
import { gsap } from "gsap";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }) {
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);
  const navbarRef = useRef(null);
  const footerRef = useRef(null);
  const pathname = usePathname()

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const newHeight = headerRef.current.offsetHeight;
        setHeaderHeight(newHeight);
      }
    };

    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);

    const observer = new MutationObserver(updateHeaderHeight);
    if (headerRef.current) {
      observer.observe(headerRef.current, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    }

    return () => {
      window.removeEventListener("resize", updateHeaderHeight);
      observer.disconnect();
    };
  }, []);

  // Force scroll to top on page load/refresh
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);

    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // GSAP animation for FloatingNavbar based on footer visibility
  useEffect(() => {
    if (navbarRef.current && footerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // Footer is visible, hide navbar
            gsap.to(navbarRef.current, {
              opacity: 0,
              duration: 0.2,
              backdropFilter: "blur(4px)",
              onComplete: () => {
                navbarRef.current.style.display = "none";
              },
            });
          } else {
            // Footer is not visible, show navbar
            gsap.set(navbarRef.current, { display: "flex" }); // Ensure display is reset
            gsap.to(navbarRef.current, {
              backdropFilter: "blur(4px)",
              opacity: 1,
              duration: 0.2,
            });
          }
        },
        {
          threshold: 0.1, // Trigger when 10% of the footer is visible
        }
      );

      observer.observe(footerRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return (
    <ReactLenis root>
      <FooterProvider>
        {(pathname === "/news-events" ||
          pathname.startsWith("/careers/") ||
          pathname === "/contact-us") && <Header ref={headerRef} />}
        <FloatingNavbar ref={navbarRef} />
        <HeaderHeightProvider height={headerHeight}>
          {children}
        </HeaderHeightProvider>
        <Footer ref={footerRef} />
      </FooterProvider>
    </ReactLenis>
  );
}
