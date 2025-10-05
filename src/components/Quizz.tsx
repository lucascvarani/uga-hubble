import React, { useState, useEffect } from 'react'

interface QuizzUIProps {
  title: string
  options: string[]
  onClickOption: (option: number) => void
}

const Quizz: React.FC<QuizzUIProps> = ({ title, options, onClickOption }) => {
  return (
    // We add a className to target this element reliably with CSS
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)', // centraliza horizontalmente
        zIndex: 1000,
      }}
    >
      <h2 style={{ marginBottom: '10px', backgroundColor: 'white' }}>
        {title}
      </h2>

      {options.map((texto, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onClickOption(index)}
          style={{ backgroundColor: 'white' }}
        >
          {texto}
        </button>
      ))}
    </div>
  )
}

export default Quizz
