'use client'
import Image from 'next/image'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Logistics() {
  const sectionRef = useRef(null)
  const card1Ref = useRef(null)
  const card2Ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=200%',
        pin: true,
        scrub: true,
      })

      gsap.fromTo(
        card2Ref.current,
        { y: '100%' },
        {
          y: '0%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=100%',
            scrub: true,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const cardsData = [
    {
      ref: card1Ref,
      title: 'Supply Chain Efficiency',
      desc: 'From inventory management to last-mile delivery, we offer complete visibility and control throughout the supply chain. Our processes are designed to minimize delays and maximize accuracy.',
      textSize: 'text-bodyBase',
      items: [
        'Streamlined inventory & order management',
        'Integrated warehousing and dispatch system',
        'Responsive logistics support for bulk or custom orders',
      ],
      img: '/Images/logistics/logistic1.webp',
    },
    {
      ref: card2Ref,
      title: 'Prime Location Advantage',
      desc: 'Located just 30 kilometers from Mumbai International Airport and in close proximity to major ports, our facility is strategically positioned for optimal inbound and outbound logistics.',
      textSize: 'text-bodyBase',
      items: [
        'Fast access to international air cargo routes',
        'Immediate port connectivity for maritime shipments',
        'Reduced lead times and improved operational efficiency',
      ],
      img: '/Images/logistics/logistic2.webp',
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
          className={`py-[20px] ${textSize} text-grey leading-[120%] font-neueMontreal`}
        >
          {text}
        </span>
      </div>
    ))

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-white flex flex-col items-center justify-center"
    >
      <div
        ref={card1Ref}
        className="absolute top-0 left-0 w-full h-screen bg-white grid grid-cols-4 gap-10 z-10"
      >
        <div className="col-span-2 flex flex-col justify-between pl-10 py-[50px]">
          <div className="flex flex-col gap-4 border-b border-[#E5E5E5]">
            <h2 className="text-heading2 font-neueMontrealMd text-black leading-[110%]">
              {cardsData[0].title}
            </h2>
            <p
              className={`text-textPrimary font-neueMontreal ${cardsData[0].textSize} leading-[120%]`}
            >
              {cardsData[0].desc}
            </p>
          </div>
          <div
            className={`text-textPrimary font-neueMontreal ${cardsData[0].textSize} flex flex-col`}
          >
            {renderCardItems(cardsData[0].items, cardsData[0].textSize)}
          </div>
        </div>
        <div className="col-span-2 flex items-center justify-center">
          <div className="relative w-full h-screen">
            <Image
              src={cardsData[0].img}
              alt={cardsData[0].title}
              fill
              className="object-fill"
              priority
            />
          </div>
        </div>
      </div>

      <div
        ref={card2Ref}
        className="absolute top-0 left-0 w-full h-screen bg-white grid grid-cols-4 gap-10 z-20"
      >
        <div className="col-span-2 flex flex-col justify-center pl-10">
          <div className="flex flex-col gap-4 pb-[15.563rem] border-b border-[#E5E5E5]">
            <h2 className="text-heading2 font-neueMontrealMd text-black leading-[110%]">
              {cardsData[1].title}
            </h2>
            <p
              className={`text-textPrimary font-neueMontreal ${cardsData[1].textSize} leading-[120%]`}
            >
              {cardsData[1].desc}
            </p>
          </div>
          <div
            className={`text-textPrimary font-neueMontreal ${cardsData[1].textSize} flex flex-col`}
          >
            {renderCardItems(cardsData[1].items, cardsData[1].textSize)}
          </div>
        </div>
        <div className="col-span-2 flex items-center justify-center">
          <div className="relative w-full h-screen">
            <Image
              src={cardsData[1].img}
              alt={cardsData[1].title}
              fill
              className="object-fill"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
