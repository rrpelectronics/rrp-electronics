'use client'
import Image from 'next/image'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function QualityCards() {
  const sectionRef = useRef(null)
  const card1Ref = useRef(null)
  const card2Ref = useRef(null)
  const card3Ref = useRef(null)

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
        card2Ref.current,
        { yPercent: 100 },
        { yPercent: 0, duration: 0.5, ease: 'linear' }
      ).fromTo(
        card3Ref.current,
        { yPercent: 100 },
        { yPercent: 0, duration: 0.5, ease: 'linear' }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const cardsData = [
    {
      ref: card1Ref,
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
      img: '/Images/traceability/traceability1.webp',
    },
    {
      ref: card2Ref,
      zIndex: 20,
      title: 'Real-Time Production Tracking',
      desc: 'We harness intelligent software to monitor every production step in real time—ensuring transparency, traceability, and accountability from start to finish.',
      textSize: 'text-bodyBase',
      items: [
        'Comprehensive tracking of lot numbers, yield data, and processing stages.',
        'Real-time insights into lot sizes, processing times, and current production status',
        'Instant access to critical data for audits, failure analysis, and compliance checks',
      ],
      img: '/Images/traceability/traceability2.webp',
    },
    {
      ref: card3Ref,
      zIndex: 30,
      title: 'Lot-Labeling & Secure Packaging',
      desc: 'Every unit that leaves our facility—whether it’s packed in trays, tubes, or reels—comes with a clear label that includes the lot number and production date. Our automated labeling system guarantees',
      textSize: 'text-bodyBase',
      items: [
        'Clear and tamper-proof identification',
        'Adherence to customer and industry standards',
        'Easier storage, handling, and traceability after shipment',
      ],
      img: '/Images/traceability/traceability3.webp',
    },
  ]

  const renderCardItems = (items, textSize) =>
    items.map((text, idx) => (
      <div
        key={idx}
        className="flex items-center gap-2 border-b border-[#EEEEF1]"
      >
        <Image
          src="/Images/icons/operation.svg"
          alt={`Icon ${idx + 1}`}
          width={24}
          height={24}
          className="shrink-0"
        />
        <span
          className={`py-4 md:py-5 ${textSize} text-grey leading-[120%] font-neueMontreal`}
        >
          {text}
        </span>
      </div>
    ))

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-white flex flex-col items-center justify-center "
    >
      {cardsData.map((card, i) => (
        <div
          key={i}
          ref={card.ref}
          className="px-3.5 md:px-0 absolute top-0 left-0 w-full h-screen bg-white flex flex-col md:grid md:grid-cols-4 gap-10"
          style={{ zIndex: card.zIndex }}
        >
          <div className="col-span-2 flex flex-col justify-between pl-0 md:pl-10 py-[50px]">
            <div className="flex flex-col gap-4 border-b border-[#E5E5E5] pb-[30px]">
              <h2 className="text-heading2 font-neueMontrealMd text-black leading-[110%]">
                {card.title}
              </h2>
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
            <div className="relative aspect-[590/700] w-full h-screen">
              <Image
                src={card.img}
                alt={card.title}
                fill
                className="object-fill"
                priority
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}