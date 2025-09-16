"use client";
import React, { forwardRef, memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = forwardRef((props, ref) => {

  const pathname = usePathname();

  return (
    <header
      ref={ref}
      className="w-full h-fit py-3.5 md:pt-5 lg:pt-10 px-3.5 md:px-5 lg:px-10 z-60"
    >
      <nav className="flex justify-between items-center h-fit">
        <Link
          href={"/"}
          className="aspect-[240/26] w-21.5 h-7 lg:w-36 lg:h-12.5"
        >
          <img
            src="/images/common/rrp-logo-exceptional.png"
            alt="RRP Electronics"
            className="object-contain object-center h-full w-auto"
          />
        </Link>
      </nav>
    </header>
  );
});

export default memo(Header);