"use client";
import React from "react";
import Banner from "@/app/components/Banner";
import Text from "@/app/components/Text";
import Leaders from "./Leaders";

const page = () => {
  return (
    <main className='"min-h-screen w-full relative"'>
      <Banner
        imgSrc={"/images/leadership/banner.webp"}
        heading={"Leaders of Innovation, \n Architects of the Future"}
      />
      <Text
        text={
          "Our leadership team brings decades of expertise in semiconductor R&D, advanced manufacturing, and global supply chain management, shaping the future of high-performance electronics."
        }
      />
      <Leaders />
    </main>
  );
};

export default page;
