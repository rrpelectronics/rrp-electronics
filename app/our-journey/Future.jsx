"use client";
import React from 'react';
import SectionHeader from '@/app/components/SectionHeader';
import { useTextAnim } from '@/app/hooks/useTextAnim';

const Future = () => {
  const { containerRef } = useTextAnim();

  return (
    <section className="h-fit w-full py-10 md:py-15 bg-white">
      <SectionHeader
        heading={"The Road Ahead – \n Innovating for the Future"}
        text={"Our journey doesn’t stop here. We are relentlessly focused on:"}
      />
      <div ref={containerRef} className="grid grid-cols-12 gap-x-3 md:gap-x-5 gap-y-6 px-3.5 md:px-5 lg:px-10 items-stretch">
        <div className="md:gap-y-20 lg:gap-y-0 col-span-12 md:col-span-4 bg-whiteBg aspect-[387/290] w-full flex flex-col justify-between p-4">
          <img
            src="/images/icons/biotech.svg"
            alt="Expanding R&D"
            className="h-7 w-7 md:h-10 md:w-10"
          />
          <div className="flex flex-col gap-y-2">
            <p data-animate-text className="text-heading4 leading-[115%] text-black">
              Expanding R&D
            </p>
            <p data-animate-text className='text-textPrimary text-bodySmall leading-[120%] font-neueMontreal'>To push semiconductor tech beyond limits.</p>
          </div>
        </div>
        <div className="md:gap-y-20 lg:gap-y-0 col-span-12 md:col-span-4 bg-whiteBg aspect-[387/290] w-full flex flex-col justify-between p-4">
          <img
            src="/images/icons/settings.svg"
            alt="Advancing Automation"
            className="h-7 w-7 md:h-10 md:w-10"
          />
          <div className="flex flex-col gap-y-2">
            <p data-animate-text className="text-heading4 leading-[115%] text-black">
              Advancing Automation
            </p>
            <p data-animate-text className='text-textPrimary text-bodySmall leading-[120%] font-neueMontreal'>To enhance efficiency, precision, and sustainability.</p>
          </div>
        </div>
        <div className="md:gap-y-20 lg:gap-y-0 col-span-12 md:col-span-4 bg-whiteBg aspect-[387/290] w-full flex flex-col justify-between p-4">
          <img
            src="/images/icons/partners.svg"
            alt="Building Strategic Partnerships"
            className="h-7 w-7 md:h-10 md:w-10"
          />
          <div className="flex flex-col gap-y-2">
            <p data-animate-text className="text-heading4 leading-[115%] text-black">
              Building Strategic Partnerships
            </p>
            <p data-animate-text className='text-textPrimary text-bodySmall leading-[120%] font-neueMontreal'>To shape the future of electronics manufacturing.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Future;