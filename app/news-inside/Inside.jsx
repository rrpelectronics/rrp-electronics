'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Inside() {
  return (
    <section className="grid grid-cols-4 px-3.5 md:px-5 lg:px-10  pt-25 md:pt-32 lg:pt-35 pb-10 md:pb-15">
      <div className="col-span-4 lg:col-start-2 lg:col-end-4 flex flex-col gap-5 mb-8">
        <h3 className="text-heading2 text-black leading-[110%] tracking-[-0.8px]">
          Tendulkar-backed RRP Electronics unveils semiconductor facility in
          Maharashtra
        </h3>
        <div className="flex justify-between">
          <p className="text-textPrimary text-bodySmall font-neueMontreal leading-[120%]">
            March 28&nbsp;&nbsp;|&nbsp;&nbsp;India Business Journal
          </p>
          <Link
            href="#"
            className="text-bodySmall font-neueMontreal block underline decoration-solid decoration-primary text-primary"
            aria-label="Share this article"
          >
            Share Article
          </Link>
        </div>
      </div>

      <div className="col-span-4 flex justify-center">
        <div className="w-full aspect-video sm:aspect-[3/2] sm:h-[60vh] relative">
          <Image
            src="/Images/inside/inside.webp"
            alt="Semiconductor facility unveiling"
            fill
            className="object-cover object-top"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
        </div>
      </div>

      <div className="col-span-4 lg:col-start-2 lg:col-end-4 mb-10 mt-8">
        <p className="text-textPrimary text-bodyLarge font-neueMontreal leading-[120%]">
          Mumbai (Maharashtra) [India], September 23: Shuki Schwartz CEO of
          Meprolight and Rajendra K Chodankar CEO of RRP S4E Unite to Strengthen
          India's Defense Manufacturing By Launching their State-of-the-Art
          Production Line in India.
        </p>
      </div>

      <div className="col-span-4 lg:col-start-2 lg:col-end-4 flex flex-col gap-5">
        <h2 className="text-heading4 text-black leading-[115%]">
          A Proud Partner in Prime Minister Shri Narendra Modi's initiative
          'Made in India'
        </h2>
        <p className="text-textPrimary text-bodyBase font-neueMontreal leading-[120%]">
          In a remarkable stride towards bolstering India's defence capabilities
          and aligning with Prime Minister Narendra Modi's visionary 'Made In
          India' initiative, Meprolight, the premier manufacturer and global
          supplier of top-grade Optical Sights, Self-illuminated Sights for
          firearms, NV, and Thermal Devices, has officially opened its
          state-of-the-art production line in India in collaboration with RRP
          S4E. This monumental collaboration marks the company's unwavering
          commitment to serving India's defence forces with cutting-edge
          technology and innovative products.
        </p>
        <p className="text-textPrimary text-bodyBase font-neueMontreal leading-[120%]">
          As part of the renowned SK Group, an Israeli Group, Meprolight has
          proudly operated in India for over 17 years, providing advanced
          solutions for various governmental customers. Its long-standing
          partnership with Indian defence and security forces is a testament to
          the brand's dedication to quality, reliability, and service.
        </p>
        <p className="text-textPrimary text-bodyBase font-neueMontreal leading-[120%]">
          Meprolight's high-performance products — from optical sights,
          self-illuminated firearm sights, and night vision (NV) systems, to
          thermal devices — have consistently proven themselves in combat and
          continue to serve the nation's soldiers in challenging operational
          environments.
        </p>
        <p className="text-textPrimary text-bodyBase font-neueMontreal leading-[120%]">
          Rajendra K Chodankar and his exceptional team, RRP S4E, stand as vital
          pillars in this success story. Their professionalism and unwavering
          efforts have significantly contributed to the enduring partnership
          between Meprolight and Indian forces. The bond between Meprolight and
          RRP S4E exemplifies the synergy where "1+1 becomes much more than 2,"
          a harmonious collaboration that paves the way for enhanced innovation
          and success.
        </p>
      </div>

      <div className="col-span-4 lg:col-start-2 lg:col-end-4 flex justify-center mt-8 mb-8">
        <div className="w-full md:w-[585px] h-[438px] relative">
          <Image
            src="/Images/inside/inside2.webp"
            alt="Content visual"
            fill
            className="object-cover"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 585px"
          />
        </div>
      </div>

      <div className="col-span-4 lg:col-start-2 lg:col-end-4 mb-10">
        <p className="text-textPrimary text-bodyBase font-neueMontreal leading-[120%]">
          We are incredibly fortunate to be tied with Mr. Rajendra K Chodankar
          and his wonderful, professional team and I am sure they are not saving
          any effort to push and create our success and I want to thank them
          very much for that Meprolight's offerings boast unmatched quality,
          combat-proven durability, and long product life, with many of its
          sights and systems, installed 15 years ago, still actively serving
          Indian soldiers today.
        </p>
      </div>

      <div className="col-span-4 lg:col-start-2 lg:col-end-4 flex flex-col">
        <h2 className="text-heading4 text-black leading-[115%] mb-5">
          Rajendra K Chodankar, CEO of RRP S4E, remarked
        </h2>
        <p className="text-textPrimary text-bodyBase font-neueMontreal leading-[120%] mb-2">
          "This collaboration with Meprolight is not just a partnership but a
          shared commitment to fortifying India's defense capabilities with
          world-class technology. We are proud to play a role in supporting
          Prime Minister Modi's 'Made in India' initiative, ensuring that our
          armed forces are equipped with the best tools to protect the nation.
          Together, we are not only manufacturing products but building a legacy
          of innovation, trust, and national pride,
        </p>
        <p className="text-textPrimary text-bodyBase font-neueMontreal leading-[120%]">
          With a shared vision of progress, innovation, and strength, Shuki
          Schwartz CEO of Meprolight and Rajendra K Chodankar CEO of RRP S4E are
          set to seize every significant opportunity that comes their way,
          offering the Indian forces not just products, but a promise — a
          promise of unparalleled quality, resilience, and national pride.
        </p>
      </div>
    </section>
  );
}