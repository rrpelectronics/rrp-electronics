"use client";
import React from "react";
import Link from "next/link";

const MobileDropdown = ({
  isOpen,
  label,
  pathname,
  links = [],
  toggleOpen,
  closeMenu,
}) => {
  const isActive = links.some(({ href }) => pathname === href) || isOpen;

  return (
    <li>
      <p
        onClick={toggleOpen}
        className={`w-fit gap-4 flex justify-center items-center text-3xl sm:text-heading1 leading-[105%] sm:tracking-heading1 ${
          isActive
            ? "text-primary"
            : "text-white transition-colors ease-in-out hover:text-primary"
        }`}
      >
        {label}
        <svg
          className={`w-5 h-5 ${isOpen ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="7"
          viewBox="0 0 11 7"
          fill="none"
        >
          <path
            d="M5.30775 6.50781L0 1.20006L0.70775 0.49231L5.30775 5.08656L9.90775 0.49231L10.6155 1.20006L5.30775 6.50781Z"
            fill="currentColor"
            fillOpacity="1"
          />
        </svg>
      </p>
      <ul
        className={`flex flex-col gap-y-3 md:gap-y-4 overflow-hidden ml-4 transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[106px] mt-4" : "max-h-0 mt-0"
        }`}
      >
        {links.map(({ href, label }, idx) => (
          <li key={`${idx}-${label}`}>
            <Link
              href={href}
              onClick={closeMenu}
              className={`text-xl sm:text-heading2 leading-[105%] ${
                pathname === href
                  ? "text-primary"
                  : "text-white/60 transition-colors ease-in-out hover:text-primary"
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default MobileDropdown;
