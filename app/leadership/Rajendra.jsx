import React from "react";
import Image from "next/image";

const Rajendra = () => {
  return (
    <section
      className="h-fit sm:h-[70vh] w-full grid grid-cols-4 sm:flex gap-y-4 gap-x-3 sm:gap-x-10 lg:gap-x-15 justify-center items-stretch bg-darkBg bg-cover bg-center py-10 sm:py-0"
      style={{
        backgroundImage: "url('/images/leadership/leader-banner.webp')",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="overflow-hidden relative w-full h-auto bg-[#0f0f18] max-w-[35%] hidden sm:block">
        <Image
          src="/images/leadership/rajendra.webp"
          alt="Rajendra Chodankar"
          fill
          sizes="35%"
          className="object-cover object-top"
        />
      </div>
      <div className="col-span-4 relative w-full bg-[#0f0f18] aspect-square block sm:hidden px-3.5 overflow-hidden">
        <Image
          src="/images/leadership/rajendra.webp"
          alt="Rajendra Chodankar"
          fill
          sizes="100vw"
          className="object-top object-cover"
        />
      </div>

      <div className="col-span-4 w-full h-auto flex flex-col px-3.5 md:px-0 sm:py-10 lg:py-15 gap-y-20 sm:gap-y-0 justify-between">
        <div className="flex flex-col gap-y-4">
          <h3 className="text-primary text-heading3 tracking-heading3 leading-[110%]">
            Rajendra Chodankar
          </h3>
          <p className="text-bodySmall text-textSecondary font-neueMontreal leading-[120%]">
            Founder & Chairman
          </p>
        </div>
        <p className="text-bodyBase text-textSecondary font-neueMontreal leading-[120%] w-full sm:w-[80%]">
          Maharashtra’s first semiconductor facility by RRP Electronics marks a
          historic leap in technology and innovation. This milestone strengthens
          our resolve to lead the global semiconductor landscape. Together, we
          propel RRP S4E and the nation toward unmatched technological
          excellence and prosperity.
        </p>
      </div>
    </section>
  );
};

export default Rajendra;
