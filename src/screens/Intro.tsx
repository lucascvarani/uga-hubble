import React, { useRef, useEffect, useCallback } from 'react'

type FireMenuProps = {
  onStart?: () => void
  gameFinished?: boolean
  goToFreeExploration?: () => void
}

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  hue: number
  alpha: number
  swirl: number
}

const FireMenu: React.FC<FireMenuProps> = ({
  onStart,
  gameFinished,
  goToFreeExploration,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number | undefined>(undefined)
  const lastTimeRef = useRef<number>(0)

  /** Ajusta tamanho do canvas para o container */
  const resize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ratio = window.devicePixelRatio || 1
    const { clientWidth, clientHeight } = canvas.parentElement!
    canvas.width = clientWidth * ratio
    canvas.height = clientHeight * ratio
    const ctx = canvas.getContext('2d')
    ctx?.setTransform(ratio, 0, 0, ratio, 0, 0)
  }, [])

  useEffect(() => {
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [resize])

  /** Loop de animação */
  const draw = useCallback((time: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const w = canvas.clientWidth
    const h = canvas.clientHeight

    const dt = time - lastTimeRef.current
    lastTimeRef.current = time

    ctx.fillStyle = '#0a0a12'
    ctx.fillRect(0, 0, w, h)

    const particles = particlesRef.current
    ctx.globalCompositeOperation = 'lighter'

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i]
      p.vx += (Math.random() - 0.5) * 0.05
      p.vy -= 0.02
      p.x += p.vx
      p.y += p.vy
      p.life -= dt
      p.alpha = p.life / p.maxLife

      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size)
      grad.addColorStop(0, `hsla(${p.hue},100%,60%,${p.alpha})`)
      grad.addColorStop(1, `hsla(${p.hue + 20},100%,20%,0)`)

      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()

      if (p.life <= 0) particles.splice(i, 1)
    }

    ctx.globalCompositeOperation = 'source-over'
    rafRef.current = requestAnimationFrame(draw)
  }, [])

  useEffect(() => {
    lastTimeRef.current = performance.now()
    rafRef.current = requestAnimationFrame(draw)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [draw])

  return (
    <div className="w-full h-screen overflow-hidden bg-black">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <img
        src="initial_image.jpeg"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-[0_0_20px_rgba(255,140,0,0.5)] mb-4">
          Eyes to the Sky
        </h1>
        <p className="text-gray-300 mb-10">An adventure on the time.</p>
        <button
          onClick={onStart}
          className="px-10 py-3 bg-transparent border hover:border-none hover:bg-white hover:text-black text-white font-semibold rounded-lg text-lg transition-all shadow-lg  animate-pulse focus:outline-none"
        >
          Start your Journey!
        </button>
        {gameFinished && (
          <button
            onClick={goToFreeExploration}
            className="mt-5 px-10 py-3 bg-transparent border hover:border-none hover:bg-white hover:text-black text-white font-semibold rounded-lg text-lg transition-all shadow-lg  animate-pulse focus:outline-none"
          >
            Free Exploration
          </button>
        )}
      </div>
    </div>
  )
}

export default FireMenu
