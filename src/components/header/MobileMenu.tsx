"use client";
import React, { forwardRef } from "react";
import Link from "next/link";
import MobileDropdown from "./MobileDropdown";
import MobileNavLinks from "./MobileNavLinks";

const navLinks_1 = [{ href: "/solutions", label: "Solutions" }];
const navLinks_2 = [
  { href: "/projects", label: "Projects" },
  { href: "/news-events", label: "News & Events" },
  { href: "/careers", label: "Careers" },
  { href: "/contact-us", label: "Contact Us" },
];

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

interface MobileMenuProps {
  isOpen: boolean;
  pathname: string;
  openMobileDropdown: string | null;
  toggleMobileDropdown: (dropdown: string) => void;
  handleMobileMenuClose: () => void;
}

const MobileMenu = forwardRef<HTMLUListElement, MobileMenuProps>(
  (
    {
      isOpen,
      pathname,
      openMobileDropdown,
      toggleMobileDropdown,
      handleMobileMenuClose,
    },
    ref
  ) => {
    return (
      <ul
        ref={ref}
        style={isOpen ? {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1
        } : {
          clipPath: "inset(0% 0% 100% 0%)",
          opacity: 0,
        }}
        className={`flex lg:hidden transition-all duration-750 fixed top-0 left-0 h-screen w-full bg-darkBg/98 backdrop-blur-sm flex-col gap-y-10 px-3.5 md:px-5 justify-center`}
      >
        <MobileDropdown
          label="Company"
          links={companyLinks}
          pathname={pathname}
          isOpen={openMobileDropdown === "company"}
          toggleOpen={() => toggleMobileDropdown("company")}
          closeMenu={handleMobileMenuClose}
        />
        {navLinks_1.map((link, idx) => (
          <MobileNavLinks
            key={`${idx}-${link.label}`}
            href={link.href}
            label={link.label}
            pathname={pathname}
            onClick={handleMobileMenuClose}
          />
        ))}
        <MobileDropdown
          label="Operations"
          links={operationsLinks}
          pathname={pathname}
          isOpen={openMobileDropdown === "operations"}
          toggleOpen={() => toggleMobileDropdown("operations")}
          closeMenu={handleMobileMenuClose}
        />
        {navLinks_2.map((link, idx) => (
          <MobileNavLinks
            key={`${idx}-${link.label}`}
            href={link.href}
            label={link.label}
            pathname={pathname}
            onClick={handleMobileMenuClose}
          />
        ))}
        <button
          onClick={handleMobileMenuClose}
          className="h-10 w-10 rounded-full fixed top-8 right-3.5 md:right-5"
        >
          <img
            src="/images/common/close-mobile.svg"
            alt="Mobile Menu Close"
            className="h-full w-full"
          />
        </button>
      </ul>
    );
  }
);

export default MobileMenu;
