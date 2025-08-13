'use client'

import Image from 'next/image'

export default function Certifications() {
  return (
    <section className="grid grid-cols-4 px-10 pt-[120px] pb-[60px]">
      <h2 className="col-span-2 text-heading2 tracking-heading2 leading-[110%] text-black">
        Certifications & Standards
      </h2>
      <p className="col-start-4 text-bodyBase text-textPrimary leading-[120%] pb-10">
        At RRP Electronics, our globally recognized certifications reflect our
        commitment to quality, safety, and sustainability, ensuring every
        product meets international standards.
      </p>

    <div className='col-span-4 grid grid-cols-4 gap-4'>
      <div className="col-start-1 col-span-2 h-[290px] p-4 flex flex-col justify-between bg-whiteBg">
        <div className="flex justify-end">
            <Image
              src="/Images/icons/arrow_outward.svg"
              alt="ISO Icon"
              width={40}
              height={40}
            />
          </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-heading4 leading-[114%] text-black">ISO 9001:2015</h3>
          <p className="text-bodySmall leading-[120%] text-textPrimary">Quality Management System</p>
        </div>
      </div>

      <div className="col-start-3 col-span-2 h-[290px] p-4 flex flex-col justify-between bg-whiteBg">
        <div className="flex justify-end">
            <Image
              src="/Images/icons/arrow_outward.svg"
              alt="ISO Icon"
              width={40}
              height={40}
            />
          </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-heading4 leading-[114%] text-black">ISO 9001:2015</h3>
          <p className="text-bodySmall leading-[120%] text-textPrimary">Quality Management System</p>
        </div>
      </div>
      </div>
    </section>
  )
}
