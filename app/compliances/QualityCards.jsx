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
      title: 'Quality Policy',
      desc: 'We are committed to delivering precision-driven, globally compliant semiconductor solutions with zero compromise on quality.',
      textSize: 'text-bodyBase',
      items: [
        'Streamlined invenWe exceed customer expectations with performance-first, precision manufacturing.tory & order management',
        'Our systems comply with global quality and regulatory standards.',
        'We continuously audit and refine processes for optimal output.',
        'Every step—from material to final test—is governed by rigorous quality checks.',
      ],
      img: '/Images/compliances/quality1.webp',
    },
    {
      ref: card2Ref,
      zIndex: 20,
      title: 'Quality Statement',
      desc: 'Quality is not a checkpoint—it’s how we work. At RRP Electronics, every product reflects our commitment to precision, transparency, and continuous improvement.',
      textSize: 'text-bodyBase',
      items: [
        'We deliver with precision and flawless execution at every stage.',
        'Transparent processes ensure accountability and trust.',
        'We foster a culture of innovation and constant improvement.',
        'Our commitment to quality ensures reliable, high-performance outcomes.',
      ],
      img: '/Images/compliances/quality2.webp',
    },
    {
      ref: card3Ref,
      zIndex: 30,
      title: 'Quality Foundation',
      desc: 'Built on a Zero-Defect Philosophy, our foundation is defined by precision, prevention, and an uncompromising commitment to excellence.',
      textSize: 'text-bodyBase',
      items: [
        'We ensure every detail is meticulously engineered for perfection.',
        'Our goal: zero defects across every production batch.',
        'We proactively manage risks before they impact quality.',
        'Root cause elimination drives consistent and reliable performance.',
      ],
      img: '/Images/compliances/quality3.webp',
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
      className="relative w-full h-screen bg-white flex flex-col items-center justify-center "
    >
      {cardsData.map((card, i) => (
        <div
          key={i}
          ref={card.ref}
          className="absolute top-0 left-0 w-full h-screen bg-white grid grid-cols-4 gap-10"
          style={{ zIndex: card.zIndex }}
        >
          <div className="col-span-2 flex flex-col justify-between pl-10 py-[50px]">
            <div className="flex flex-col gap-4 border-b border-[#E5E5E5]">
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