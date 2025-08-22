"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import UseScreenSizeLarge from "@/app/hooks/UseScreenSizeLarge";
import { useHeaderHeight } from "@/app/context/HeaderHeightContext";
import BulletList from "@/app/components/BulletList";

gsap.registerPlugin(ScrollTrigger);

export default function StackCards({ cardsData = [] }) {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const isDesktop = UseScreenSizeLarge();
  const headerHeight = useHeaderHeight();

  console.log(headerHeight);
  
  useEffect(() => {
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: `top ${headerHeight}`,
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
        if (i > 0) {
          tl.to(
            cardRefs.current[i - 1],
            {
              scale: 0.75,
              filter: "blur(10px)",
              zIndex: -1,
              duration: 0.5,
              ease: "power2.out"
            },
            "<"
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isDesktop, cardsData.length]);

  return (
    <section
      ref={sectionRef}
      style={
        isDesktop
          ? {
              height: `calc(100vh - ${headerHeight}px)`,
            }
          : {
              height: "fit-content",
            }
      }
      className={`relative w-full bg-white flex flex-col gap-10 md:gap-15 items-center justify-center py-10 md:py-15 overflow-hidden`}
    >
      {cardsData.map((card, id) => (
        <div
          ref={(el) => (cardRefs.current[id] = el)}
          key={id}
          style={
            isDesktop
              ? {
                  height: `calc(100vh - ${headerHeight}px)`,
                  zIndex: cardsData.length - id,
                  transformOrigin: "center center",
                }
              : {
                  height: "100%",
                }
          }
          className={`px-3.5 md:px-5 lg:px-10 py-10 bg-whiteBg ${
            isDesktop ? "absolute top-0 left-0" : "relative"
          }  w-full bg-white flex flex-col md:grid md:grid-cols-4 gap-y-7.5 md:gap-x-5 `}
        >
          <div className="col-span-2 flex flex-col justify-between gap-7.5 md:gap-15">
            <div className={`flex flex-col gap-5 md:gap-4`}>
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
            <div className="relative h-[50vh] md:h-full w-full ml-auto mr-0">
              <Image
                src={card.img}
                alt={card.title}
                fill
                sizes="50vw"
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