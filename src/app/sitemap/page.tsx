"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const companyLinkData = [
  {
    href: "/about",
    title: "About Us",
  },
  {
    href: "/our-journey",
    title: "Our Journey",
  },
  {
    href: "/leadership",
    title: "Leadership",
  }
];

const capabilitiesLinkData = [
  {
    href: "/solutions",
    title: "Solutions",
  },
  {
    href: "/projects",
    title: "Projects",
  },
];

const operationsLinkData = [
  {
    href: "/compliances",
    title: "Quality standards & Compliances",
  },
  {
    href: "/logistics",
    title: "Supply Chain & Logistics",
  },
  {
    href: "/traceability",
    title: "Traceability",
  },
];

export const exploreLinkData = [
  {
    href: "/news-events",
    title: "News & Events",
  },
  {
    href: "/careers",
    title: "Careers",
  },
  {
    href: "/contact-us",
    title: "Contact Us",
  },
];

const page = () => {
  const pathname = usePathname()
  return (
    <main className="@container pt-25 md:pt-32 lg:pt-35 relative w-full h-fit px-3.5 md:px-5 lg:px-10 py-10 md:py-15">
      <section className='grid grid-cols-12 gap-x-4 gap-y-6 pb-10 md:pb-15'>
        <div className={`w-full grid grid-cols-subgrid gap-x-4 gap-y-6 h-fit`}>
          <h3 className="max-w-[288px] h-fit col-span-12 lg:col-span-3 text-heading3 leading-[110%] tracking-heading3">
            Company
          </h3>
        </div>
        <div className="col-start-1 col-span-12 @6xl:col-start-4 @6xl:col-span-9 grid grid-cols-4 gap-x-4">
          {companyLinkData.map((link, id) => (
            <div
              key={id}
              className={`col-span-4 sm:col-span-2 ${
                id === 0 || id === 1
                  ? "border-y-1 border-y-borderPrimary"
                  : "border-b-1 border-b-borderPrimary"
              } lg:max-w-[90%]`}
            >
              <Link
                href={link.href}
                target="_blank"
                className={`text-bodyBase leading-[120%] text-black hover:text-primary transition-colors ease-in-out w-full flex items-center justify-between py-4 md:py-5 lg:py-6 ${
                  pathname === "/sitemap" ? "border-b-0" : "border-b-1"
                }`}
              >
                {link.title}
                <img
                  src="/images/icons/arrow_outward.svg"
                  alt="Redirections Link"
                  className="h-6 w-6 md:w-9 md:h-9"
                />
              </Link>
            </div>
          ))}
        </div>
      </section>
      <section className='grid grid-cols-12 gap-x-4 gap-y-6 py-10 md:py-15'>
        <div className={`w-full grid grid-cols-subgrid gap-x-4 gap-y-6 h-fit`}>
          <h3 className="max-w-[288px] h-fit col-span-12 lg:col-span-3 text-heading3 leading-[110%] tracking-heading3">
            Capabilities
          </h3>
        </div>
        <div className="col-start-1 col-span-12 @6xl:col-start-4 @6xl:col-span-9 grid grid-cols-4 gap-x-4">
          {capabilitiesLinkData.map((link, id) => (
            <div
              key={id}
              className={`col-span-4 sm:col-span-2 ${
                id === 0 || id === 1
                  ? "border-y-1 border-y-borderPrimary"
                  : "border-b-1 border-b-borderPrimary"
              } lg:max-w-[90%]`}
            >
              <Link
                href={link.href}
                target="_blank"
                className={`text-bodyBase leading-[120%] text-black hover:text-primary transition-colors ease-in-out w-full flex items-center justify-between py-4 md:py-5 lg:py-6 ${
                  pathname === "/sitemap" ? "border-b-0" : "border-b-1"
                }`}
              >
                {link.title}
                <img
                  src="/images/icons/arrow_outward.svg"
                  alt="Redirections Link"
                  className="h-6 w-6 md:w-9 md:h-9"
                />
              </Link>
            </div>
          ))}
        </div>
      </section>
      <section className='grid grid-cols-12 gap-x-4 gap-y-6 py-10 md:py-15'>
        <div className={`w-full grid grid-cols-subgrid gap-x-4 gap-y-6 h-fit`}>
          <h3 className="max-w-[288px] h-fit col-span-12 lg:col-span-3 text-heading3 leading-[110%] tracking-heading3">
            Operations
          </h3>
        </div>
        <div className="col-start-1 col-span-12 @6xl:col-start-4 @6xl:col-span-9 grid grid-cols-4 gap-x-4">
          {operationsLinkData.map((link, id) => (
            <div
              key={id}
              className={`col-span-4 sm:col-span-2 ${
                id === 0 || id === 1
                  ? "border-y-1 border-y-borderPrimary"
                  : "border-b-1 border-b-borderPrimary"
              } lg:max-w-[90%]`}
            >
              <Link
                href={link.href}
                target="_blank"
                className={`text-bodyBase leading-[120%] text-black hover:text-primary transition-colors ease-in-out w-full flex items-center justify-between py-4 md:py-5 lg:py-6 ${
                  pathname === "/sitemap" ? "border-b-0" : "border-b-1"
                }`}
              >
                {link.title}
                <img
                  src="/images/icons/arrow_outward.svg"
                  alt="Redirections Link"
                  className="h-6 w-6 md:w-9 md:h-9"
                />
              </Link>
            </div>
          ))}
        </div>
      </section>
      <section className='grid grid-cols-12 gap-x-4 gap-y-6 py-10 md:py-15'>
        <div className={`w-full grid grid-cols-subgrid gap-x-4 gap-y-6 h-fit`}>
          <h3 className="max-w-[288px] h-fit col-span-12 lg:col-span-3 text-heading3 leading-[110%] tracking-heading3">
            Explore
          </h3>
        </div>
        <div className="col-start-1 col-span-12 @6xl:col-start-4 @6xl:col-span-9 grid grid-cols-4 gap-x-4">
          {exploreLinkData.map((link, id) => (
            <div
              key={id}
              className={`col-span-4 sm:col-span-2 ${
                id === 0 || id === 1
                  ? "border-y-1 border-y-borderPrimary"
                  : "border-b-1 border-b-borderPrimary"
              } lg:max-w-[90%]`}
            >
              <Link
                href={link.href}
                target="_blank"
                className={`text-bodyBase leading-[120%] text-black hover:text-primary transition-colors ease-in-out w-full flex items-center justify-between py-4 md:py-5 lg:py-6 ${
                  pathname === "/sitemap" ? "border-b-0" : "border-b-1"
                }`}
              >
                {link.title}
                <img
                  src="/images/icons/arrow_outward.svg"
                  alt="Redirections Link"
                  className="h-6 w-6 md:w-9 md:h-9"
                />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default page
