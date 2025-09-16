"use client";
import React, { useState, useEffect, useRef, useImperativeHandle } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import UseScreenSizeSmall from "@/app/hooks/UseScreenSizeSmall";

const FloatingNavbar = React.forwardRef((props, ref) => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const pathname = usePathname();
  const isMobile = UseScreenSizeSmall();
  const hideTimeoutRef = useRef(null);

  const companySubmenuRef = useRef(null);
  const operationsSubmenuRef = useRef(null);
  const extrasSubmenuRef = useRef(null);
  const headerRef = useRef(null);

  useImperativeHandle(ref, () => ({
    elements: [
      companySubmenuRef.current,
      operationsSubmenuRef.current,
      extrasSubmenuRef.current,
      headerRef.current,
    ].filter(Boolean),
  }));

  useEffect(() => {
    const allSubmenuPages = [
      ...companyPages,
      ...operationsPages,
      ...extrasPages,
    ];
    if (!allSubmenuPages.includes(pathname)) {
      setActiveSubmenu(null);
    }
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const elements = [
        companySubmenuRef.current,
        operationsSubmenuRef.current,
        extrasSubmenuRef.current,
        headerRef.current,
      ];

      const isOutside = elements.every(
        (el) => el && !el.contains(event.target)
      );

      if (isOutside) {
        setActiveSubmenu(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const companyPages = ["/about", "/our-journey", "/leadership"];
  const operationsPages = ["/compliances", "/logistics", "/traceability"];
  const extrasPages = ["/projects", "/careers", "/news-events", "/contact-us"];

  const isCompanyActive = companyPages.includes(pathname);
  const isOperationsActive = operationsPages.includes(pathname);
  const isSolutionsActive = pathname === "/solutions";
  const isHomeActive = pathname === "/";
  const isExtrasActive = extrasPages.includes(pathname);

  const handleMouseEnter = (submenuName) => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    setActiveSubmenu(submenuName);
  };

  const handleMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setActiveSubmenu(null);
    }, 150); // 300ms delay before closing submenu
  };

  const handleSubmenuLinkClick = () => {
    setTimeout(() => {
      setActiveSubmenu(null);
    }, 50);
  };

  return (
    <>
      {/* Company Submenu */}
      <ul
        ref={companySubmenuRef}
        style={{
          bottom: isMobile
            ? "calc(28px + 52.6px + 8px)"
            : "calc(40px + 65.6px + 12px)",
          clipPath:
            activeSubmenu === "company"
              ? "inset(0% 0% 0% 0%)"
              : "inset(100% 0% 0% 0%)",
          transition: "clip-path 0.3s ease-in-out",
        }}
        className="rounded-3xl w-[352.66px] sm:w-[449.66px] z-[50] fixed left-1/2 -translate-x-1/2 flex flex-col px-4 sm:px-6 gap-4 py-4 sm:py-5 bg-darkBg/70 backdrop-blur-[4px] border border-white/16"
        onMouseEnter={() => handleMouseEnter("company")}
        onMouseLeave={handleMouseLeave}
      >
        <li>
          <Link
            href="/about"
            onClick={handleSubmenuLinkClick}
            className={`leading-[100%] font-neueMontreal text-sm sm:text-[16px] transition-colors duration-200 hover:text-primary ${
              pathname === "/about" ? "text-primary" : "text-white"
            }`}
          >
            About Us
          </Link>
        </li>
        <li>
          <Link
            href="/our-journey"
            onClick={handleSubmenuLinkClick}
            className={`leading-[100%] font-neueMontreal text-sm sm:text-[16px] transition-colors duration-200 hover:text-primary ${
              pathname === "/our-journey" ? "text-primary" : "text-white"
            }`}
          >
            Our Journey
          </Link>
        </li>
        <li>
          <Link
            href="/leadership"
            onClick={handleSubmenuLinkClick}
            className={`leading-[100%] font-neueMontreal text-sm sm:text-[16px] transition-colors duration-200 hover:text-primary ${
              pathname === "/leadership" ? "text-primary" : "text-white"
            }`}
          >
            Leadership
          </Link>
        </li>
      </ul>

      {/* Operations Submenu */}
      <ul
        ref={operationsSubmenuRef}
        style={{
          bottom: isMobile
            ? "calc(28px + 52.6px + 8px)"
            : "calc(40px + 65.6px + 12px)",
          clipPath:
            activeSubmenu === "operations"
              ? "inset(0% 0% 0% 0%)"
              : "inset(100% 0% 0% 0%)",
          transition: "clip-path 0.3s ease-in-out",
        }}
        className="rounded-3xl w-[352.66px] sm:w-[449.66px] z-[50] fixed left-1/2 -translate-x-1/2 flex flex-col px-4 sm:px-6 gap-4 py-4 sm:py-5 bg-darkBg/70 backdrop-blur-[4px] border border-white/16"
        onMouseEnter={() => handleMouseEnter("operations")}
        onMouseLeave={handleMouseLeave}
      >
        <li>
          <Link
            href="/compliances"
            onClick={handleSubmenuLinkClick}
            className={`leading-[100%] font-neueMontreal text-sm sm:text-[16px] transition-colors duration-200 hover:text-primary ${
              pathname === "/compliances" ? "text-primary" : "text-white"
            }`}
          >
            Quality Standards & Compliances
          </Link>
        </li>
        <li>
          <Link
            href="/logistics"
            onClick={handleSubmenuLinkClick}
            className={`leading-[100%] font-neueMontreal text-sm sm:text-[16px] transition-colors duration-200 hover:text-primary ${
              pathname === "/logistics" ? "text-primary" : "text-white"
            }`}
          >
            Supply Chain & Logistics
          </Link>
        </li>
        <li>
          <Link
            href="/traceability"
            onClick={handleSubmenuLinkClick}
            className={`leading-[100%] font-neueMontreal text-sm sm:text-[16px] transition-colors duration-200 hover:text-primary ${
              pathname === "/traceability" ? "text-primary" : "text-white"
            }`}
          >
            Traceability
          </Link>
        </li>
      </ul>

      {/* Extras Submenu */}
      <ul
        ref={extrasSubmenuRef}
        style={{
          bottom: isMobile
            ? "calc(28px + 52.6px + 8px)"
            : "calc(40px + 65.6px + 12px)",
          clipPath:
            activeSubmenu === "extras"
              ? "inset(0% 0% 0% 0%)"
              : "inset(100% 0% 0% 0%)",
          transition: "clip-path 0.3s ease-in-out",
        }}
        className="rounded-3xl w-[352.66px] sm:w-[449.66px] z-[50] fixed left-1/2 -translate-x-1/2 flex flex-col px-4 sm:px-6 gap-4 py-4 sm:py-5 bg-darkBg/70 backdrop-blur-[4px] border border-white/16"
        onMouseEnter={() => handleMouseEnter("extras")}
        onMouseLeave={handleMouseLeave}
      >
        <li>
          <Link
            href="/projects"
            onClick={handleSubmenuLinkClick}
            className={`leading-[100%] font-neueMontreal text-sm sm:text-[16px] transition-colors duration-200 hover:text-primary ${
              pathname === "/projects" ? "text-primary" : "text-white"
            }`}
          >
            Projects
          </Link>
        </li>
        <li>
          <Link
            href="/careers"
            onClick={handleSubmenuLinkClick}
            className={`leading-[100%] font-neueMontreal text-sm sm:text-[16px] transition-colors duration-200 hover:text-primary ${
              pathname === "/careers" ? "text-primary" : "text-white"
            }`}
          >
            Careers
          </Link>
        </li>
        <li>
          <Link
            href="/news-events"
            onClick={handleSubmenuLinkClick}
            className={`leading-[100%] font-neueMontreal text-sm sm:text-[16px] transition-colors duration-200 hover:text-primary ${
              pathname === "/news-events" ? "text-primary" : "text-white"
            }`}
          >
            News & Events
          </Link>
        </li>
        <li>
          <Link
            href="/contact-us"
            onClick={handleSubmenuLinkClick}
            className={`leading-[100%] font-neueMontreal text-sm sm:text-[16px] transition-colors duration-200 hover:text-primary ${
              pathname === "/contact-us" ? "text-primary" : "text-white"
            }`}
          >
            Contact Us
          </Link>
        </li>
      </ul>

      <header
        ref={headerRef}
        className="flex flex-col w-fit z-60 fixed left-1/2 -translate-x-1/2 bottom-7 sm:bottom-10"
      >
        <nav className="overflow-hidden w-fit flex items-center bg-darkBg/70 border border-white/16 backdrop-blur-[4px] rounded-full px-2.5 sm:px-4 py-3 sm:py-4">
          <ul className="flex justify-center items-center gap-x-2 sm:gap-x-3 mr-3.5 sm:mr-5">
            <li
              className={`flex justify-center items-center px-2 sm:px-3 py-1.5 sm:py-2 rounded-full transition-colors duration-200 ${
                isHomeActive ? "bg-primary text-white" : "text-white"
              }`}
            >
              <Link
                href="/"
                className={`text-sm sm:text-[16px] leading-[100%] transition-colors duration-200 font-neueMontreal ${
                  !isHomeActive ? "hover:text-primary" : ""
                }`}
              >
                Home
              </Link>
            </li>

            <li
              onMouseEnter={() => handleMouseEnter("company")}
              onMouseLeave={handleMouseLeave}
              className={`px-2 sm:px-3 py-1.5 sm:py-2 cursor-pointer rounded-full transition-colors duration-200 font-neueMontreal ${
                isCompanyActive
                  ? "bg-primary text-white"
                  : activeSubmenu === "company"
                  ? "text-primary"
                  : "text-white hover:text-primary"
              }`}
            >
              <p className="text-sm sm:text-[16px] leading-[100%]">Company</p>
            </li>

            <li
              className={`flex justify-center items-center px-2 sm:px-3 py-1.5 sm:py-2 rounded-full transition-colors duration-200 font-neueMontreal ${
                isSolutionsActive ? "bg-primary text-white" : "text-white"
              }`}
            >
              <Link
                href="/solutions"
                className={`text-sm sm:text-[16px] leading-[100%] transition-colors duration-200 ${
                  !isSolutionsActive ? "hover:text-primary" : ""
                }`}
              >
                Solutions
              </Link>
            </li>

            <li
              onMouseEnter={() => handleMouseEnter("operations")}
              onMouseLeave={handleMouseLeave}
              className={`px-2 sm:px-3 py-1.5 sm:py-2 cursor-pointer rounded-full transition-colors duration-200 font-neueMontreal ${
                isOperationsActive
                  ? "bg-primary text-white"
                  : activeSubmenu === "operations"
                  ? "text-primary"
                  : "text-white hover:text-primary"
              }`}
            >
              <p className="text-sm sm:text-[16px] leading-[100%]">
                Operations
              </p>
            </li>
          </ul>

          <li
            onMouseEnter={() => handleMouseEnter("extras")}
            onMouseLeave={handleMouseLeave}
            className="relative overflow-hidden h-3 w-3 sm:h-4 sm:w-4 cursor-pointer flex-1 flex items-center"
          >
            <Image
              src="/images/icons/header-menu.svg"
              alt="Header Menu"
              fill
              sizes="16px"
              className={`h-3 sm:h-4 w-3 sm:w-4 transition-transform duration-300 ${
                activeSubmenu === "extras" ? "-rotate-45" : ""
              }`}
            />
          </li>
        </nav>
      </header>
    </>
  );
});

FloatingNavbar.displayName = "FloatingNavbar";

export default FloatingNavbar;
