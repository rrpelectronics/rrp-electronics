'use client';
import React from 'react';
import Banner from '@/components/BannerStack';
import Text from "@/components/Text";
import StackCards from '@/components/StackCards';
import Certifications from './Certifications';

const cardsData = [
  {
    zIndex: 10,
    title: "Quality Policy",
    desc: "We are committed to delivering precision-driven, globally compliant semiconductor solutions with zero compromise on quality.",
    items: [
      "We exceed customer expectations with performance-first, precision manufacturing.",
      "Our systems comply with global quality and regulatory standards.",
      "We continuously audit and refine processes for optimal output.",
      "Every step—from material to final test—is governed by rigorous quality checks.",
    ],
    img: "/images/compliances/quality1.webp",
    imgPos: "object-center",
  },
  {
    zIndex: 20,
    title: "Quality Statement",
    desc: "Quality is not a checkpoint—it’s how we work. At RRP Electronics, every product reflects our commitment to precision, transparency, and continuous improvement.",
    items: [
      "We deliver with precision and flawless execution at every stage.",
      "Transparent processes ensure accountability and trust.",
      "We foster a culture of innovation and constant improvement.",
      "Our commitment to quality ensures reliable, high-performance outcomes.",
    ],
    img: "/images/compliances/quality2.webp",
    imgPos: "object-center",
  },
  {
    zIndex: 30,
    title: "Quality Foundation",
    desc: "Built on a Zero-Defect Philosophy, our foundation is defined by precision, prevention, and an uncompromising commitment to excellence.",
    items: [
      "We ensure every detail is meticulously engineered for perfection.",
      "Our goal: zero defects across every production batch.",
      "We proactively manage risks before they impact quality.",
      "Root cause elimination drives consistent and reliable performance.",
    ],
    img: "/images/compliances/quality3.webp",
    imgPos: "object-center",
  },
];

export const compliances = () => {
  return (
    <main className="min-h-screen w-full relative overflow-clip">
      <Banner imgSrc={"/images/compliances/banner.webp"} heading={"Driven by Excellence, \n Guided by Standards"}/>
      <Text text={"We Deliver Semiconductors Built on a Foundation of Quality, Precision, and Compliance"}/>
      <StackCards cardsData={cardsData}/>
      <Certifications/>
    </main>
  )
}

export default compliances;
