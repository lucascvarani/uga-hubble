export default function AladinViewer({ aladin }: { aladin: any }) {
  const move = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (!aladin) return

    console.log(aladin.getRaDec()[0], aladin.getRaDec()[1])

    const step = 3

    const lon = aladin.getRaDec()[0]
    const lat = aladin.getRaDec()[1]

    let newLon = lon
    let newLat = lat

    switch (direction) {
      case 'up':
        newLat += step
        break
      case 'down':
        newLat -= step
        break
      case 'left':
        newLon += step
        break
      case 'right':
        newLon -= step
        break
    }

    aladin.gotoRaDec(newLon, newLat)
  }

  return (
    <>
      <div
        style={{
          width: '100%',
          height: '100%',
          border: '1px solid #444',
          borderRadius: 8,
        }}
      />

      {/* Direcional */}
      <div
        id="aladin-viewer"
        style={{
          position: 'absolute',
          bottom: 120,
          left: 40,
          right: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 5,
        }}
      >
        <button className="arrow" onClick={() => move('up')}>
          ▲
        </button>
        <div style={{ display: 'flex', gap: 43 }}>
          <button className="arrow" onClick={() => move('left')}>
            ◀
          </button>
          <button className="arrow" onClick={() => move('right')}>
            ▶
          </button>
        </div>
        <button className="arrow" onClick={() => move('down')}>
          ▼
        </button>
      </div>

      <style>{`
        .arrow {
          background: #222;
          color: white;
          border: 1px solid #555;
          border-radius: 6px;
          width: 40px;
          height: 40px;
          font-size: 18px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .arrow:hover {
          background: #444;
        }
      `}</style>
    </>
  )
}
