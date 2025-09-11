"use client";
import React, { forwardRef, memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = forwardRef((props, ref) => {

  const pathname = usePathname();

  return (
    <header
      ref={ref}
      className="will-change-transform fixed top-0 left-0 w-full h-fit py-4 md:py-5 px-3.5 md:px-5 lg:px-10 z-60"
    >
      <nav className="flex justify-between items-center h-fit">
        {pathname === "/news-events" ||
        pathname.startsWith("/careers/") ||
        pathname === "/contact-us" ? (
          <Link
            href={"/"}
            className="aspect-[240/26] w-21.5 h-7 lg:w-30 lg:h-9"
          >
            <img
              src="/images/common/rrp-logo-exceptional.png"
              alt="RRP Electronics"
              className="object-contain object-center h-full w-auto"
            />
          </Link>
        ) : (
          <Link
            href={"/"}
            className="aspect-[240/26] w-21.5 h-7 lg:w-30 lg:h-10 flex flex-col gap-y-1"
          >
            <img
              src="/images/common/rrp-logo.png"
              alt="RRP Electronics"
              className="object-contain object-center h-full w-auto"
            />
            <img
              src="/images/common/rrp-logo-text.png"
              alt="RRP Electronics"
              className="object-contain object-center h-full w-auto mix-blend-difference"
            />
          </Link>
        )}
      </nav>
    </header>
  );
});

export default memo(Header);