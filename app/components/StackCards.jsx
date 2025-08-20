"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import UseScreenSizeLarge from "@/app/hooks/UseScreenSizeLarge";
import UseScreenSizeMedium from "@/app/hooks/UseScreenSizeMedium";
import BulletList from "@/app/components/BulletList";

gsap.registerPlugin(ScrollTrigger);

export default function StackCards({ cardsData = [] }) {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const isDesktop = UseScreenSizeLarge();
  const isMedium = UseScreenSizeMedium();

  useEffect(() => {
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${cardsData.length * 100}%`,
          pin: true,
          scrub: true,
        },
      });

      for (let i = 1; i < cardsData.length; i++) {
        tl.fromTo(
          cardRefs.current[i],
          { yPercent: 100 },
          { yPercent: 0, duration: 0.5, ease: "linear" }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isDesktop, cardsData.length]);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full ${
        isDesktop ? "h-screen" : "h-fit"
      } bg-white flex flex-col gap-10 md:gap-15 items-center justify-center py-10 md:py-15`}
    >
      {cardsData.map((card, id) => (
        <div
          ref={(el) => (cardRefs.current[id] = el)}
          key={id}
          className={`px-3.5 md:px-0 md:pl-5 lg:pl-10 bg-whiteBg ${
            isDesktop ? "absolute top-0 left-0 h-full md:h-screen" : "relative"
          } 
              w-full bg-white flex flex-col md:grid md:grid-cols-4 md:gap-x-5`}
          style={isDesktop ? { zIndex: card.zIndex } : {}}
        >
          <div className="col-span-2 flex flex-col justify-between gap-7.5 md:gap-0 py-7.5 md:pt-25 md:pb-10">
            <div className="flex flex-col gap-5 md:gap-4">
              <h3 className="text-heading2 text-black leading-[105%]">
                {card.title}
              </h3>
              <p
                className={`text-textPrimary font-neueMontreal text-bodyBase leading-[120%]`}
              >
                {card.desc}
              </p>
            </div>
            <BulletList items={card.items} />
          </div>
          <div className="col-span-2 flex items-center justify-center">
            <div
              style={
                isMedium
                  ? {
                      width: "calc(100% - 20px)",
                    }
                  : {
                      width: "calc(100% - 0px)",
                    }
              }
              className="relative aspect-[332/394] lg:h-screen ml-auto mr-0"
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
