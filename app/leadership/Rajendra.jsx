import React from "react";
import Image from "next/image";

const Rajendra = () => {
  return (
    <section className="relative w-full px-3.5 md:px-0 py-10 md:py-0">
  <div className="w-full absolute inset-0">
    <Image
      src="/Images/leadership/rajendra-bg.webp"
      alt="Background"
      fill
      className="object-cover"
      priority
    />
  </div>
      <div className="h-full flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-10">

        <div className="w-[412px] max-w-full">
          <div className="aspect-[412/550] relative">
            <Image
              src="/Images/leadership/rajendra.webp"
              alt="Rajendra"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="gap-20 md:gap-0 flex flex-col justify-between flex-1 text-white md:py-16 z-1" style={{ height: "-webkit-fill-available" }}>
          <div className="flex flex-col gap-3 md:gap-4">
            <h2 className="text-heading3 text-primary leading-[105%] tracking-heading3">Rajendra Chodankar</h2>
            <p className="text-bodySmall leading-[120%] text-textPrimary">Founder & Chairman</p>
          </div>
          <p className="w-full md:max-w-[614px] text-bodyBase text-textSecondary leading-[120%]">
            Maharashtra’s first semiconductor facility by RRP Electronics marks 
            a historic leap in technology and innovation. This milestone 
            strengthens our resolve to lead the global semiconductor landscape. 
            Together, we propel RRP S4E and the nation toward unmatched technological 
            excellence and prosperity.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Rajendra;
