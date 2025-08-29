"use client";
import React, { useState, useEffect, useRef, forwardRef, memo, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import UseDropdownHandlers from "@/app/hooks/UseDropdownHandlers";
import UseMobileDetection from "@/app/hooks/UseMobileDetection";
import UseBodyScrollLock from "@/app/hooks/UseBodyScrollLock";
import Dropdown from "./header/Dropdown";
import NavLinks from "./header/NavLinks";
import MobileMenu from "./header/MobileMenu";

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/our-journey", label: "Our Journey" },
  { href: "/leadership", label: "Leadership" },
];

const operationsLinks = [
  { href: "/compliances", label: "Quality Standards & Compliances" },
  { href: "/logistics", label: "Supply Chain & Logistics" },
  { href: "/traceability", label: "Traceability" },
];

const navLinks = [
  {
    href: "/projects",
    label: "Projects"
  },
  {
    href: "/news-events",
    label: "News & Events"
  },
  {
    href: "/careers",
    label: "Careers"
  },
  {
    href: "/contact-us",
    label: "Contact Us"
  },
]

const Header = forwardRef((props, ref) => {
  const pathname = usePathname();
  const mobileMenuRef = useRef(null);
  const isMobile = UseMobileDetection();
  const dropdowns = UseDropdownHandlers(isMobile);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  UseBodyScrollLock(isMobileMenuOpen, ".mobile-menu-scrollable");

  const toggleMobileDropdown = useCallback((key) => {
    setOpenMobileDropdown((prev) => (prev === key ? null : key));
  }, []);

  const handleMobileMenuClose = useCallback(() => {
    setIsMobileMenuOpen(false);
    setOpenMobileDropdown(null);
  }, []);

  return (
    <header
      ref={ref}
      className="will-change-transform fixed top-0 left-0 w-full h-fit py-4 md:py-5 px-3.5 md:px-5 lg:px-10 bg-darkBg/60 z-50 backdrop-blur-[4px]"
    >
      <nav className="flex justify-between items-center">
        <Link href={"/"} className="aspect-[240/26] w-21.5 h-7 lg:w-30 lg:h-9">
          <img
            src="/images/common/rrplogo.png"
            alt="RRP Electronics"
            className="object-contain object-center h-full w-auto"
          />
        </Link>
        <ul className="hidden lg:flex justify-center items-center lg:gap-2 xl:gap-6">
          <Dropdown
            isOpen={dropdowns.isCompanyOpen}
            onMouseEnter={() => dropdowns.handleMouseEnter("company")}
            onMouseLeave={() => dropdowns.handleMouseLeave("company")}
            label="Company"
            links={companyLinks}
            pathname={pathname}
            onDropdownLinkClick={() => dropdowns.setIsCompanyOpen(false)}
          />

          <li
            className={`cursor-pointer text-[16px] font-neueMontreal leading-[120%] capitalize
            ${
              pathname === "/solutions"
                ? "text-primary"
                : "text-white transition-colors ease-in-out hover:text-primary"
            }`}
          >
            <Link href={"/solutions"} className={`p-2`}>
              Solutions
            </Link>
          </li>

          <Dropdown
            isOpen={dropdowns.isOperationsOpen}
            onMouseEnter={() => dropdowns.handleMouseEnter("operations")}
            onMouseLeave={() => dropdowns.handleMouseLeave("operations")}
            label="Operations"
            links={operationsLinks}
            pathname={pathname}
            onDropdownLinkClick={() => dropdowns.setIsOperationsOpen(false)}
          />
          {navLinks.map((link, idx) => (
            <NavLinks
              key={`${idx}-${link.label}`}
              href={link.href}
              label={link.label}
              pathname={pathname}
              className={`${idx === navLinks.length - 1 ? "pl-2 pr-0" : "p-2"}`}
            />
          ))}
        </ul>
        <MobileMenu
          dropDownLinks={companyLinks}
          openMobileDropdown={openMobileDropdown}
          toggleMobileDropdown={toggleMobileDropdown}
          handleMobileMenuClose={handleMobileMenuClose}
          pathname={pathname}
          isOpen={isMobileMenuOpen}
          ref={mobileMenuRef}
        />
        <button
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="block lg:hidden outline-0 border-none cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
          >
            <mask
              id="mask0_401_170"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="28"
              height="28"
            >
              <rect width="28" height="28" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_401_170)">
              <path
                d="M4.66602 8.16667V7H23.3327V8.16667H4.66602ZM4.66602 21V19.8333H23.3327V21H4.66602ZM4.66602 14.5833V13.4167H23.3327V14.5833H4.66602Z"
                fill="#FF5C19"
              />
            </g>
          </svg>
        </button>
      </nav>
    </header>
  );
});

export default memo(Header);
