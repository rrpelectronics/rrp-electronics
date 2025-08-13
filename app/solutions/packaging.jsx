'use client'

import Image from 'next/image'

export default function AdvancedPackaging() {
  const cards = [
    { title: 'Designed for innovation and customization' },
    { title: 'Access to DECA’s revolutionary packaging technologies' },
    { title: 'Optimized for agile development in IR and photonic technologies' },
  ]

  return (
    <section className="bg-white px-3.5 md:px-10 py-16">
      <div className="grid grid-cols-4 gap-5">
        <div className="col-span-4 md:col-span-2 flex flex-col gap-5">
          <h2 className="text-heading2 tracking-heading2 leading-[110%]">
            Advanced Packaging
          </h2>
          <p className="font-neueMontreal text-bodyBase text-grey leading-[120%]">
            Through our collaboration with DECA Technologies, a global leader in advanced
            packaging, we bring fan-out wafer-level packaging (FOWLP) and high-density
            RDL interconnect innovations to the Indian market.
          </p>
        </div>

        <div className="col-span-4 md:col-span-2 grid grid-cols-1 md:grid-cols-2 grid-rows-3 md:grid-rows-3 relative">
          <Card
            title={cards[0].title}
            className="w-full h-full bg-darkBg text-white md:col-start-1 row-start-1"
            icon="/Images/icons/packaging1.svg"
          />
          <Card
            title={cards[1].title}
            className="w-full h-full bg-whiteBg text-black md:col-start-2 row-start-2"
            icon="/Images/icons/packaging2.svg"
          />
          <Card
            title={cards[2].title}
            className="w-full h-full bg-primary text-white md:col-start-1 row-start-3"
            icon="/Images/icons/packaging3.svg"
          />
        </div>
        
      </div>
    </section>
  )
}

function Card({ title, className, icon }) {
  return (
    <div
      className={`relative flex flex-col justify-between p-4 bg-lightestGrey aspect-square w-[283px] h-[283px] ${className}`}
    >
      <Image
        src={icon}
        alt="Card Icon"
        width={40}
        height={40}
        className="rounded"
      />
      <div className="mt-auto text-[24px] leading-[114%]">
        {title}
      </div>
    </div>
  )
}
