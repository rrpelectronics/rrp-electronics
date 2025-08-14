'use client'
import Image from 'next/image'

export default function Technologies() {
  const cards = [
    { title: "Consumer electronics",
      icon : "/Images/icons/display1.svg"
    },

    { title: "Industrial automation",
      icon : "/Images/icons/display2.svg"
     },
    { title: "Medical imaging",
      icon : "/Images/icons/display3.svg"
     },
    { title: "Automotive displays",
      icon : "/Images/icons/display4.svg"
     },
  ]

  return (
    <section className="grid grid-cols-4 bg-white px-3.5 md:px-10 py-10 md:py-15">
      <div className="col-span-4 lg:col-span-2 flex flex-col justify-start mb-10">
        <h3 className="font-neueMontrealMd text-heading2 tracking-heading2 leading-[110%] mb-5 md:mb-6">
          Display Technologies
        </h3>
        <p
          className={`md:w-[80%] font-neueMontreal text-bodyBase text-textPrimary leading-[120%] whitespace-normal md:whitespace-pre-line`}
        >
          {`At RRP Electronics, we deliver high-performance display technologies that enhance user experiences across consumer electronics, industrial automation, medical imaging, and automotive systems.`}
        </p>
        <br/>
        <p
          className={`md:w-[80%] font-neueMontreal text-bodyBase text-textPrimary leading-[120%] whitespace-normal md:whitespace-pre-line`}
        >
          {`From everyday devices to mission-critical applications, our solutions combine innovation and reliability to help the world see the future more clearly.`}
        </p>
      </div>

      <div className="col-span-4 lg:col-span-2 grid grid-cols-2 grid-rows-2 gap-[11.25px] md:gap-5">
        {cards.map((card, idx) => (
          <Card
            key={idx}
            title={card.title}
            icon={card.icon}
            className={`${
              idx < 2
                ? "border-y-1 border-y-borderPrimary"
                : "border-b-1 border-b-borderPrimary"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

function Card({ title, icon, className }) {
  return (
    <div
      className={`relative flex flex-col justify-between aspect-[294/169] h-[123px] md:h-[169px] w-full p-2 md:p-4 ${className}`}
    >
        <Image src={icon} alt="Card Icon" width={40} height={40} className="rounded" />
       <div className="text-heading4 text-black leading-[115%]">
        {title}
        </div>
    </div>
  )
}
