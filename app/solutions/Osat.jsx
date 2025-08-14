'use client';
import React from 'react';
import Image from 'next/image';
import BulletList from '@/app/components/BulletList'

const cardItems = [
  'Full-suite IC packaging.',
  'Scalable from prototyping to high-volume production',
  'Focused on reliability, performance, and turnaround time',
]

export default function Osat() {
  return (
    <section className="w-full h-full bg-white flex flex-col md:grid md:grid-cols-4 gap-5 px-3.5 md:px-10 py-10 md:py-16">
      <div className="col-span-2 flex flex-col justify-between">
        <div className="flex flex-col gap-4 pb-20 md:pb-0 justify-between">
          <h3 className="text-heading2 tracking-tight font-neueMontrealMd text-black leading-[110%]">
            OSAT (Outsourced Semiconductor Assembly and Test)
          </h3>
          <p className="text-textPrimary font-neueMontreal text-bodyBase leading-[120%] md:w-[80%]">
            From wafer to package, see how our world-class OSAT process delivers precision, 
            performance, and scalability at every stage of chip assembly and testing.
          </p>
        </div>
        <BulletList items={cardItems}/>
      </div>

      <div className="col-start-3 col-span-2 flex items-center justify-center">
        <div className="relative sm:aspect-square aspect-[590/442] w-full h-[248px] md:h-[442px]">
          <Image
            src="/images/solutions/solutions1.webp"
            alt="Chip Closeup"
            fill
            className="object-fill"
            priority
          />
        </div>
      </div>
    </section>
  )
}