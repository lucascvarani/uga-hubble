"use client";

import { useEffect, useState } from "react";

interface Star {
  ra: number;
  dec: number;
  mag: number;
  name?: string;
}

export default function AladinNext() {
  const [aladin, setAladin] = useState<any>(null);
  const [coords, setCoords] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [magLimit, setMagLimit] = useState<number>(10);

  // Exemplo de catálogo de teste
  const exampleStars: Star[] = [
    { ra: 83.8221, dec: -5.3911, mag: 4.0, name: "Rigel" },
    { ra: 88.7929, dec: 7.4071, mag: 0.5, name: "Betelgeuse" },
    { ra: 79.1723, dec: 45.9979, mag: 5.0, name: "Capella" },
    { ra: 101.287, dec: -16.7161, mag: 6.5, name: "Sirius" },
  ];

  useEffect(() => {
    const init = () => {
      if (window && (window as any).A) {
        (window as any).A.init.then(() => {
          const a = (window as any).A.aladin("#aladin-lite-div", {
            survey: "P/DSS2/color",
            fov: 60,
            target: "Orion Nebula",
            showReticle: true,
            showZoomControl: false,
            showFullscreenControl: false,
            // fullScreen: true,
          });

          a.setFoVRange(0.05, 120);

          let survey = a.getBaseImageLayer();
          survey.setContrast(0.2); // 3. Increase contrast for pop

          a.on("click", (pos: any) => {
            const ra = pos.ra.toFixed(4);
            const dec = pos.dec.toFixed(4);
            const coordString = `RA: ${ra}, Dec: ${dec}`;
            console.log("Coordenada clicada:", coordString);
            setCoords(coordString);
          });

          setAladin(a);
        });
      }
    };

    if ((window as any).A) init();
    else window.addEventListener("load", init);

    return () => window.removeEventListener("load", init);
  }, []);

  const changeSurvey = (survey: string) => {
    if (aladin) {
      aladin.setImageSurvey(survey);
    }
  };

  const addMarker = () => {
    if (!aladin) return;

    const center = aladin.getRaDec();
    const markerLayer = (window as any).A.catalog({ name: "Marcadores" });
    aladin.addCatalog(markerLayer);

    // Apenas adiciona se estiver dentro do limite de magnitude
    const filteredStars = exampleStars.filter((s) => s.mag <= magLimit);

    filteredStars.forEach((star) => {
      const marker = (window as any).A.marker(star.ra, star.dec, {
        popupTitle: star.name || "Estrela",
        popupDesc: `Mag: ${star.mag}, RA: ${star.ra.toFixed(
          4
        )}, Dec: ${star.dec.toFixed(4)}`,
      });
      markerLayer.addSources([marker]);
    });
  };

  const gotoObject = () => {
    if (aladin && search.trim() !== "") {
      aladin.gotoObject(search);
    }
  };

  return (
    <>
      <main className="flex flex-col h-screen bg-black text-white">
        <div className="flex flex-1">
          <div id="aladin-lite-div" className="w-full h-full"></div>
        </div>
      </main>
    </>
  );
}
