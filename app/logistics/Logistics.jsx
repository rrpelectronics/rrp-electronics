'use client';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)

export default function Logistics() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

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
        cardRefs.current[1],
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
      zIndex: 10,
      title: 'Supply Chain Efficiency',
      desc: 'From inventory management to last-mile delivery, we offer complete visibility and control throughout the supply chain. Our processes are designed to minimize delays and maximize accuracy.',
      textSize: 'text-bodyBase',
      items: [
        'Streamlined inventory & order management',
        'Integrated warehousing and dispatch system',
        'Responsive logistics support for bulk or custom orders',
      ],
      img: '/images/logistics/logistic1.webp',
    },
    {
      zIndex: 20,
      title: 'Prime Location Advantage',
      desc: 'Located just 30 kilometers from Mumbai International Airport and in close proximity to major ports, our facility is strategically positioned for optimal inbound and outbound logistics.',
      textSize: 'text-bodyBase',
      items: [
        'Fast access to international air cargo routes',
        'Immediate port connectivity for maritime shipments',
        'Reduced lead times and improved operational efficiency',
      ],
      img: '/images/logistics/logistic2.webp',
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
