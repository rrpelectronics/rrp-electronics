'use client'
import React from 'react'
import Link from 'next/link';

const InsideBanner = () => {
  return (
    <section className='w-full h-screen px-3.5 md:px-10 flex flex-col items-start justify-center'>
       <div className='flex flex-col gap-4 md:gap-10'>
        <p className='text-bodyLarge leading-[120%] text-textPrimary'>
          Engineering / Full Time
        </p>
        <h2 className='text-display text-black leading-[110%] tracking-display'>
          Semiconductor<br/>
          Packaging Engineers
        </h2>
         <Link
            href={"#"}
            className="text-bodySmall text-white leading-[120%] bg-primary rounded-full w-fit px-4 md:px-6 py-2 md:py-3"
          >
            Apply Now
          </Link>
       </div>
    </section>
  )
}

export default InsideBanner