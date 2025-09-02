"use client";
import React from "react";
import SectionHeader from "@/app/components/SectionHeader";
import { useTextAnimation } from "@/app/hooks/UseTextAnimation";

const WHY_RRP_DATA = [
  {
    icon: "/images/icons/memory.svg",
    title: "Work at the Forefront of Semiconductor Innovation",
    points: [
      "India's premier packaging facility, leading advanced packaging & testing.",
      "State-of-the-art technology and manufacturing processes.",
      "A culture of continuous learning and breakthrough innovation",
    ],
  },
  {
    icon: "/images/icons/globe.svg",
    title: "Global Exposure & Collaboration",
    points: [
      "Work with international semiconductor leaders and technology partners.",
      "Gain hands-on experience in a rapidly evolving global industry.",
      "Be part of strategic projects shaping the future of chip manufacturing.",
    ],
  },
  {
    icon: "/images/icons/moving.svg",
    title: "Career Growth & Learning",
    points: [
      "Upskilling programs in semiconductor packaging and R&D.",
      "Leadership training and mentorship from industry veterans.",
      "Opportunities to contribute to real-world innovations.",
    ],
  },
];

const WhyItem = React.memo(({ item, idx }) => {
  const borderClass =
    idx === 0
      ? "border-y-1 border-y-borderPrimary"
      : "border-b-1 border-b-borderPrimary";

  return (
    <li
      className={`grid grid-cols-4 gap-x-3 md:gap-x-5 gap-y-4 py-6 ${borderClass}`}
    >
      <img
        src={item.icon}
        alt={item.title}
        className="w-8 h-8 lg:h-10 lg:w-10 col-span-4 md:col-span-1"
        loading="lazy"
      />
      <p
        data-animate-text
        className="text-black text-heading4 leading-[115%] col-span-4 md:col-span-2"
      >
        {item.title}
      </p>
      <ul className="col-span-4 md:col-span-1 flex flex-col gap-y-2 list-disc text-textPrimary marker:text-textSecondary ml-4 md:ml-0">
        {item.points.map((point, pointIdx) => (
          <li
            data-animate-text
            key={pointIdx}
            className="text-bodySmall leading-[120%] font-neueMontreal"
          >
            {point}
          </li>
        ))}
      </ul>
    </li>
  );
});

WhyItem.displayName = "WhyItem";

const Why = () => {
  const { containerRef } = useTextAnimation();
  return (
    <section className="h-fit w-full py-10 md:py-15 bg-whiteBg">
      <SectionHeader
        heading={"Why RRP? \n Where Innovation Meets \n Opportunity"}
        text="Join a team shaping the future of semiconductors. Work on cutting-edge technology, collaborate with global leaders, and accelerate your career in a dynamic, high-growth industry."
      />
      <ul ref={containerRef} className="w-full h-fit px-3.5 md:px-5 lg:px-10">
        {WHY_RRP_DATA.map((item, idx) => (
          <WhyItem key={idx} item={item} idx={idx} />
        ))}
      </ul>
    </section>
  );
};

export default Why;