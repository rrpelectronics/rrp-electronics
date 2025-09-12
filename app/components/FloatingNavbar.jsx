"use client";
import React, { useState, useEffect, useRef, useImperativeHandle } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import UseScreenSizeSmall from "../hooks/UseScreenSizeSmall";

const FloatingNavbar = React.forwardRef((props, ref) => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const pathname = usePathname();
  const isMobile = UseScreenSizeSmall();

  // Individual refs for each element
  const companySubmenuRef = useRef(null);
  const operationsSubmenuRef = useRef(null);
  const extrasSubmenuRef = useRef(null);
  const headerRef = useRef(null);

  // Expose all refs to parent component
  useImperativeHandle(ref, () => ({
    elements: [
      companySubmenuRef.current,
      operationsSubmenuRef.current,
      extrasSubmenuRef.current,
      headerRef.current,
    ].filter(Boolean), // Filter out null refs
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

  // Close submenu when clicking outside
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

  // Submenu pages
  const companyPages = ["/about", "/our-journey", "/leadership"];
  const operationsPages = ["/compliances", "/logistics", "/traceability"];
  const extrasPages = ["/projects", "/careers", "/news-events", "/contact-us"];

  const isCompanyActive = companyPages.includes(pathname);
  const isOperationsActive = operationsPages.includes(pathname);
  const isSolutionsActive = pathname === "/solutions";
  const isHomeActive = pathname === "/";
  const isExtrasActive = extrasPages.includes(pathname);

  const toggleSubmenu = (submenuName) => {
    setActiveSubmenu(activeSubmenu === submenuName ? null : submenuName);
  };

  const handleSubmenuEnter = () => {
    // Keep submenu open
  };

  const handleSubmenuLeave = () => {
    setActiveSubmenu(null);
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
        onMouseEnter={handleSubmenuEnter}
        onMouseLeave={handleSubmenuLeave}
      >
        <li>
          <Link
            href={"/about"}
            className={`leading-[100%] font-neueMontreal text-sm sm:text-[16px] transition-colors duration-200 hover:text-primary ${
              pathname === "/about" ? "text-primary" : "text-white"
            }`}
          >
            About Us
          </Link>
        </li>
        <li>
          <Link
            href={"/our-journey"}
            className={`leading-[100%] font-neueMontreal text-sm sm:text-[16px] transition-colors duration-200 hover:text-primary ${
              pathname === "/our-journey" ? "text-primary" : "text-white"
            }`}
          >
            Our Journey
          </Link>
        </li>
        <li>
          <Link
            href={"/leadership"}
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
        onMouseEnter={handleSubmenuEnter}
        onMouseLeave={handleSubmenuLeave}
      >
        <li>
          <Link
            href={"/compliances"}
            className={`leading-[100%] font-neueMontreal text-sm sm:text-[16px] transition-colors duration-200 hover:text-primary ${
              pathname === "/compliances" ? "text-primary" : "text-white"
            }`}
          >
            Quality Standards & Compliances
          </Link>
        </li>
        <li>
          <Link
            href={"/logistics"}
            className={`leading-[100%] font-neueMontreal text-sm sm:text-[16px] transition-colors duration-200 hover:text-primary ${
              pathname === "/logistics" ? "text-primary" : "text-white"
            }`}
          >
            Supply Chain & Logistics
          </Link>
        </li>
        <li>
          <Link
            href={"/traceability"}
            className={`leading-[100%] font-neueMontreal text-sm sm:text-[16px] transition-colors duration-200 hover:text-primary ${
              pathname === "/traceability" ? "text-primary" : "text-white"
            }`}
          >
            Traceability
          </Link>
        </li>
      </ul>

      {/* Extras Links on Plus Icon */}
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
      >
        <li>
          <Link
            href={"/projects"}
            className={`leading-[100%] font-neueMontreal text-sm sm:text-[16px] transition-colors duration-200 hover:text-primary ${
              pathname === "/projects" ? "text-primary" : "text-white"
            }`}
          >
            Projects
          </Link>
        </li>
        <li>
          <Link
            href={"/careers"}
            className={`leading-[100%] font-neueMontreal text-sm sm:text-[16px] transition-colors duration-200 hover:text-primary ${
              pathname === "/careers" ? "text-primary" : "text-white"
            }`}
          >
            Careers
          </Link>
        </li>
        <li>
          <Link
            href={"/news-events"}
            className={`leading-[100%] font-neueMontreal text-sm sm:text-[16px] transition-colors duration-200 hover:text-primary ${
              pathname === "/news-events" ? "text-primary" : "text-white"
            }`}
          >
            News Events
          </Link>
        </li>
        <li>
          <Link
            href={"/contact-us"}
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
        className="flex flex-col w-fit z-50 fixed left-1/2 -translate-x-1/2 bottom-7 sm:bottom-10"
      >
        <nav className="overflow-hidden w-fit flex items-center bg-darkBg/70 border border-white/16 backdrop-blur-[4px] rounded-full px-2.5 sm:px-4 py-3 sm:py-4">
          <ul className="flex justify-center items-center gap-x-2 sm:gap-x-3 mr-3.5 sm:mr-5">
            <li
              className={`flex justify-center items-center px-2 sm:px-3 py-1.5 sm:py-2 rounded-full transition-colors duration-200 ${
                isHomeActive ? "bg-white text-black" : "text-white"
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
              onClick={() => toggleSubmenu("company")}
              className={`px-2 sm:px-3 py-1.5 sm:py-2 cursor-pointer rounded-full transition-colors duration-200 font-neueMontreal ${
                isCompanyActive
                  ? "bg-white text-black"
                  : activeSubmenu === "company"
                  ? "text-primary"
                  : "text-white hover:text-primary"
              }`}
            >
              <p className={`text-sm sm:text-[16px] leading-[100%]`}>Company</p>
            </li>

            <li
              className={`flex justify-center items-center px-2 sm:px-3 py-1.5 sm:py-2 rounded-full transition-colors duration-200 font-neueMontreal ${
                isSolutionsActive ? "bg-white text-black" : "text-white"
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
              onClick={() => toggleSubmenu("operations")}
              className={`px-2 sm:px-3 py-1.5 sm:py-2 cursor-pointer rounded-full transition-colors duration-200 font-neueMontreal ${
                isOperationsActive
                  ? "bg-white text-black"
                  : activeSubmenu === "operations"
                  ? "text-primary"
                  : "text-white hover:text-primary"
              }`}
            >
              <p className={`text-sm sm:text-[16px] leading-[100%]`}>
                Operations
              </p>
            </li>
          </ul>

          <li
            onClick={() => toggleSubmenu("extras")}
            className="relative overflow-hidden h-3 w-3 sm:h-4 sm:w-4 cursor-pointer flex-1 flex items-center"
          >
            {/* Plus Icon */}
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
