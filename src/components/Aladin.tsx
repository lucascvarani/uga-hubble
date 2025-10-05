'use client'

import { useEffect, useState } from 'react'
import './Aladin.css'
import AladinViewer from './AladinViewer'

interface Star {
  ra: number
  dec: number
  mag: number
  name?: string
}

export interface AladinInstance {
  on: (event: string, callback: (...args: unknown[]) => void) => void
  gotoRaDec: (ra: number, dec: number) => void
  getRaDec: () => [number, number] | null
  setImageSurvey: (survey: string) => void
  setFov: (degrees: number) => void
  getFov: () => [number, number] | null
  // Add other methods as needed
}

export default function AladinNext({
  setAladinInstance,
}: {
  setAladinInstance: (aladin: any) => void
}) {
  const [aladin, setAladin] = useState<any>(null)
  const [coords, setCoords] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [magLimit, setMagLimit] = useState<number>(10)

  // Exemplo de catálogo de teste
  const exampleStars: Star[] = [
    { ra: 83.8221, dec: -5.3911, mag: 4.0, name: 'Rigel' },
    { ra: 88.7929, dec: 7.4071, mag: 0.5, name: 'Betelgeuse' },
    { ra: 79.1723, dec: 45.9979, mag: 5.0, name: 'Capella' },
    { ra: 101.287, dec: -16.7161, mag: 6.5, name: 'Sirius' },
  ]

  useEffect(() => {
    const init = () => {
      if (window && (window as any).A) {
        ;(window as any).A.init.then(() => {
          const a = (window as any).A.aladin('#aladin-lite-div', {
            cooFrame: 'ICRSd',
            survey: 'P/DSS2/color',
            fov: 60,
            target: 'Orion Nebula',
            showReticle: true,
            showZoomControl: true,
            showFullscreenControl: false,
            showControl: true,
            cooFrame: 'ICRSd',
            showFrame: false,
            showProjectionControl: false,
            showStatusBar: false,
            showLayersControl: false,
            showFov: false,
            zoomSpeed: 2,
          })

          setAladinInstance(a)
          a.on('click', (e) => console.log(e, 'hello'))

          // a.gotoObject("Sirius");

          a.setFoVRange(0.05, 120)

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

  const changeSurvey = (survey: string) => {
    if (aladin) {
      aladin.setImageSurvey(survey)
    }
  }

  const addMarker = () => {
    if (!aladin) return

    const center = aladin.getRaDec()
    const markerLayer = (window as any).A.catalog({ name: 'Marcadores' })
    aladin.addCatalog(markerLayer)

    // Apenas adiciona se estiver dentro do limite de magnitude
    const filteredStars = exampleStars.filter((s) => s.mag <= magLimit)

    filteredStars.forEach((star) => {
      const marker = (window as any).A.marker(star.ra, star.dec, {
        popupTitle: star.name || 'Estrela',
        popupDesc: `Mag: ${star.mag}, RA: ${star.ra.toFixed(
          4
        )}, Dec: ${star.dec.toFixed(4)}`,
      })
      markerLayer.addSources([marker])
    })
  }

  const gotoObject = (object: string) => {
    if (aladin) {
      aladin.gotoObject(object)
    }
  }

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
