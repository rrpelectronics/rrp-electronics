import React from "react";
import HeadingCenter from "@/components/HeadingCenter";
import { useTextAnim } from "@/hooks/useTextAnim";

const Impact = () => {
  const { containerRef } = useTextAnim();
  return (
    <section className="h-fit w-full grid grid-cols-4 gap-x-3 md:gap-x-5 px-3.5 md:px-5 lg:px-10 py-10 md:py-15 bg-whiteBg">
      <HeadingCenter heading={"Our Impact"} />
      <ul ref={containerRef} className="col-span-4 grid grid-cols-4">
        <li className="col-span-4 grid grid-cols-subgrid gap-x-3 md:gap-x-5 py-5 md:py-6 border-y-1 border-y-borderPrimary">
          <p
            data-animate-text
            className="col-span-1 text-primary text-heading4 leading-[115%]"
          >
            01
          </p>
          <p
            data-animate-text
            className="mt-3.5 col-span-4 lg:col-span-2 text-black text-heading4 leading-[115%]"
          >
            Strengthening India's Semiconductor <br /> Ecosystem
          </p>
          <p
            data-animate-text
            className="col-span-4 md:w-[90%] mt-4 md:mt-6 lg:mt-0 lg:col-span-1 2xl:w-[96%] text-bodySmall text-textPrimary leading-[120%] font-neueMontreal"
          >
            As Maharashtra’s first semiconductor company, RRP Electronics is
            driving self-reliance by building local capabilities and reducing
            dependency on global supply chains.
          </p>
        </li>
        <li className="col-span-4 grid grid-cols-subgrid gap-x-3 md:gap-x-5 py-5 md:py-6 border-b-1 border-b-borderPrimary">
          <p
            data-animate-text
            className="col-span-1 text-primary text-heading4 leading-[115%]"
          >
            02
          </p>
          <p
            data-animate-text
            className="mt-3.5 col-span-4 lg:col-span-2 text-black text-heading4 leading-[115%]"
          >
            Accelerating Industry-Wide <br /> Innovation
          </p>
          <p
            data-animate-text
            className="col-span-4 md:w-[90%] mt-4 md:mt-6 lg:mt-0 lg:col-span-1 2xl:w-[96%] text-bodySmall text-textPrimary leading-[120%] font-neueMontreal"
          >
            With cutting-edge OSAT services and smart manufacturing, RRP
            delivers high-quality semiconductor solutions that power
            advancements across consumer electronics, automotive, and industrial
            sectors.
          </p>
        </li>
        <li className="col-span-4 grid grid-cols-subgrid gap-x-3 md:gap-x-5 py-5 md:py-6 border-b-1 border-b-borderPrimary">
          <p
            data-animate-text
            className="col-span-1 text-primary text-heading4 leading-[115%]"
          >
            03
          </p>
          <p
            data-animate-text
            className="mt-3.5 col-span-4 lg:col-span-2 text-black text-heading4 leading-[115%]"
          >
            Championing Sustainable, <br /> Future-Ready Manufacturing
          </p>
          <p
            data-animate-text
            className="col-span-4 md:w-[90%] mt-4 md:mt-6 lg:mt-0 lg:col-span-1 2xl:w-[96%] text-bodySmall text-textPrimary leading-[120%] font-neueMontreal"
          >
            Through green energy practices, cleanroom infrastructure, 
            and automation, RRP Electronics is setting new standards in sustainable, 
            high-precision electronics production.
          </p>
        </li>
      </ul>
    </section>
  );
};

export default Impact;
