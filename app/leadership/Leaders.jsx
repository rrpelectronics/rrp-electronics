"use client";
import React from "react";
import Image from "next/image";
import SectionHeader from "@/app/components/SectionHeader";

const leadersData = [
  {
    name: "Prashant Deshmukh",
    role: "Managing Director (MD)",
    img: "/images/leadership/prashant-deshmukh-card.webp",
  },
  {
    name: "George Abraham Vithayathil",
    role: "Esteemed Advisors, Independent Director",
    img: "/images/leadership/george-card.webp",
  },
  {
    name: "Sachin Tendulkar",
    role: "Our Strategic Investor",
    img: "/images/leadership/sachin-tendulkar-card.webp",
  },
  {
    name: "Dr. Anil Kakodkar",
    role: "Our Mentor",
    img: "/images/leadership/anil-kakodkar-card.webp",
  },
  {
    name: "Lt. Gen. R R Nimbhorkar",
    role: "Former Officer, Indian Army",
    img: "/images/leadership/rr-nimbhorkar-card.webp",
  },
];

const Leaders = () => {
  return (
    <section className="h-fit w-full py-10 md:py-15 bg-white">
      <SectionHeader
        heading="Meet Our Experts"
        text="Our leadership consists of visionary engineers, business strategists, and industry pioneers, committed to driving RRP Electronics’ global expansion."
      />
      <div className="h-fit w-full flex flex-wrap md:gap-x-22.5 gap-y-6 sm:gap-y-8 md:gap-y-10 justify-around md:justify-center items-center px-3.5 md:px-5 lg:px-10">
        {leadersData.map((leader, idx) => (
          <div
            key={idx}
            className="w-full sm:w-[45vw] md:w-[40vw] xl:w-[25%] aspect-[332/386] h-fit flex flex-col gap-y-4"
          >
            <div className="relative aspect-square w-full">
              <Image
                src={leader.img}
                alt={leader.name}
                fill
                sizes="100%"
                className="object-cover object-center"
              />
            </div>
            <div className="flex flex-col gap-y-1.5 lg:gap-y-2">
              <p className="text-black text-heading4 leading-[115%]">
                {leader.name}
              </p>
              <p className="text-bodySmall text-textPrimary leading-[120%] font-neueMontreal">
                {leader.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Leaders;
