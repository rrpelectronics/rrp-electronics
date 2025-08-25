"use client";
import React from 'react';
import Link from 'next/link';

const NavLinks = ({href, label, className}) => {
  return (
    <li className="cursor-pointer text-[16px] text-white transition-colors ease-in-out hover:text-primary font-neueMontreal leading-[120%] capitalize">
      <Link href={href} className={`${className}`}>
        {label}
      </Link>
    </li>
  );
}

export default NavLinks;