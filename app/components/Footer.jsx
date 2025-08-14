import Link from 'next/link';
import React from 'react'

const Footer = () => {
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
            href={"#"}
            className="text-bodySmall text-white leading-[120%] bg-primary rounded-full w-fit px-4 md:px-6 py-2 md:py-3"
          >
            Connect with Us
          </Link>
        </div>
      </div>
      <div className='w-full h-fit pt-7.5 md:pt-10 border-t-1 border-t-borderSecondary'>
        <div className="w-full h-fit grid grid-cols-4 md:grid-cols-12 gap-4 md:gap-x-5 items-start px-3.5 md:px-5 lg:px-10">
          <Link
            href={"/"}
            className="aspect-[240/26] col-span-4 md:col-span-12 lg:col-span-3 mb-10 lg:mb-0"
            style={{
              width: "clamp(7.5rem, 6.964rem + 2.38vw, 8.75rem)",
              height: "clamp(2.25rem, 2.089rem + 0.71vw, 2.625rem)",
            }}
          >
            <img
              src="/images/common/rrplogo.png"
              alt="RRP Electronics"
              className="object-contain object-center h-full w-auto"
            />
          </Link>

          <div className="font-neueMontreal col-span-4 md:col-span-12 lg:col-span-9 grid grid-cols-2 gap-y-10 gap-x-3 md:flex md:flex-row md:justify-between md:gap-12 lg:w-fit lg:ml-auto">
            <div className="flex flex-col gap-4 md:gap-6 text-white">
              <strong className="text-bodyLarge font-normal">Company</strong>
              <ul className="flex flex-col gap-2 md:gap-4.5 text-white text-bodySmall">
                <li>
                  <Link href="#" className="text-textSecondary leading-[120%]">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-textSecondary leading-[120%]">
                    Our Journey
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-textSecondary leading-[120%]">
                    Leadership
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-3.5 md:gap-6 text-white">
              <strong className="text-bodyLarge font-normal">Solutions</strong>
              <ul className="flex flex-col gap-1.5 md:gap-4.5 text-white text-bodySmall">
                <li>
                  <Link href="#" className="text-textSecondary leading-[120%]">
                    Legacy Packaging
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-textSecondary leading-[120%]">
                    Advanced Packaging
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-textSecondary leading-[120%]">
                    FAB
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-textSecondary leading-[120%]">
                    Display Technologies
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-3.5 md:gap-6 text-white">
              <strong className="text-bodyLarge font-normal">Operations</strong>
              <ul className="flex flex-col gap-1.5 md:gap-4.5 text-white text-bodySmall">
                <li>
                  <Link href="#" className="text-textSecondary leading-[120%]">
                    Quality standards & Compliances
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-textSecondary leading-[120%]">
                    Supply Chain & Logistics
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-textSecondary leading-[120%]">
                    Traceability
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-3.5 md:gap-6 text-white">
              <strong className="block text-bodyLarge font-normal">
                Explore
              </strong>
              <ul className="flex flex-col gap-[6px] md:gap-4.5 text-white text-bodySmall">
                <li>
                  <Link href="#" className="text-textSecondary leading-[120%]">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-textSecondary leading-[120%]">
                    News & Events
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-textSecondary leading-[120%]">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-textSecondary leading-[120%]">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-4 text-textSecondary text-caption font-neueMontreal px-3.5 md:px-5 lg:px-10">
        <ul className="flex items-center gap-4">
          <li>
            <Link href={"#"} className="leading-[120%]">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href={"#"} className="leading-[120%]">
              Disclaimer
            </Link>
          </li>
          <li>
            <Link href={"#"} className="leading-[120%]">
              Sitemap
            </Link>
          </li>
        </ul>
        <p className="leading-[120%]">
          Copyright © {new Date().getFullYear()} RRP Electronics. All Rights
          Reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer