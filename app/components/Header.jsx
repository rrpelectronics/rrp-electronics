"use client";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="will-change-transform fixed top-0 left-0 w-full h-fit py-3 md:py-5 px-3.5 md:px-5 lg:px-10 bg-black/20 z-50 backdrop-blur-[40px]">
      <nav className="flex justify-between items-center">
        <Link
          href={"/"}
          className="aspect-[240/26]"
          style={{
            width: "clamp(4.75rem, 3.698rem + 4.67vw, 7.438rem)",
            height: "clamp(1.75rem, 1.554rem + 0.87vw, 2.25rem)",
          }}
        >
          <img
            src="/images/common/rrplogo.png"
            alt="RRP Electronics"
            className="object-contain object-center h-full w-auto"
          />
        </Link>
        <ul className="hidden lg:flex justify-center items-center lg:gap-2 xl:gap-6">
          <li className="cursor-pointer relative p-2 text-[16px] text-white transition-colors ease-in-out hover:text-primary font-neueMontreal leading-[120%] capitalize flex justify-center items-center gap-1">
            Company
            <svg
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
                  fill="white"
                  fillOpacity="0.6"
                />
              </g>
            </svg>
          </li>
          <li className="cursor-pointer relative p-2 text-[16px] text-white transition-colors ease-in-out hover:text-primary font-neueMontreal leading-[120%] capitalize flex justify-center items-center gap-1">
            Solutions
            <svg
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
                  fill="white"
                  fillOpacity="0.6"
                />
              </g>
            </svg>
          </li>
          <li className="cursor-pointer relative p-2 text-[16px] text-white transition-colors ease-in-out hover:text-primary font-neueMontreal leading-[120%] capitalize flex justify-center items-center gap-1">
            Operations
            <svg
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
                  fill="white"
                  fillOpacity="0.6"
                />
              </g>
            </svg>
          </li>
          <li className="text-[16px] text-white transition-colors ease-in-out hover:text-primary font-neueMontreal leading-[120%] capitalize">
            <Link href={"#"} className="p-2">
              Projects
            </Link>
          </li>
          <li className="text-[16px] text-white transition-colors ease-in-out hover:text-primary font-neueMontreal leading-[120%] capitalize">
            <Link href={"#"} className="p-2">
              News & Events
            </Link>
          </li>
          <li className="text-[16px] text-white transition-colors ease-in-out hover:text-primary font-neueMontreal leading-[120%] capitalize">
            <Link href={"#"} className="p-2">
              Careers
            </Link>
          </li>
          <li className="text-[16px] text-white transition-colors ease-in-out hover:text-primary font-neueMontreal leading-[120%] capitalize">
            <Link href={"#"} className="p-2 pr-0 ">
              Contact
            </Link>
          </li>
        </ul>
        <button className="block lg:hidden outline-0 border-none cursor-pointer">
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
};

export default Header;
