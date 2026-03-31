"use client";
import React from 'react';
import SectionHeader from '@/components/SectionHeader';

const Culture = () => {

  return (
    <section className="h-fit w-full py-10 md:py-15 bg-white">
      <SectionHeader
        heading={"Our Culture. \n Our Strength."}
        text={
          "At RRP Electronics, we believe that culture isn't what happens outside the work — it’s how the work happens. It’s the way we think, the way we support each other, and the way we move the industry forward together."
        }
      />
      <ul className="grid grid-cols-4 gap-y-6 gap-x-3 md:gap-x-5 px-3.5 md:px-5 lg:px-10">
        <li className="col-span-4 sm:col-span-2 lg:col-span-1 w-full h-[248px] p-4 bg-whiteBg flex flex-col justify-between">
          <p data-animate-text className="text-black text-heading4 leading-[115%]">
            Curiosity Over Convention
          </p>
          <p data-animate-text className="text-textPrimary text-bodySmall leading-[120%] font-neueMontreal">
            We champion exploration and original thinking because breakthrough
            ideas begin with bold questions.
          </p>
        </li>
        <li className="col-span-4 sm:col-span-2 lg:col-span-1 w-full h-[248px] p-4 bg-whiteBg flex flex-col justify-between">
          <p data-animate-text className="text-black text-heading4 leading-[115%]">
            Respect at Every Level
          </p>
          <p data-animate-text className="text-textPrimary text-bodySmall leading-[120%] font-neueMontreal">
            We treat every voice with equal value building a workplace that’s
            inclusive, safe, and supportive for all.
          </p>
        </li>
        <li className="col-span-4 sm:col-span-2 lg:col-span-1 w-full h-[248px] p-4 bg-whiteBg flex flex-col justify-between">
          <p data-animate-text className="text-black text-heading4 leading-[115%]">
            Collaboration Without Borders
          </p>
          <p data-animate-text className="text-textPrimary text-bodySmall leading-[120%] font-neueMontreal">
            Our teams work across roles, departments, and experience levels
            great ideas come from everywhere.
          </p>
        </li>
        <li className="col-span-4 sm:col-span-2 lg:col-span-1 w-full h-[248px] p-4 bg-whiteBg flex flex-col justify-between">
          <p data-animate-text className="text-black text-heading4 leading-[115%]">
            Purpose in Every Project
          </p>
          <p data-animate-text className="text-textPrimary text-bodySmall leading-[120%] font-neueMontreal">
            From sustainability to social impact, we take responsibility for
            more than just output. We’re building with intention.
          </p>
        </li>
      </ul>
    </section>
  );
}

export default Culture;
