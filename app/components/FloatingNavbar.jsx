"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const FloatingNavbar = React.forwardRef((props, ref) => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const pathname = usePathname();
  const hoverTimeoutRef = useRef(null);
  const leaveTimeoutRef = useRef(null);

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
      if (!event.target.closest("header")) {
        setActiveSubmenu(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
      }
    };
  }, []);

  // Check if current page is in company submenu
  const companyPages = ["/about", "/our-journey", "/leadership"];
  const isCompanyActive = companyPages.includes(pathname);

  // Check if current page is in operations submenu
  const operationsPages = ["/compliances", "/logistics", "/traceability"];
  const isOperationsActive = operationsPages.includes(pathname);

  // Check if current page is solutions
  const isSolutionsActive = pathname === "/solutions";

  // Check if current page is home
  const isHomeActive = pathname === "/";

  // Check if current page is in extras submenu
  const extrasPages = ["/projects", "/careers", "/news-events", "/contact-us"];
  const isExtrasActive = extrasPages.includes(pathname);

  const toggleSubmenu = (submenuName) => {
    setActiveSubmenu(activeSubmenu === submenuName ? null : submenuName);
  };

  // Handle hover enter for company and operations
  const handleMouseEnter = (submenuName) => {
    if (submenuName === "company" || submenuName === "operations") {
      // Clear any existing timeouts
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
      }

      // Set a small delay before opening to prevent accidental triggers
      hoverTimeoutRef.current = setTimeout(() => {
        setActiveSubmenu(submenuName);
      }, 150);
    }
  };

  // Handle mouse leave for company and operations
  const handleMouseLeave = (submenuName) => {
    if (submenuName === "company" || submenuName === "operations") {
      // Clear hover timeout if still pending
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }

      // Set a longer delay before closing to allow user to move to submenu
      leaveTimeoutRef.current = setTimeout(() => {
        setActiveSubmenu(null);
      }, 50);
    }
  };

  // Handle submenu hover to keep it open
  const handleSubmenuEnter = () => {
    // Clear leave timeout when entering submenu
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
    }
  };

  // Handle submenu leave
  const handleSubmenuLeave = () => {
    // Close submenu when leaving submenu area
    leaveTimeoutRef.current = setTimeout(() => {
      setActiveSubmenu(null);
    }, 50);
  };

  return (
    <header
      ref={ref}
      className="flex flex-col w-fit z-50 fixed left-1/2 -translate-x-1/2 bottom-7 md:bottom-10"
    >
      {/* Company Submenu */}
      <ul
        style={{
          top: "calc(-100% - 16px)",
          clipPath:
            activeSubmenu === "company"
              ? "inset(0% 0% 0% 0%)"
              : "inset(100% 0% 0% 0%)",
          transition: "clip-path 0.3s ease-in-out",
        }}
        className="rounded-3xl w-full fixed left-1/2 -translate-1/2 flex flex-col px-4 sm:px-6 gap-4 py-4 sm:py-5 bg-darkBg/70 border border-white/16 backdrop-blur-[12px]"
        onMouseEnter={handleSubmenuEnter}
        onMouseLeave={handleSubmenuLeave}
      >
        <li onClick={() => toggleSubmenu("company")}>
          <Link
            href={"/about"}
            className={`leading-[100%] font-neueMontreal text-sm sm:text-[16px] transition-colors duration-200 hover:text-primary ${
              pathname === "/about" ? "text-primary" : "text-white"
            }`}
          >
            About Us
          </Link>
        </li>
        <li onClick={() => toggleSubmenu("company")}>
          <Link
            href={"/our-journey"}
            className={`leading-[100%] font-neueMontreal text-sm sm:text-[16px] transition-colors duration-200 hover:text-primary ${
              pathname === "/our-journey" ? "text-primary" : "text-white"
            }`}
          >
            Our Journey
          </Link>
        </li>
        <li onClick={() => toggleSubmenu("company")}>
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
        style={{
          top: "calc(-100% - 16px)",
          clipPath:
            activeSubmenu === "operations"
              ? "inset(0% 0% 0% 0%)"
              : "inset(100% 0% 0% 0%)",
          transition: "clip-path 0.3s ease-in-out",
        }}
        className="rounded-3xl w-full fixed left-1/2 -translate-1/2 flex flex-col px-4 sm:px-6 gap-4 py-4 sm:py-5 bg-darkBg/70 border border-white/16 backdrop-blur-[12px]"
        onMouseEnter={handleSubmenuEnter}
        onMouseLeave={handleSubmenuLeave}
      >
        <li onClick={() => toggleSubmenu("operations")}>
          <Link
            href={"/compliances"}
            className={`leading-[100%] font-neueMontreal text-sm sm:text-[16px] transition-colors duration-200 hover:text-primary ${
              pathname === "/compliances" ? "text-primary" : "text-white"
            }`}
          >
            Quality Standards & Compliances
          </Link>
        </li>
        <li onClick={() => toggleSubmenu("operations")}>
          <Link
            href={"/logistics"}
            className={`leading-[100%] font-neueMontreal text-sm sm:text-[16px] transition-colors duration-200 hover:text-primary ${
              pathname === "/logistics" ? "text-primary" : "text-white"
            }`}
          >
            Supply Chain & Logistics
          </Link>
        </li>
        <li onClick={() => toggleSubmenu("operations")}>
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

      {/* Extras Links on Plus Icon*/}
      <ul
        style={{
          top: "calc(-100% - 36px)",
          clipPath:
            activeSubmenu === "extras"
              ? "inset(0% 0% 0% 0%)"
              : "inset(100% 0% 0% 0%)",
          transition: "clip-path 0.3s ease-in-out",
        }}
        className="rounded-3xl w-full fixed left-1/2 -translate-1/2 flex flex-col px-4 sm:px-6 gap-4 py-4 sm:py-5 bg-darkBg/70 border border-white/16 backdrop-blur-[4px]"
      >
        <li onClick={() => toggleSubmenu("extras")}>
          <Link
            href={"/projects"}
            className={`leading-[100%] font-neueMontreal text-sm sm:text-[16px] transition-colors duration-200 hover:text-primary ${
              pathname === "/projects" ? "text-primary" : "text-white"
            }`}
          >
            Projects
          </Link>
        </li>
        <li onClick={() => toggleSubmenu("extras")}>
          <Link
            href={"/careers"}
            className={`leading-[100%] font-neueMontreal text-sm sm:text-[16px] transition-colors duration-200 hover:text-primary ${
              pathname === "/careers" ? "text-primary" : "text-white"
            }`}
          >
            Careers
          </Link>
        </li>
        <li onClick={() => toggleSubmenu("extras")}>
          <Link
            href={"/news-events"}
            className={`leading-[100%] font-neueMontreal text-sm sm:text-[16px] transition-colors duration-200 hover:text-primary ${
              pathname === "/news-events" ? "text-primary" : "text-white"
            }`}
          >
            News Events
          </Link>
        </li>
        <li onClick={() => toggleSubmenu("extras")}>
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

      <nav className="overflow-hidden w-fit flex items-center bg-darkBg/70 border border-white/16 backdrop-blur-[4px] rounded-full pl-2.5 sm:pl-4 pr-4.5 sm:pr-6 py-3 sm:py-4">
        <ul className="flex justify-center items-center gap-x-2 sm:gap-x-3 mr-3.5 sm:mr-5">
          <li
            className={`flex justify-center items-center px-2 sm:px-3 py-1.5 sm:py-2 rounded-full transition-colors duration-200 ${
              isHomeActive
                ? "bg-white text-black"
                : "text-white font-neueMontreal"
            }`}
          >
            <Link
              href="/"
              className={`text-sm sm:text-[16px] leading-[100%] transition-colors duration-200 ${
                !isHomeActive ? "hover:text-primary" : ""
              }`}
            >
              Home
            </Link>
          </li>

          <li
            onMouseEnter={() => handleMouseEnter("company")}
            onMouseLeave={() => handleMouseLeave("company")}
            onClick={() => toggleSubmenu("company")}
            className={`px-2 sm:px-3 py-1.5 sm:py-2 cursor-pointer rounded-full transition-colors duration-200 ${
              isCompanyActive
                ? "bg-white text-black"
                : activeSubmenu === "company"
                ? "text-primary font-neueMontreal"
                : "text-white font-neueMontreal hover:text-primary"
            }`}
          >
            <p className={`text-sm sm:text-[16px] leading-[100%]`}>Company</p>
          </li>

          <li
            className={`flex justify-center items-center px-2 sm:px-3 py-1.5 sm:py-2 rounded-full transition-colors duration-200 ${
              isSolutionsActive
                ? "bg-white text-black"
                : "text-white font-neueMontreal"
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
            onMouseLeave={() => handleMouseLeave("operations")}
            onClick={() => toggleSubmenu("operations")}
            className={`px-2 sm:px-3 py-1.5 sm:py-2 cursor-pointer rounded-full transition-colors duration-200 ${
              isOperationsActive
                ? "bg-white text-black"
                : activeSubmenu === "operations"
                ? "text-primary font-neueMontreal"
                : "text-white font-neueMontreal hover:text-primary"
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
  );
});

export default FloatingNavbar;