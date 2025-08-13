'use client'
import React from 'react';
import StackCards from './StackCards';
import AdvancedPackaging from '../solutions/packaging';

const traceability = () => {
  return (
    <main className='h-full w-full overflow-hidden'>
        <AdvancedPackaging/>
             <StackCards/>
    </main>
  )
}

export default traceability