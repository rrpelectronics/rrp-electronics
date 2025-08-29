"use client";
import { ReactLenis } from "lenis/react";
import { useState, useEffect, useRef } from "react";
import { HeaderHeightProvider } from "@/app/context/HeaderHeightContext";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { FooterProvider } from "@/app/context/FooterContext";

export default function ClientLayout({ children }) {
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);

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

  return (
    <ReactLenis root>
      <FooterProvider>
        <Header ref={headerRef} />
        <HeaderHeightProvider height={headerHeight}>
          {children}
        </HeaderHeightProvider>
        <Footer />
      </FooterProvider>
    </ReactLenis>
  );
}
