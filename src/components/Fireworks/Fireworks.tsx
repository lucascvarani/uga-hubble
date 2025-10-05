import React, { useEffect, useState } from 'react'
import './Fireworks.css'

const Fireworks: React.FC = () => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2000) // dura 2s
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  const particles = Array.from({ length: 12 }, (_, i) => (
    <div key={i} className={`particle particle-${i}`}></div>
  ))

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
      <div className="relative w-40 h-40">{particles}</div>
    </div>
  )
}

export default Fireworks
