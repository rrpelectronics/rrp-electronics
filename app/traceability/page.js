'use client';
import React from 'react';
import Banner from '@/app/components/Banner';
import StackCards from '@/app/components/StackCards';

const cardsData = [
    {
      zIndex: 10,
      title: "Unique Marking & Identification",
      desc: "Every chip we produce is uniquely traceable—engineered for transparency, accountability, and global supply chain confidence.",
      items: [
        "Each chip is uniquely marked with year, week, and lot information.",
        "Enables fast, reliable tracking across the global supply chain",
        "Simplifies warranty validation and product lineage tracing.",
        "Supports efficient recalls and quality audits when needed.",
      ],
      img: "/images/traceability/traceability1.webp",
    },
    {
      zIndex: 20,
      title: "Real-Time Production Tracking",
      desc: "We harness intelligent software to monitor every production step in real time—ensuring transparency, traceability, and accountability from start to finish.",
      items: [
        "Comprehensive tracking of lot numbers, yield data, and processing stages.",
        "Real-time insights into lot sizes, processing times, and current production status",
        "Instant access to critical data for audits, failure analysis, and compliance checks",
      ],
      img: "/images/traceability/traceability2.webp",
    },
    {
      zIndex: 30,
      title: "Lot-Labeling & Secure Packaging",
      desc: "Every unit that leaves our facility—whether it’s packed in trays, tubes, or reels—comes with a clear label that includes the lot number and production date. Our automated labeling system guarantees",
      items: [
        "Clear and tamper-proof identification",
        "Adherence to customer and industry standards",
        "Easier storage, handling, and traceability after shipment",
      ],
      img: "/images/traceability/traceability3.webp",
    },
  ];

const traceability = () => {
  return (
    <main className='min-h-screen w-full relative overflow-hidden'>
      <Banner imgSrc={"/images/traceability/banner.webp"} heading={"End-to-End Traceability \n You Can Trust"} text={"Ensuring Precision, Accountability, and Quality at Every Stage of Semiconductor Manufacturing"}/> 
      <StackCards cardsData={cardsData}/>
    </main>
  )
}

export default traceability