"use client"
import React, { memo } from "react";
import Link from "next/link";

// Reusable LinkList component to reduce duplication
const LinkList = ({ title, links }) => (
  <div className="flex flex-col gap-3.5 md:gap-6 text-white">
    <strong className="text-bodyLarge font-normal">{title}</strong>
    <ul className="flex flex-col gap-1.5 md:gap-4.5 text-white text-bodySmall">
      {links.map(({ href, label }) => (
        <li key={href}>
          <Link
            href={href}
            className="text-textSecondary hover:text-primary transition-colors duration-300 leading-[120%]"
            aria-label={label}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  // Data for link sections
  const linkSections = [
    {
      title: "Company",
      links: [
        { href: "/about", label: "About Us" },
        { href: "/our-journey", label: "Our Journey" },
        { href: "/leadership", label: "Leadership" },
      ],
    },
    {
      title: "Solutions",
      links: [
        { href: "/solutions/#legacy-packaging", label: "Legacy Packaging" },
        { href: "/solutions/#advance-packaging", label: "Advanced Packaging" },
        {
          href: "/solutions/#display-technologies",
          label: "Display Technologies",
        },
      ],
    },
    {
      title: "Operations",
      links: [
        { href: "/compliances", label: "Quality standards & Compliances" },
        { href: "/logistics", label: "Supply Chain & Logistics" },
        { href: "/traceability", label: "Traceability" },
      ],
    },
    {
      title: "Explore",
      links: [
        { href: "/projects", label: "Projects" },
        { href: "/news-events", label: "News & Events" },
        { href: "/careers", label: "Careers" },
        { href: "/contact-us", label: "Contact Us" },
      ],
    },
  ];

  return (
    <footer className="h-fit w-full flex flex-col gap-10 md:gap-15 pt-10 md:pt-15 pb-10 md:pb-5 bg-darkBg">
      <div className="grid grid-cols-4 md:grid-cols-12 gap-x-3 md:gap-x-5 gap-y-5 md:gap-y-6 px-3.5 md:px-5 lg:px-10">
        <span className="max-w-[895px] col-span-4 md:col-span-12 lg:col-span-9 text-white text-display tracking-display leading-[105%]">
          Shaping the Future. <br /> Powering Innovation.
        </span>
        <div className="col-span-4 md:col-span-6 lg:col-span-3 flex flex-col gap-y-5 md:gap-y-6 lg:mt-2">
          <p className="text-bodyLarge text-textSecondary font-neueMontreal leading-[120%]">
            Powering the next generation of semiconductors with precision,
            scale, and intelligence.
          </p>
          <Link
            href="/contact-us"
            className="text-bodySmall text-white leading-[120%] bg-primary rounded-full w-fit px-4 md:px-6 py-2 md:py-3"
            aria-label="Connect with Us"
          >
            Connect with Us
          </Link>
        </div>
      </div>
      <div className="w-full h-fit pt-7.5 md:pt-10 border-t-1 border-t-borderSecondary">
        <div className="w-full h-fit grid grid-cols-4 md:grid-cols-12 gap-4 md:gap-x-5 items-start px-3.5 md:px-5 lg:px-10">
          <Link
            href="/"
            className="aspect-[240/26] col-span-4 md:col-span-12 lg:col-span-3 mb-10 lg:mb-0 logo-container"
            aria-label="RRP Electronics Home"
          >
            <img
              src="/images/common/rrplogo.svg"
              alt="RRP Electronics"
              className="object-contain object-center h-full w-auto"
              loading="lazy"
            />
          </Link>
          <div className="font-neueMontreal col-span-4 md:col-span-12 lg:col-span-9 grid grid-cols-2 gap-y-10 gap-x-3 md:flex md:flex-row md:justify-between w-full lg:ml-auto">
            {linkSections.map((section) => (
              <LinkList
                key={section.title}
                title={section.title}
                links={section.links}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-4 text-caption font-neueMontreal px-3.5 md:px-5 lg:px-10">
        <ul className="flex items-center gap-4">
          {[
            { href: "#", label: "Privacy Policy" },
            { href: "#", label: "Disclaimer" },
            { href: "#", label: "Sitemap" },
          ].map(({ href, label }) => (
            <li key={label}>
              <Link
                href={href}
                className="text-textSecondary hover:text-primary transition-colors duration-300 leading-[120%]"
                aria-label={label}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="leading-[120%] text-textSecondary">
          Copyright © {new Date().getFullYear()} RRP Electronics. All Rights
          Reserved
        </p>
      </div>
    </footer>
  );
};

export default memo(Footer);