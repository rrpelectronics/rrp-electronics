'use client';
import React from 'react';
import Banner from '@/components/BannerStack';
import Text from '@/components/Text';
import StackCards from '@/components/StackCards';
import Map from './Map';

const cardsData = [
  {
    zIndex: 10,
    title: "Supply Chain Efficiency",
    desc: "From inventory management to last-mile delivery, we offer complete visibility and control throughout the supply chain. Our processes are designed to minimize delays and maximize accuracy.",
    items: [
      "Streamlined inventory & order management",
      "Integrated warehousing and dispatch system",
      "Responsive logistics support for bulk or custom orders",
    ],
    img: "/images/logistics/logistic1.webp",
    imgPos: "object-top",
  },
  {
    zIndex: 20,
    title: "Prime Location Advantage",
    desc: "Located just 30 kilometers from Mumbai International Airport and in close proximity to major ports, our facility is strategically positioned for optimal inbound and outbound logistics. Whether by air or sea, your shipments benefit from reduced transit times and cost-effective transportation.",
    items: [
      "Fast access to international air cargo routes",
      "Immediate port connectivity for maritime shipments",
      "Reduced lead times and improved operational efficiency",
    ],
    img: "/images/logistics/logistic2.webp",
    imgPos: "object-center",
  },
];

export const logistics = () => {
  return (
    <main className="min-h-screen w-full relative overflow-clip">
      <Banner imgSrc={"/images/logistics/banner.webp"} heading={"Strategically Located for Seamless Supply Chain & Logistics"}/>
      <Text text={"Global Reach, Local Advantage – Efficient and Reliable Delivery from the Heart of Mumbai"}/>
      <StackCards cardsData={cardsData} />
      <Map/>
    </main>
  )
}

export default logistics;
