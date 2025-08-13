'use client'
import React from 'react';
import OSAT from './OSAT';
import AdvancedPackaging from './packaging';
import Technologies from './technologies';

const page = () => {
  return (
    <main className='h-full w-full relative'>
             <OSAT/>
             <AdvancedPackaging/>
             <Technologies/>
    </main>
  )
}

export default page