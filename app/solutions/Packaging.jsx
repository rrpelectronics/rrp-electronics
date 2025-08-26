"uise client";
import React from 'react';
import { useTextAnimation } from '@/app/hooks/UseTextAnimation';

const Packaging = () => {
  const { containerRef } = useTextAnimation();
  return (
    <section
      ref={containerRef}
      className="h-fit w-full grid grid-cols-4 sm:grid-cols-12 gap-x-3 md:gap-x-5 gap-y-6 px-3.5 md:px-5 lg:px-10 py-10 md:py-15 items-stretch"
    >
      <div className="col-span-4 sm:col-span-12 lg:col-span-3 lg:pt-15 mb-8 md:mb-10">
        <h3
          data-animate-text
          className="text-heading2 tracking-heading2 leading-[110%] mb-5"
        >
          Advanced Packaging
        </h3>
        <p
          data-animate-text
          className="text-bodyBase text-textPrimary font-neueMontreal leading-[120%] max-w-[590px]"
        >
          Through our collaboration with DECA Technologies a global leader in
          advanced packaging. we bring fan-out wafer-level packaging (FOWLP) and
          high-density RDL interconnect innovations to the Indian market.
        </p>
      </div>
      <div className="bg-whiteBg flex flex-col justify-between gap-y-6 aspect-square lg:aspect-[285/400] col-span-4 lg:col-span-3 px-4 pt-4 pb-4 lg:pt-15 lg:pb-4">
        <p data-animate-text className="text-heading2 text-primary leading-[110%] tracking-heading2">
          1
        </p>
        <p data-animate-text className="text-heading4 sm:text-bodyLarge lg:text-heading4 leading-[115%] text-black">
          Ultra-compact form factors with enhanced electrical performance
        </p>
      </div>
      <div className="bg-whiteBg flex flex-col justify-between gap-y-6 aspect-square lg:aspect-[285/400] col-span-4 lg:col-span-3 px-4 pt-4 pb-4 lg:pt-15 lg:pb-4">
        <p data-animate-text className="text-heading2 text-primary leading-[110%] tracking-heading2">
          2
        </p>
        <p data-animate-text className="text-heading4 sm:text-bodyLarge lg:text-heading4 leading-[115%] text-black">
          Ideal for mobile, AI, automotive, and high-performance computing applications
        </p>
      </div>
      <div className="bg-whiteBg flex flex-col justify-between gap-y-6 aspect-square lg:aspect-[285/400] col-span-4 lg:col-span-3 px-4 pt-4 pb-4 lg:pt-15 lg:pb-4">
        <p data-animate-text className="text-heading2 text-primary leading-[110%] tracking-heading2">
          3
        </p>
        <p data-animate-text className="text-heading4 sm:text-bodyLarge lg:text-heading4 leading-[115%] text-black">
          Ideal for mobile, AI, automotive, and high-performance computing
          applications
        </p>
      </div>
    </section>
  );
}

export default Packaging