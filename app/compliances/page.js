'use client'
import React from 'react'
import AdvancedPackaging from '../solutions/packaging'
import QualityCards from './QualityCards'
import Certifications from './Certifications'

export const compliances = () => {
  return (
     <main className="h-full w-full overflow-hidden">
         <QualityCards/>
         <Certifications/>
       
      </main>
  )
}

export default compliances;