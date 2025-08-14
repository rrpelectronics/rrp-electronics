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
    if (window.innerWidth >= 768) {
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: true
        })

        gsap.fromTo(
          card2Ref.current,
          { yPercent: 100 },
          {
            yPercent: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: '+=100%',
              scrub: true
            }
          }
        )
      }, sectionRef)
      return () => ctx.revert()
    }
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
        'Responsive logistics support for bulk or custom orders'
      ],
      img: '/Images/logistics/logistic1.webp'
    },
    {
      ref: card2Ref,
      title: 'Prime Location Advantage',
      desc: 'Located just 30 kilometers from Mumbai International Airport and in close proximity to major ports, our facility is strategically positioned for optimal inbound and outbound logistics.',
      textSize: 'text-bodyBase',
      items: [
        'Fast access to international air cargo routes',
        'Immediate port connectivity for maritime shipments',
        'Reduced lead times and improved operational efficiency'
      ],
      img: '/Images/logistics/logistic2.webp'
    }
  ]

  const renderCardItems = (items, textSize) =>
    items.map((text, idx) => (
      <div
        key={idx}
        className={`flex items-center gap-2 border-b border-[#EEEEF1] ${idx === 0 ? 'border-t' : ''}`}
      >
        <Image
          src="/Images/icons/operation.svg"
          alt={`Icon ${idx + 1}`}
          width={24}
          height={24}
          className="shrink-0"
        />
        <span className={`py-4 md:py-5 ${textSize} text-grey leading-[120%] font-neueMontreal`}>
          {text}
        </span>
      </div>
    ))

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white flex flex-col gap-15 items-center justify-center"
    >
      <div
        ref={card1Ref}
        className="px-3.5 md:px-0 md:absolute top-0 left-0 w-full md:h-screen bg-white grid grid-cols-4 md:grid-cols-4 gap-[30px] md:gap-10 z-10"
      >
        <div className="col-span-4 md:col-span-2 gap-10 md:gap-0 flex flex-col justify-between pl-0 md:pl-10 py-0 md:py-[50px]">
          <div className="flex flex-col gap-2">
            <h2 className="text-heading2 font-neueMontrealMd text-black leading-[110%]">
              {cardsData[0].title}
            </h2>
            <p className={`text-textPrimary font-neueMontreal ${cardsData[0].textSize} leading-[120%]`}>
              {cardsData[0].desc}
            </p>
          </div>
         <div>{renderCardItems(cardsData[0].items, cardsData[0].textSize)}</div>
        </div>
        <div className="col-span-4 md:col-span-2 flex items-center justify-center">
          <div className="relative w-full md:h-screen h-[300px]">
            <Image
              src={cardsData[0].img}
              alt={cardsData[0].title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      <div
        ref={card2Ref}
        className="px-3.5 md:px-0 md:absolute top-0 left-0 w-full md:h-screen bg-white grid grid-cols-4 md:grid-cols-4 gap-10 z-20"
      >
        <div className="col-span-4 md:col-span-2 gap-10 md:gap-0 flex flex-col justify-between pl-0 md:pl-10 py-0 md:py-[50px]">
          <div className="flex flex-col gap-2 md:gap-4">
            <h2 className="text-heading2 font-neueMontrealMd text-black leading-[110%]">
              {cardsData[1].title}
            </h2>
            <p className={`text-textPrimary font-neueMontreal ${cardsData[1].textSize} leading-[120%]`}>
              {cardsData[1].desc}
            </p>
          </div>
          <div>{renderCardItems(cardsData[0].items, cardsData[0].textSize)}</div>
        </div>
        <div className="col-span-4 md:col-span-2 flex items-center justify-center">
          <div className="relative w-full md:h-screen h-[300px]">
            <Image
              src={cardsData[1].img}
              alt={cardsData[1].title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
