"use client";
import React from "react";
import Image from "next/image";
import SectionHeader from "@/app/components/SectionHeader";
import { leadersData } from "./leadersData";
import { useAppContext } from "../components/AppContext";
import Popup from "@/app/components/Popup";

const Leaders = () => {
  const { state, setState } = useAppContext();

  const handleCardClick = (id) => {
    setState((prev) => ({ ...prev, selectedIndex: id, isActive: true }));
  };

  return (
    <section className="h-fit w-full py-10 md:py-15 bg-white">
      <SectionHeader
        heading="Meet Our Experts"
        text="Our leadership consists of visionary engineers, business strategists, and industry pioneers, committed to driving RRP Electronics' global expansion."
      />
      <div className="h-fit w-full flex flex-wrap md:gap-x-22.5 gap-y-6 sm:gap-y-8 md:gap-y-10 justify-around md:justify-center items-center px-3.5 md:px-5 lg:px-10">
        {leadersData.map((leader, idx) => (
          <div
            key={idx}
            className="w-full sm:w-[45vw] md:w-[40vw] xl:w-[25%] aspect-[332/386] h-fit flex flex-col gap-y-4"
          >
            <div
              onClick={() => handleCardClick(leader.id)}
              onKeyDown={(e) => e.key === "Enter" && handleCardClick(leader.id)}
              className="relative aspect-square w-full cursor-pointer"
            >
              <Image
                src={leader.imgPath}
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
                {leader.position}
              </p>
            </div>
          </div>
        ))}

        {state.isActive && <Popup />}
      </div>
    </section>
  );
};

export default Leaders;
