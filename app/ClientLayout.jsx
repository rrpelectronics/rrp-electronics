"use client";
import React, { useEffect, useRef } from "react";
import { ReactLenis } from "lenis/react";
import FloatingNavbar from "@/app/components/FloatingNavbar";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { FooterProvider } from "@/app/context/FooterContext";
import { gsap } from "gsap";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function ClientLayout({ children }) {
  const headerRef = useRef(null);
  const navbarRef = useRef(null);
  const footerRef = useRef(null);
  const logoRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);

    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (navbarRef.current && footerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          // Get all elements from the navbar ref
          const elements = navbarRef.current.elements || [];

          if (entry.isIntersecting) {
            // Footer is visible → hide navbar elements
            elements.forEach((element) => {
              if (element) {
                gsap.to(element, {
                  y: 100,
                  opacity: 0,
                  duration: 0.3,
                  ease: "power2.inOut",
                  onStart: () => {
                    element.style.pointerEvents = "none"; // prevent clicks while hidden
                  },
                });
              }
            });
          } else {
            // Footer is NOT visible → show navbar elements again
            elements.forEach((element) => {
              if (element) {
                gsap.to(element, {
                  y: 0,
                  opacity: 1,
                  duration: 0.3,
                  ease: "power2.inOut",
                  onStart: () => {
                    element.style.display = "block"; // or "flex" depending on your navbar
                    element.style.pointerEvents = "auto";
                  },
                });
              }
            });
          }
        },
        {
          threshold: 0.1, // Trigger when 10% of the footer is visible
          rootMargin: "0px 0px -50px 0px", // Add some margin for better timing
        }
      );

      observer.observe(footerRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, []);

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


  return (
    <ReactLenis root>
      <FooterProvider>
        {(
          pathname === "/" ||
          pathname === "/about" ||
          pathname === "/our-journey" ||
          pathname === "/leadership" ||
          pathname === "/solutions" ||
          pathname === "/projects" ||
          pathname === "/compliances" ||
          pathname === "/logistics" ||
          pathname === "/traceability" ||
          pathname === "/careers" 
        ) && (
          <div
            ref={logoRef}
            className="z-60 will-change-transform fixed top-0 left-0 w-full h-fit py-3.5 md:py-5 lg:py-10 px-3.5 md:px-5 lg:px-10"
          >
            <Link
              href={"/"}
              className="aspect-[240/26] w-21.5 h-7 lg:w-36 lg:h-12.5 flex flex-col gap-y-1"
            >
              <img
                src="/images/common/rrp-logo.png"
                alt="RRP Electronics"
                className="object-contain object-center h-full w-auto"
              />
              <img
                src="/images/common/rrp-logo-text.png"
                alt="RRP Electronics"
                className="object-contain object-center h-full w-auto mix-blend-difference"
              />
            </Link>
          </div>
        )}
        {(pathname === "/news-events" ||
          pathname.startsWith("/careers/") ||
          pathname === "/contact-us" ||
          pathname === "/sitemap") && <Header ref={headerRef} />}
        <FloatingNavbar ref={navbarRef} />
          {children}
        <Footer ref={footerRef} />
      </FooterProvider>
    </ReactLenis>
  );
}
