import React, { useState } from "react";
import SectionHeader from "@/app/components/SectionHeader";
import Image from "next/image";

const Map = () => {
  const [activeConnectivity, setActiveConnectivity] =
    useState("Air Connectivity");
  const [openMobileItem, setOpenMobileItem] = useState("Air Connectivity");

  const connectivityData = {
    "Air Connectivity": {
      image: "/images/logistics/airport.png",
      distances: [
        {
          distance: "28 KM",
          description: "Navi Mumbai International Airport (NMIA)",
        },
        {
          distance: "41.1 KM",
          description:
            "Chhatrapati Shivaji Maharaj International Airport (BOM)",
        },
      ],
    },
    "Port Access": {
      image: "/images/logistics/port.png",
      distances: [
        {
          distance: "12.5 KM",
          description: "Jawaharlal Nehru Port (JNPT)",
        },
      ],
    },
    "Rail Connectivity": {
      image: "/images/logistics/rail.png",
      distances: [
        {
          description:
            "Connected via Taloja Railway Station, enabling direct routes to Mumbai and beyond.",
        },
      ],
    },
    "Expressway Access": {
      image: "/images/logistics/expressway.png",
      distances: [
        {
          description:
            "Quick connectivity to the Mumbai–Pune Expressway and other arterial roads.",
        },
      ],
    },
    "Upcoming Metro Line": {
      image: "/images/logistics/metro.png",
      distances: [
        {
          description:
            "Metro infrastructure under development to enhance future freight and workforce movement.",
        },
      ],
    },
  };

  const handleConnectivityClick = (connectivity) => {
    setActiveConnectivity(connectivity);
  };

  const handleMobileToggle = (connectivity) => {
    setOpenMobileItem(openMobileItem === connectivity ? null : connectivity);
  };

  return (
    <section className="bg-white h-ft w-full py-10 md:py-15">
      <SectionHeader
        heading={"Strategic Connectivity"}
        text={
          "A snapshot of RRP's well-connected location — from airports and ports to rail and expressway access — enabling efficient and timely logistics operations."
        }
      />
      <div className="grid grid-cols-4 gap-x-3 md:gap-x-5 items-end px-3.5 md:px-5 lg:px-10">
        <ul className="col-span-4 sm:col-span-1">
          {Object.keys(connectivityData).map((connectivity) => (
            <li
              key={connectivity}
              className={`py-5 border-b border-b-borderPrimary cursor-pointer ${
                connectivity === "Air Connectivity"
                  ? "border-t border-t-borderPrimary"
                  : ""
              }`}
            >
              <p
                className={`flex items-center text-bodyLarge lg:text-heading4 2xl:text-heading3 2xl:tracking-heading3 leading-[115%] ${
                  activeConnectivity === connectivity
                    ? "text-primary"
                    : "text-black hover:text-primary"
                }`}
                onClick={() => {
                  handleConnectivityClick(connectivity);
                  handleMobileToggle(connectivity);
                }}
              >
                {connectivity}
                <svg
                  className={`ml-auto w-5 h-5 block sm:hidden ${
                    openMobileItem === connectivity ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </p>

              {/* Mobile Accordion Content */}
              {openMobileItem === connectivity && (
                <div className="block sm:hidden mt-6">
                  <div className="h-[380px] w-full mx-auto relative mb-4">
                    <Image
                      src={"/images/logistics/map.png"}
                      alt="Map Background"
                      fill
                      sizes="100vw"
                      className="object-contain object-center"
                    />
                    <Image
                      src={"/images/logistics/pointers.png"}
                      alt="Map Background"
                      fill
                      sizes="100vw"
                      className="object-contain object-center"
                    />
                    <Image
                      src={connectivityData[connectivity].image}
                      alt={connectivity}
                      fill
                      sizes="100vw"
                      className="object-contain object-center"
                    />
                  </div>

                  <ul>
                    {connectivityData[connectivity].distances.map(
                      (item, index) => (
                        <li
                          key={index}
                          className={`flex flex-col gap-2 ${
                            index === 0 ? "py-5" : "pt-5"
                          }`}
                        >
                          {item.distance && (
                            <p className="text-heading4 leading-[115%] text-black">
                              {item.distance}
                            </p>
                          )}
                          <p className="text-textPrimary text-bodyBase font-neueMontreal leading-[120%]">
                            {item.description}
                          </p>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop Map */}
        <div className="hidden sm:block col-span-2 relative w-full h-[80vh] mx-auto overflow-hidden">
          <Image
            src={"/images/logistics/map.png"}
            alt="Map Background"
            fill
            sizes="100vw"
            className="object-contain object-center"
          />
          <Image
            src={"/images/logistics/pointers.png"}
            alt="Map Background"
            fill
            sizes="100vw"
            className="object-contain object-center"
          />
          {Object.entries(connectivityData).map(([connectivity, data]) => (
            <Image
              key={connectivity}
              src={data.image}
              alt={connectivity}
              fill
              sizes="100vw"
              className={`object-contain object-center transition-opacity duration-500 ease-in-out ${
                activeConnectivity === connectivity
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            />
          ))}
        </div>

        {/* Desktop Distance List */}
        <ul className="hidden sm:block col-span-1">
          {connectivityData[activeConnectivity].distances.map((item, index) => (
            <li
              key={index}
              className={`flex flex-col gap-2 max-w-[285px] transition-opacity duration-300 ease-in-out ${
                index === 0 ? "py-5" : "pt-5"
              }`}
            >
              {item.distance && (
                <p className="text-heading4 leading-[115%] text-black">
                  {item.distance}
                </p>
              )}
              <p className="text-textPrimary text-bodyBase 2xl:text-bodyLarge font-neueMontreal leading-[120%]">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Map;
