"use client";
import React from "react";
import Link from "next/link";

const MobileNavLinks = ({ href, label, pathname, onClick }) => {
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className={`text-3xl sm:text-heading1 leading-[110%] sm:tracking-heading1 ${
          pathname === href
            ? "text-primary"
            : "text-white transition-colors ease-in-out hover:text-primary"
        }`}
      >
        {label}
      </Link>
    </li>
  );
};

export default MobileNavLinks;
