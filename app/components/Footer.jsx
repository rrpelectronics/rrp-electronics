"use client";
import React from "react";
import Link from "next/link";
import { useFooter } from "@/app/context/FooterContext";

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
    title: "Capabilities",
    links: [
      { href: "/solutions", label: "Solutions" },
      { href: "/projects", label: "Projects" },
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
      { href: "/news-events", label: "News & Events" },
      { href: "/careers", label: "Careers" },
      { href: "/contact-us", label: "Contact Us" },
    ],
  },
];

// Reusable LinkList component to reduce duplication
const LinkList = ({ title, links }) => (
  <div className="flex flex-col gap-3.5 md:gap-5 text-white">
    <strong className="text-bodyLarge font-normal">{title}</strong>
    <ul className="flex flex-col gap-1.5 md:gap-4 text-white text-bodySmall">
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
  const { footerContent } = useFooter();

  // Check if we should show the top section
  const showTopSection = footerContent && footerContent.heading && footerContent.description;

  return (
    <footer className="h-fit w-full flex flex-col gap-10 md:gap-15 pt-10 md:pt-15 pb-10 md:pb-5 bg-darkBg">
      {/* Conditional Top Section */}
      {showTopSection && (
        <div className="grid grid-cols-4 md:grid-cols-12 gap-x-3 md:gap-x-5 gap-y-5 md:gap-y-6 px-3.5 md:px-5 lg:px-10 pb-7.5 md:pb-10 border-b-1 border-b-borderSecondary">
          <span className="max-w-[895px] col-span-4 md:col-span-12 lg:col-span-9 text-white text-display tracking-display leading-[110%]">
            {footerContent.heading.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < footerContent.heading.split("\n").length - 1 && <br />}
              </React.Fragment>
            ))}
          </span>
          <div className="col-span-4 md:col-span-6 lg:col-span-3 flex flex-col gap-y-5 md:gap-y-6 lg:mt-2">
            <p className="text-bodyLarge text-textSecondary font-neueMontreal leading-[120%]">
              {footerContent.description}
            </p>
            <Link
              href={footerContent.buttonLink}
              className="text-bodySmall text-white leading-[120%] bg-primary rounded-full w-fit px-4 md:px-6 py-2 md:py-3"
              aria-label={footerContent.buttonText}
            >
              {footerContent.buttonText}
            </Link>
          </div>
        </div>
      )}
      <div className="w-full h-fit">
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
      <div className="flex flex-col gap-y-6 gap-4 text-bodySmallest font-neueMontreal px-3.5 md:px-5 lg:px-10">
        <div className="flex gap-4 justify-between items-center">
          <ul className="flex items-center gap-4 w-fit">
            {[
              // { href: "#", label: "Privacy Policy" },
              // { href: "#", label: "Disclaimer" },
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
          <ul className="flex items-center gap-4 w-fit">
            <li>
              <Link
                href={"https://www.linkedin.com/company/rrp-electronics"}
                target="_blank"
                className="text-textSecondary hover:text-primary transition-colors ease-in-out h-5.5 w-5.5"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.001 9.55005C12.9181 8.61327 14.1121 8 15.501 8C18.5385 8 21.001 10.4624 21.001 13.5V21H19.001V13.5C19.001 11.567 17.434 10 15.501 10C13.568 10 12.001 11.567 12.001 13.5V21H10.001V8.5H12.001V9.55005ZM5.00098 6.5C4.17255 6.5 3.50098 5.82843 3.50098 5C3.50098 4.17157 4.17255 3.5 5.00098 3.5C5.8294 3.5 6.50098 4.17157 6.50098 5C6.50098 5.82843 5.8294 6.5 5.00098 6.5ZM4.00098 8.5H6.00098V21H4.00098V8.5Z"
                    fill="currentColor"
                  />
                </svg>
              </Link>
            </li>
            <li>
              <Link
                href={"https://www.instagram.com/rrpelectronics/"}
                target="_blank"
                className="text-textSecondary hover:text-primary transition-colors ease-in-out h-5.5 w-5.5"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.001 9C10.3436 9 9.00098 10.3431 9.00098 12C9.00098 13.6573 10.3441 15 12.001 15C13.6583 15 15.001 13.6569 15.001 12C15.001 10.3427 13.6579 9 12.001 9ZM12.001 7C14.7614 7 17.001 9.2371 17.001 12C17.001 14.7605 14.7639 17 12.001 17C9.24051 17 7.00098 14.7629 7.00098 12C7.00098 9.23953 9.23808 7 12.001 7ZM18.501 6.74915C18.501 7.43926 17.9402 7.99917 17.251 7.99917C16.5609 7.99917 16.001 7.4384 16.001 6.74915C16.001 6.0599 16.5617 5.5 17.251 5.5C17.9393 5.49913 18.501 6.0599 18.501 6.74915ZM12.001 4C9.5265 4 9.12318 4.00655 7.97227 4.0578C7.18815 4.09461 6.66253 4.20007 6.17416 4.38967C5.74016 4.55799 5.42709 4.75898 5.09352 5.09255C4.75867 5.4274 4.55804 5.73963 4.3904 6.17383C4.20036 6.66332 4.09493 7.18811 4.05878 7.97115C4.00703 9.0752 4.00098 9.46105 4.00098 12C4.00098 14.4745 4.00753 14.8778 4.05877 16.0286C4.0956 16.8124 4.2012 17.3388 4.39034 17.826C4.5591 18.2606 4.7605 18.5744 5.09246 18.9064C5.42863 19.2421 5.74179 19.4434 6.17187 19.6094C6.66619 19.8005 7.19148 19.9061 7.97212 19.9422C9.07618 19.9939 9.46203 20 12.001 20C14.4755 20 14.8788 19.9934 16.0296 19.9422C16.8117 19.9055 17.3385 19.7996 17.827 19.6106C18.2604 19.4423 18.5752 19.2402 18.9074 18.9085C19.2436 18.5718 19.4445 18.2594 19.6107 17.8283C19.8013 17.3358 19.9071 16.8098 19.9432 16.0289C19.9949 14.9248 20.001 14.5389 20.001 12C20.001 9.52552 19.9944 9.12221 19.9432 7.97137C19.9064 7.18906 19.8005 6.66149 19.6113 6.17318C19.4434 5.74038 19.2417 5.42635 18.9084 5.09255C18.573 4.75715 18.2616 4.55693 17.8271 4.38942C17.338 4.19954 16.8124 4.09396 16.0298 4.05781C14.9258 4.00605 14.5399 4 12.001 4ZM12.001 2C14.7176 2 15.0568 2.01 16.1235 2.06C17.1876 2.10917 17.9135 2.2775 18.551 2.525C19.2101 2.77917 19.7668 3.1225 20.3226 3.67833C20.8776 4.23417 21.221 4.7925 21.476 5.45C21.7226 6.08667 21.891 6.81333 21.941 7.8775C21.9885 8.94417 22.001 9.28333 22.001 12C22.001 14.7167 21.991 15.0558 21.941 16.1225C21.8918 17.1867 21.7226 17.9125 21.476 18.55C21.2218 19.2092 20.8776 19.7658 20.3226 20.3217C19.7668 20.8767 19.2076 21.22 18.551 21.475C17.9135 21.7217 17.1876 21.89 16.1235 21.94C15.0568 21.9875 14.7176 22 12.001 22C9.28431 22 8.94514 21.99 7.87848 21.94C6.81431 21.8908 6.08931 21.7217 5.45098 21.475C4.79264 21.2208 4.23514 20.8767 3.67931 20.3217C3.12348 19.7658 2.78098 19.2067 2.52598 18.55C2.27848 17.9125 2.11098 17.1867 2.06098 16.1225C2.01348 15.0558 2.00098 14.7167 2.00098 12C2.00098 9.28333 2.01098 8.94417 2.06098 7.8775C2.11014 6.8125 2.27848 6.0875 2.52598 5.45C2.78014 4.79167 3.12348 4.23417 3.67931 3.67833C4.23514 3.1225 4.79348 2.78 5.45098 2.525C6.08848 2.2775 6.81348 2.11 7.87848 2.06C8.94514 2.0125 9.28431 2 12.001 2Z"
                    fill="currentColor"
                  />
                </svg>
              </Link>
            </li>

            <li>
              <Link
                href={"https://x.com/rrpelectronic"}
                target="_blank"
                className="text-textSecondary hover:text-primary transition-colors ease-in-out h-5.5 w-5.5"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.4883 14.651L15.25 21H22.25L14.3917 10.5223L20.9308 3H18.2808L13.1643 8.88578L8.75 3H1.75L9.26086 13.0145L2.31915 21H4.96917L10.4883 14.651ZM16.25 19L5.75 5H7.75L18.25 19H16.25Z"
                    fill="currentColor"
                  />
                </svg>
              </Link>
            </li>
          </ul>
        </div>
        <p className="leading-[120%] text-textSecondary">
          Copyright © {new Date().getFullYear()} RRP Electronics. All Rights
          Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
