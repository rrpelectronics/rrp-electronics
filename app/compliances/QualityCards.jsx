'use client'
import Image from 'next/image'
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)

export default function QualityCards() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

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
        { yPercent: 0, duration: 0.5, ease: 'linear' }
      ).fromTo(
        cardRefs.current[2],
        { yPercent: 100 },
        { yPercent: 0, duration: 0.5, ease: 'linear' }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const cardsData = [
    {
      title: 'Quality Policy',
      zIndex: 10,
      desc: 'We are committed to delivering precision-driven, globally compliant semiconductor solutions with zero compromise on quality.',
      textSize: 'text-bodyBase',
      items: [
        'Streamlined invenWe exceed customer expectations with performance-first, precision manufacturing.tory & order management',
        'Our systems comply with global quality and regulatory standards.',
        'We continuously audit and refine processes for optimal output.',
        'Every step—from material to final test—is governed by rigorous quality checks.',
      ],
      img: '/images/compliances/quality1.webp',
    },
    {
      title: 'Quality Statement',
      zIndex: 20,
      desc: 'Quality is not a checkpoint—it’s how we work. At RRP Electronics, every product reflects our commitment to precision, transparency, and continuous improvement.',
      textSize: 'text-bodyBase',
      items: [
        'We deliver with precision and flawless execution at every stage.',
        'Transparent processes ensure accountability and trust.',
        'We foster a culture of innovation and constant improvement.',
        'Our commitment to quality ensures reliable, high-performance outcomes.',
      ],
      img: '/images/compliances/quality2.webp',
    },
    {
      title: 'Quality Foundation',
      zIndex: 50,
      desc: 'Built on a Zero-Defect Philosophy, our foundation is defined by precision, prevention, and an uncompromising commitment to excellence.',
      textSize: 'text-bodyBase',
      items: [
        'We ensure every detail is meticulously engineered for perfection.',
        'Our goal: zero defects across every production batch.',
        'We proactively manage risks before they impact quality.',
        'Root cause elimination drives consistent and reliable performance.',
      ],
      img: '/images/compliances/quality3.webp',
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
          className={`absolute top-0 left-0 w-full h-screen bg-white grid grid-cols-4 gap-x-3 md:gap-x-5 z-${card.zIndex}`}
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
  )
}
