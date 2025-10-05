import { useState, forwardRef, useImperativeHandle } from 'react'

export interface TelescopeHandle {
  show: () => void
  hide: () => void
  toggle: () => void
  isVisible: boolean
}

const Telescope = forwardRef<TelescopeHandle>((_, ref) => {
  const [isActive, setIsActive] = useState(false)

  useImperativeHandle(ref, () => ({
    show: () => setIsActive(true),
    hide: () => setIsActive(false),
    toggle: () => setIsActive(!isActive),
    isVisible: isActive,
  }))

  if (!isActive) return null

  return (
  <div className="telescope-overlay fixed inset-0 w-screen h-screen pointer-events-none flex items-center justify-center">
      <img
        src="/lunetaPNG.png"
        alt="Telescope view"
      className="w-[150vw] h-[150vw] object-cover"
      />
    </div>
  )
})

Telescope.displayName = 'Telescope'

export default Telescope
