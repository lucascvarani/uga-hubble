import React from "react";

// Add a declaration for window.A to satisfy TypeScript
declare global {
  interface Window {
    A: any;
  }
}

const Aladin = () => {
  React.useEffect(() => {
    let aladin = window.A.aladin("#aladin-lite-div", {
      target: "03 47 00.00 +24 07 00.0",
      survey: "P/DSS2/color",
      zoom: 2,
      fov: 60,
    });
    aladin.setFov(1);

    var cat = window.A.catalog({ name: "Some markers", sourceSize: 18 });
    aladin.addCatalog(cat);

    cat.addSources([
      window.A.marker(56.87115, 24.10514, {
        popupTitle: "Alcyone",
        popupDesc:
          '<em>Bmag:</em> 2.806<br/><em>Spectral type:</em> B7III<br/>More info <a target="_blank" href="https://simbad.u-strasbg.fr/simbad/sim-id?Ident=NAME%20ALCYONE&submit=submit">in Simbad</a>',
      }),
    ]);

    // const layer = window.A.catalog({
    //   name: "Estrelas",
    //   color: "red",
    //   sourceSize: 50,
    // });

    // aladin.addCatalog(layer);

    // // Coordenadas de Sirius
    // const siriusRA = 101.2875;
    // const siriusDec = -16.7161;

    // window.A.marker(siriusRA, siriusDec, {
    //   popupTitle: "Sirius",
    //   popupDesc: `
    //       <div style="color:black; background:white; padding:5px; border-radius:5px;">
    //         <strong>Sirius</strong><br>
    //         Estrela mais brilhante do céu! 🌟<br><br>
    //         <button onclick="alert('Você clicou em Sirius!')">Clique aqui</button>
    //       </div>
    //     `,
    // });
  }, []);

  return (
    <div id="aladin-lite-div" style={{ width: "400px", height: "400px" }} />
  );
};

export default Aladin;
