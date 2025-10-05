import { motion } from 'framer-motion'

type Props = {
  current_x: number
  current_y: number
  target_x: number
  target_y: number
}

const getMapAngle = (x1: number, y1: number, x2: number, y2: number) => {
  const dx = x1 - x2 // positive to the right
  const dy = y2 - y1 // positive downward (screen coordinates!)

  let angle = (Math.atan2(dx, dy) * 180) / Math.PI

  if (angle < 0) {
    angle += 360
  }

  return angle
}

const Compass = (props: Props) => {
  // Fixed direction (degrees). Replace with real data later.
  const direction = getMapAngle(
    props.current_x,
    props.current_y,
    props.target_x,
    props.target_y
  )

  return (
    <div className="w-64 h-64 relative">
      {/* Rotating Arrow */}
      <img src="down-compass.png" className="absolute h-full w-full" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none absolute">
        <motion.div
          animate={{ rotate: direction }}
          transition={{ type: 'spring', stiffness: 200, damping: 30 }}
          className="origin-center flex items-center justify-center w-full h-full"
          style={{ transformOrigin: 'center center' }}
        >
          <div
            className="flex flex-col items-center"
            style={{ transform: 'translateY(-72px)' }}
          >
            <svg width="64" height="64" viewBox="0 0 64 64">
              <path d="M32 0 L68 50 Q32 30 0 50 Z" fill="black" />
            </svg>{' '}
          </div>
        </motion.div>
      </div>
      <img src="up-compass.png" className="absolute h-full w-full" />
    </div>
  )
}

export default Compass
