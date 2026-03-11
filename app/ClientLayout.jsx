"use client";
import React, { useEffect, useRef, useState } from "react";
import { ReactLenis } from "lenis/react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { FooterProvider } from "@/app/context/FooterContext";
import { gsap } from "gsap";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Popup from "@/app/components/Popup";
import { HeaderHeightProvider } from "@/app/context/HeaderHeightContext";

export default function ClientLayout({ children }) {
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const navbarRef = useRef(null);
  const footerRef = useRef(null);
  const logoRef = useRef(null);
  const pathname = usePathname();
  const [showPopup, setShowPopup] = useState(false);
  const popupShownRef = useRef(false);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);

    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (!popupShownRef.current) {
      const popupTimer = setTimeout(() => {
        setShowPopup(true);
        popupShownRef.current = true;
      }, 0);
      return () => clearTimeout(popupTimer);
    }
  }, []);

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    if (!logoRef.current) return;

    const ctx = gsap.context(() => {
      const logoEl = logoRef.current;

      const logo_tl = gsap.timeline({
        scrollTrigger: {
          trigger: logoEl,
          start: `${window.innerHeight} ${logoEl.offsetHeight}`,
          end: `${window.innerHeight} 0%`,
          scrub: true,
        },
      });

      logo_tl
        .to(
          logoEl,
          {
            opacity: 0,
            ease: "power2.inOut",
          },
          "a"
        )
        .to(
          logoEl,
          {
            display: "none",
            duration: 0,
          },
          "b"
        );
    });

    return () => ctx.revert();
  }, [pathname]);

  useEffect(() => {
    if (!headerRef.current) return;

    const updateHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });

    resizeObserver.observe(headerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <ReactLenis root>
      <FooterProvider>
        <HeaderHeightProvider height={headerHeight}>
          <Header ref={headerRef} />
          {children}
          <Footer ref={footerRef} />
        </HeaderHeightProvider>
      </FooterProvider>
    </ReactLenis>
  );
}
