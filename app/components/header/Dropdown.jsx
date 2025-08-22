"use client";
import React from "react";
import Link from "next/link";

const Dropdown = ({
  isOpen,
  onMouseEnter,
  onMouseLeave,
  label,
  pathname,
  links = [],
  onDropdownLinkClick,
}) => {

  const isParentActive =
    links.some(({ href }) => {
      const linkPath = href.split("/#")[0];
      console.log(linkPath)
      return (
        pathname === href ||
        pathname === linkPath ||
        pathname.startsWith(linkPath)
      );
    }) || isOpen;

  return (
    <li
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="relative p-2 cursor-pointer"
    >
      <ul
        className={`flex justify-center items-center gap-1 text-[16px] font-neueMontreal leading-[120%] capitalize ${
          isParentActive
            ? "text-primary"
            : "text-white transition-colors ease-in-out hover:text-primary"
        }`}
      >
        <li>{label}</li>
        <svg
          className={`w-6 h-6 ${isOpen ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <mask
            id="mask0_401_543"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="24"
            height="24"
          >
            <rect width="24" height="24" fill="#646464" />
          </mask>
          <g mask="url(#mask0_401_543)">
            <path
              d="M11.9992 14.7069L6.69141 9.39916L7.39916 8.69141L11.9992 13.2914L16.5992 8.69141L17.3069 9.39916L11.9992 14.7069Z"
              fill="currentColor"
              fillOpacity="1"
            />
          </g>
        </svg>
      </ul>
      <ul
        style={{
          clipPath: isOpen ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
          opacity: isOpen ? "opacity-100" : "opacity-0",
        }}
        className="transition-all ease-in-out duration-500 rounded-md absolute h-fit py-3.5 flex flex-col w-[270px] left-0 top-[180%] bg-[#17171780] backdrop-blur-[4px]"
      >
        {links.map(({ href, label }, idx) => (
          <li
            key={idx}
            onClick={onDropdownLinkClick}
            className={`text-[16px] leading-[120%] font-neueMontreal ${
              pathname === href
                ? "text-primary"
                : "text-white transition-colors ease-in-out hover:text-primary"
            } ${idx === links.length - 1 ? "mb-0" : "mb-4.5"}`}
          >
            <Link href={href} className="px-5 py-3.5">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default Dropdown;