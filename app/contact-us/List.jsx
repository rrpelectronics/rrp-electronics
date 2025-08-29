"use client";
import React from 'react';
import Link from 'next/link';

const List = () => {
  return (
    <ul className="h-fit w-full px-3.5 md:px-5 lg:px-10 py-10 md:py-15">
      <li className="grid grid-cols-4 gap-y-4.5 gap-x-3 md:gap-x-5 py-5 md:py-6 border-y-1 border-y-borderPrimary">
        <p className="col-span-4 md:col-span-2 text-heading4 text-black leading-[115%]">
          Reach Us
        </p>
        <p className="col-span-4 md:col-span-2 text-bodyLarge text-textPrimary font-neueMontreal leading-[120%] w-[80%]">
          A396/397, TTC Industrial Area, Mahape, Navi Mumbai, <br />
          Maharashtra-400710
        </p>
      </li>
      <li className="grid grid-cols-4 gap-y-4.5 gap-x-3 md:gap-x-5 py-5 md:py-6 border-b-1 border-b-borderPrimary">
        <p className="col-span-4 md:col-span-2 text-heading4 text-black leading-[115%]">
          Email
        </p>
        <ul className="col-span-4 md:col-span-2 flex flex-col gap-y-4 md:gap-y-5">
          <li className="text-bodyLarge text-textPrimary font-neueMontreal leading-[120%] hover:text-primary transition-colors duration-300">
            <Link href={"mailto: hello@rrpelectronics.com"}>
              hello@rrpelectronics.com
            </Link>
          </li>
          <li className="text-bodyLarge text-textPrimary font-neueMontreal leading-[120%] hover:text-primary transition-colors duration-300">
            <Link href={"mailto: careers@rrpelectronics.com"}>
              careers@rrpelectronics.com
            </Link>
          </li>
        </ul>
      </li>
      <li className="grid grid-cols-4 gap-y-4.5 gap-x-3 md:gap-x-5 py-5 md:py-6 border-b-1 border-b-borderPrimary">
        <p className="col-span-4 md:col-span-2 text-heading4 text-black leading-[115%]">
          Contact
        </p>
        <ul className="col-span-4 md:col-span-2 flex flex-col gap-y-4 md:gap-y-5">
          <li className="text-bodyLarge text-textPrimary font-neueMontreal leading-[120%] hover:text-primary transition-colors duration-300">
            <Link href={"tel: +91 89768 55244"}>+91 89768 55244</Link>
          </li>
          <li className="text-bodyLarge text-textPrimary font-neueMontreal leading-[120%] hover:text-primary transition-colors duration-300">
            <Link href={"tel: +91 86559 97802"}>+91 86559 97802</Link>
          </li>
        </ul>
      </li>
    </ul>
  );
}

export default List