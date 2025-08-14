'use client'
import Image from 'next/image'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function QualityCards() {
  const sectionRef = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: true,
        },
      })

      tl.fromTo(
        cardRefs.current[1],
        { yPercent: 100 },
        { yPercent: 0, duration: 0.5, ease: "linear" }
      ).fromTo(
        cardRefs.current[2],
        { yPercent: 100 },
        { yPercent: 0, duration: 0.5, ease: "linear" }
      );
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const cardsData = [
    {
      zIndex: 10,
      title: 'Unique Marking & Identification',
      desc: 'Every chip we produce is uniquely traceable—engineered for transparency, accountability, and global supply chain confidence.',
      textSize: 'text-bodyBase',
      items: [
        'Each chip is uniquely marked with year, week, and lot information.',
        'Enables fast, reliable tracking across the global supply chain',
        'Simplifies warranty validation and product lineage tracing.',
        'Supports efficient recalls and quality audits when needed.',
      ],
      img: '/images/traceability/traceability1.webp',
    },
    {
      zIndex: 20,
      title: 'Real-Time Production Tracking',
      desc: 'We harness intelligent software to monitor every production step in real time—ensuring transparency, traceability, and accountability from start to finish.',
      textSize: 'text-bodyBase',
      items: [
        'Comprehensive tracking of lot numbers, yield data, and processing stages.',
        'Real-time insights into lot sizes, processing times, and current production status',
        'Instant access to critical data for audits, failure analysis, and compliance checks',
      ],
      img: '/images/traceability/traceability2.webp',
    },
    {
      zIndex: 30,
      title: 'Lot-Labeling & Secure Packaging',
      desc: 'Every unit that leaves our facility—whether it’s packed in trays, tubes, or reels—comes with a clear label that includes the lot number and production date. Our automated labeling system guarantees',
      textSize: 'text-bodyBase',
      items: [
        'Clear and tamper-proof identification',
        'Adherence to customer and industry standards',
        'Easier storage, handling, and traceability after shipment',
      ],
      img: '/images/traceability/traceability3.webp',
    },
  ]

  const renderCardItems = (items, textSize) =>
  items.map((text, idx) => (
    <div
      key={idx}
      className={`flex items-start gap-2 py-4 md:py-5  ${
        idx === 0
          ? "border-y-1 border-y-borderPrimary"
          : "border-b-1 border-b-borderPrimary"
      }`}
    >
      <img
        src="/images/icons/operation.svg"
        alt={`Icon ${idx + 1}`}
        className="w-4.5 h-4.5 md:h-6 md:w-6 shrink-0"
      />
      <span
        className={`${textSize} text-grey leading-[120%] font-neueMontreal`}
      >
        {text}
      </span>
    </div>
  ));

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-white flex flex-col gap-10 md:gap-15 items-center justify-center"
    >
      {cardsData.map((card, id) => (
        <div
          ref={(el) => (cardRefs.current[id] = el)}
          key={id}
          style={{
            zIndex: `z-${card.zIndex}`,
          }}
          className={`absolute top-0 left-0 w-full h-screen bg-white grid grid-cols-4 gap-x-3 md:gap-x-5`}
        >
          <div className="col-span-2 flex flex-col justify-between pl-3.5 md:pl-5 lg:pl-10 py-10">
            <div className="flex flex-col gap-5 md:gap-6">
              <h3 className="text-heading2 font-neueMontrealMd text-black leading-[110%]">
                {card.title}
              </h3>
              <p
                className={`text-textPrimary font-neueMontreal ${card.textSize} leading-[120%]`}
              >
                {card.desc}
              </p>
            </div>
            <div
              className={`text-textPrimary font-neueMontreal ${card.textSize} flex flex-col`}
            >
              {renderCardItems(card.items, card.textSize)}
            </div>
          </div>
          <div className="col-span-2 flex items-center justify-center">
            <div
              style={{
                width: "calc(100% - 20px)",
              }}
              className="relative h-screen ml-auto mr-0"
            >
              <Image
                src={card.img}
                alt={card.title}
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
