'use client'
import React from 'react'
import Logistics from './Logistics'
import AdvancedPackaging from '../solutions/packaging'

export const logistics = () => {
  return (
     <main className="h-full w-full overflow-hidden">
      <AdvancedPackaging/>
        <Logistics/>
      </main>
  )
}

export default logistics;