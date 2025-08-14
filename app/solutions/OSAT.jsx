'use client'
import Image from 'next/image'

export default function Osat() {
  const cardItems = [
    { text: 'Full-suite IC packaging.' },
    { text: 'Scalable from prototyping to high-volume production' },
    { text: 'Focused on reliability, performance, and turnaround time' },
  ]

  const renderCardItems = (items) =>
    items.map((item, idx) => (
      <div
        key={idx}
        className={`flex items-center gap-2 py-4 md:py-5 ${
          idx === 0
            ? "border-y-1 border-y-borderPrimary"
            : "border-b-1 border-b-borderPrimary"
        }`}
      >
        <Image
          src="/Images/icons/operation.svg"
          alt={`Icon ${idx + 1}`}
          width={24}
          height={24}
          className="shrink-0"
        />
        <span className="text-bodyBase text-grey leading-[110%] font-neueMontreal">
          {item.text}
        </span>
      </div>
    ));

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
          <div className="text-textPrimary font-neueMontreal text-bodyBase flex flex-col">
            {renderCardItems(cardItems)}
          </div>
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