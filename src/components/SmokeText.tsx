import React from 'react'

interface SmokeTextProps {
  children: React.ReactNode
  className?: string
  blur?: string // blur do fundo (ex: "blur-xl")
  opacity?: number // opacidade da fumaça (0 a 100)
  padding?: string // padding da fumaça (ex: "px-2 py-1")
  rounded?: string // borda arredondada (ex: "rounded-md")
}

const SmokeText: React.FC<SmokeTextProps> = ({
  children,
  className = '',
  blur = 'blur-xl',
  opacity = 50,
  padding = 'px-2 py-1',
  rounded = 'rounded-md',
}) => {
  return (
    <div className="relative inline-block">
      {/* Fumaça atrás do texto */}
      <div
        className={`absolute inset-0 bg-black ${blur} ${rounded}`}
        style={{ opacity: opacity / 100 }}
      ></div>

      {/* Texto em cima */}
      <span className={`relative text-white ${padding} ${className}`}>
        {children}
      </span>
    </div>
  )
}

export default SmokeText
