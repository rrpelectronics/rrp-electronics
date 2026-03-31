"use client";
import React from "react";
import Link from "next/link";

const NavLinks = ({ href, label, className, pathname }) => {
  // Normalize paths by removing trailing slashes
  const normalizePathname = (path) =>
    path === "/" ? "/" : path.replace(/\/$/, "");
  const isActive = normalizePathname(pathname) === normalizePathname(href);

  return (
    <li
      className={`cursor-pointer text-[16px] font-neueMontreal leading-[120%] capitalize transition-colors ease-in-out ${
        isActive ? "text-primary" : "text-white hover:text-primary"
      }`}
    >
      <Link href={href} className={className}>
        {label}
      </Link>
    </li>
  );
};

export default NavLinks;
