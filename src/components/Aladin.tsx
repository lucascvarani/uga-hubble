/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import './Aladin.css'
import AladinViewer from './AladinViewer'

export interface AladinInstance {
  on: (event: string, callback: (...args: unknown[]) => void) => void
  gotoRaDec: (ra: number, dec: number) => void
  getRaDec: () => [number, number] | null
  setImageSurvey: (survey: string) => void
  setFov: (degrees: number) => void
  getFov: () => [number, number] | null
  setFoVRange: (min: number, max: number) => void
  world2pix: (ra: number, dec: number) => [number, number]
  // Add other methods as needed
}

export default function AladinNext({
  setAladinInstance,
}: {
  setAladinInstance: (aladin: any) => void
}) {
  const [aladin, setAladin] = useState<any>(null)

  useEffect(() => {
    const init = () => {
      if (window && (window as any).A) {
        ;(window as any).A.init.then(() => {
          const a = (window as any).A.aladin('#aladin-lite-div', {
            projection: 'SIN',
            cooFrame: 'ICRSd',
            survey: 'P/DSS2/color',
            fov: 60,
            target: 'Orion Nebula',
            showReticle: true,
            showZoomControl: true,
            showFullscreenControl: false,
            showControl: true,
            showFrame: false,
            showProjectionControl: false,
            showStatusBar: false,
            showLayersControl: false,
            showFov: false,
            zoomSpeed: 2,
          })

          setAladinInstance(a)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          a.on('click', (e: any) => console.log(e, 'hello'))

          // a.gotoObject("Sirius");

          a.setFoVRange(25, 25)

          let survey = a.getBaseImageLayer()
          survey.setContrast(0.2) // 3. Increase contrast for pop

          setAladin(a)
        })
      }
    }

    if ((window as any).A) init()
    else window.addEventListener('load', init)

    return () => window.removeEventListener('load', init)
  }, [])

  return (
    <>
      <main className="flex flex-col h-screen w-screen bg-black text-white">
        <div className="flex flex-1">
          <div id="aladin-lite-div" className="w-full h-full">
            <AladinViewer aladin={aladin} />
          </div>
        </div>
      </main>
    </>
  )
}
