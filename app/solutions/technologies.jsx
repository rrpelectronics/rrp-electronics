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
    <section className="grid grid-cols-4 bg-white px-3.5 md:px-10 py-10 md:py-[100px]">
        <div className="col-span-4 md:col-span-2 flex flex-col justify-start">
          <h2 className="font-neueMontrealMd text-heading2 tracking-heading2 leading-[110%] mb-3">
            Display Technologies
          </h2>
          <p className={`font-neueMontreal text-bodyBase text-textPrimary leading-[120%] md:pb-0 pb-6 whitespace-normal md:whitespace-pre-line`}>
            {`At RRP Electronics, we deliver high-performance display\n technologies that enhance user experiences across\nconsumer electronics, industrial automation, medical imaging,\nand automotive systems.`}
          </p>
          <p className={`font-neueMontreal text-bodyBase text-textPrimary leading-[120%] md:pb-0 pb-12 whitespace-normal md:whitespace-pre-line`}>
            {`From everyday devices to mission-critical applications, our\nsolutions combine innovation and reliability to help the world\n see the future more clearly.`}
          </p>
        </div>

        <div className="col-span-4 md:col-span-2 grid grid-cols-2 grid-rows-2 gap-[11.25px] md:gap-5">
          {cards.map((card, idx) => (
            <Card key={idx} title={card.title} icon={card.icon} />
          ))}
        </div>
    </section>
  )
}

function Card({ title, icon }) {
  return (
    <div
      className={`relative flex flex-col justify-between bg-lightestGrey aspect-[294/169] h-[123px] md:h-[169px] w-full p-2 md:p-4`}
    >
        <Image src={icon} alt="Card Icon" width={40} height={40} className="rounded" />
       <div className="text-heading4 text-black leading-[115%]">
        {title}
        </div>
    </div>
  )
}
