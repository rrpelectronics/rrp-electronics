"use client";
import React, { forwardRef, memo, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useLockBodyScroll from "@/hooks/useLockBodyScroll";

const navItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Our Journey", href: "/our-journey" },
      { name: "Leadership", href: "/leadership" },
      { name: "Solutions", href: "/solutions" },
    ],
  },
  {
    title: "Operations",
    links: [
      { name: "Quality Standards & Compliances", href: "/compliances" },
      { name: "Supply Chain & Logistics", href: "/logistics" },
      { name: "Traceability", href: "/traceability" },
    ],
  },
  {
    title: "Newsroom",
    links: [
      { name: "News", href: "/news" },
      { name: "Events", href: "/events" },
      { name: "Newsletters", href: "/documents/rrp_newsletter.pdf", target: "_blank" },
    ],
  },
  {
    title: "Careers",
    href: "/careers",
  },
];

const Header = forwardRef((props, ref) => {
  const pathname = usePathname();
  const router = useRouter();

  // Desktop Global Menu State
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);
  const timeoutRef = useRef(null);

  // Mobile Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileAccordionIndex, setMobileAccordionIndex] = useState(null);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setMobileAccordionIndex(null);
  }, [pathname]);

  useLockBodyScroll(isMobileMenuOpen);

  const handleMouseEnter = (index) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMenuIndex(index);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenuIndex(null);
    }, 300); // 300ms delay to let the user visit the submenu smoothly
  };

  const handleLinkClick = (e, href, target) => {
    setActiveMenuIndex(null); // Close the submenu on click
    if (target === "_blank") {
      return;
    }
    if (href) {
      e.preventDefault();
      setTimeout(() => {
        setIsMobileMenuOpen(false);
        router.push(href);
      }, 300); // reduced slightly so mobile menu closing feels snappy
    }
  };

  const isItemActive = (item) => {
    if (item.href && pathname === item.href) return true;
    if (item.links && item.links.some((link) => pathname === link.href)) return true;
    return false;
  };

  const toggleMobileAccordion = (index) => {
    setMobileAccordionIndex(mobileAccordionIndex === index ? null : index);
  };

  return (
    <>
      {/* Black transparent overlay for mobile menu */}
      <div
        onClick={() => setIsMobileMenuOpen(false)}
        className={`fixed inset-0 bg-black/50 z-[65] transition-opacity duration-300 min-[1152px]:hidden ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Mobile Drawer (Max 512px, slides from right) */}
      <div
        className={`fixed top-0 right-0 h-screen w-full max-w-[512px] bg-white z-90 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] shadow-[-10px_0_40px_rgba(0,0,0,0.1)] min-[1152px]:hidden flex flex-col py-5 md:py-6 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="absolute flex justify-end items-center px-3.5 md:px-5 lg:px-10 mb-10 w-fit right-0 top-7 md:top-8">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="sm:h-8 sm:w-8 w-7.5 h-7.5 flex justify-center items-center rounded-full"
          >
            <img src="/images/icons/close-button.svg" alt="Close Menu" className="h-full w-full" />
          </button>
        </div>

        <ul className="flex flex-col w-full h-full">
          {navItems.map((item, index) => {
            const active = isItemActive(item);

            if (!item.links) {
              return (
                <li key={index} className="w-full px-3.5 md:px-5 lg:px-10">
                  <Link
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className={`flex py-4 w-full text-bodyBase font-neueMontreal transition-colors duration-300 leading-[100%] ${active ? "text-primary" : "text-black"}`}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            }

            const isAccordionOpen = mobileAccordionIndex === index;

            return (
              <li key={index} className="w-full px-3.5 md:px-5 lg:px-10 flex flex-col">
                <button
                  onClick={() => toggleMobileAccordion(index)}
                  className={`flex justify-between items-center py-4 w-full text-bodyBase font-neueMontreal transition-colors duration-300 leading-[100%] ${active ? "text-primary" : "text-black"}`}
                >
                  {item.title}
                  <img
                    src="/images/icons/keyboard_arrow_down.svg"
                    alt={`${item.title} Submenu`}
                    className={`h-8 w-8 ${isAccordionOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Mobile Submenu Accordion */}
                <div
                  className={`flex flex-col w-full overflow-hidden transition-all duration-500 ease-in-out`}
                  style={{ maxHeight: isAccordionOpen ? `${item.links.length * 80}px` : "0px" }}
                >
                  <ul className="flex flex-col px-3.5 md:px-5 py-2 gap-y-4">
                    {item.links.map((link, lIndex) => {
                      const linkActive = pathname === link.href;
                      return (
                        <li key={lIndex}>
                          <Link
                            href={link.href}
                            target={link.target}
                            onClick={(e) => handleLinkClick(e, link.href, link.target)}
                            className={`text-bodyBase font-neueMontreal transition-colors duration-300 ${linkActive ? "text-primary flex border-l-2 border-primary pl-3" : "text-black"}`}
                          >
                            {link.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <header
        ref={ref}
        className={`@container fixed top-0 left-0 w-full h-fit z-60 py-4.5 lg:py-6 px-3.5 md:px-5 lg:px-10 bg-white shadow-sm`}
      >
        <nav className="flex justify-between items-center h-fit w-full">
          <Link
            href={"/"}
            onClick={(e) => handleLinkClick(e, "/")}
            style={{
              width: "clamp(5.25rem, 4.37rem + 3.91vw, 7.5rem)"
            }}
            className="h-fit"
          >
            <img
              src="/images/common/rrp-logo-exceptional.png"
              alt="RRP Electronics"
              className="object-contain object-center w-full h-auto"
            />
          </Link>

          {/* Desktop UL */}
          <ul
            className="justify-center items-center w-fit h-full gap-x-8 hidden min-[1152px]:flex"
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
            }}
          >
            {navItems.map((item, index) => {
              const active = isItemActive(item);

              if (!item.links) {
                return (
                  <li key={index} onMouseEnter={() => handleMouseEnter(null)}>
                    <Link
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.href)}
                      className={`text-bodyBase font-neueMontreal transition-colors duration-300 cursor-pointer hover:text-primary leading-[100%] ${active ? "text-primary" : "text-black"
                        }`}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              }

              return (
                <li
                  key={index}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(index)}
                >
                  <p
                    className={`flex items-center gap-x-1.5 justify-center text-bodyBase font-neueMontreal transition-colors duration-300 cursor-pointer hover:text-primary leading-[100%] ${active || activeMenuIndex === index ? "text-primary" : "text-black"
                      }`}
                  >
                    {item.title}
                    <img
                      src="/images/icons/keyboard_arrow_down.svg"
                      alt={`${item.title} Submenu`}
                      className={`h-8 w-8 ${activeMenuIndex === index ? "rotate-180" : ""}`}
                    />
                  </p>

                  <div
                    className={`absolute top-[calc(100%+24px)] lg:top-[calc(100%+30px)] left-0 pt-6 pb-6 z-20 w-max ${activeMenuIndex === index ? "visible opacity-100" : "invisible opacity-0"} pointer-events-none`}
                  >
                    <ul className="flex flex-col gap-y-6 relative w-max pointer-events-auto">
                      {item.links.map((link, lIndex) => {
                        const linkActive = pathname === link.href;
                        return (
                          <li key={lIndex}>
                            <Link
                              href={link.href}
                              target={link.target}
                              onClick={(e) => handleLinkClick(e, link.href, link.target)}
                              className={`text-bodyBase font-neueMontreal transition-colors duration-300 cursor-pointer hover:text-primary leading-[100%] ${linkActive ? "text-primary" : "text-black"
                                }`}
                            >
                              {link.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </li>
              );
            })}

            {/* Global Constant Background exactly matched to whichever submenu is open */}
            <div
              className={`absolute top-[calc(100%+24px)] lg:top-[calc(100%)] left-1/2 -translate-x-1/2 w-[200vw] bg-white border-t border-gray-200 shadow-md -z-10 ease-in-out ${activeMenuIndex !== null && navItems[activeMenuIndex]?.links ? 'h-[250px] opacity-100 visible' : 'h-[250px] opacity-0 invisible'}`}
              style={{
                height: activeMenuIndex !== null && navItems[activeMenuIndex]?.links ? (navItems[activeMenuIndex].links.length * 48 + 30) + 'px' : '0px'
              }}
            />
          </ul>

          <div className="flex justify-center items-center w-fit gap-x-4">
            <Link
              href="/contact-us"
              onClick={(e) => handleLinkClick(e, "/contact-us")}
              className="flex relative z-50 px-3.5 py-2.5 lg:px-4 lg:py-3 w-fit items-center justify-center rounded-full text-bodySmall leading-[120%] font-neueMontreal border-1 cursor-pointer transition-colors text-primary border-primary hover:bg-primary hover:text-white bg-white"
            >
              Contact Us
            </Link>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="h-8 w-8 flex justify-center items-center min-[1152px]:hidden cursor-pointer"
            >
              <img src="/images/icons/menu_open.svg" alt="Menu Open" className="h-8 w-8" />
            </button>
          </div>
        </nav>
      </header>
    </>
  );
});

export default memo(Header);
