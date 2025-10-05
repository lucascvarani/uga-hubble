import { motion } from 'framer-motion'

type Props = {
  current_x: number
  current_y: number
  target_x: number
  target_y: number
}

const getMapAngle = (x1: number, y1: number, x2: number, y2: number) => {
  const dx = x2 - x1 // positive to the right
  const dy = y2 - y1 // positive downward (screen coordinates!)

  const angle = (Math.atan2(dy, dx) * 180) / Math.PI

  // Triangle points down, so add 90° to align it correctly
  return (angle + 90) % 360
}

const Compass = (props: Props) => {
  // Fixed direction (degrees). Replace with real data later.
  const direction = getMapAngle(
    props.current_x,
    props.current_y,
    props.target_x,
    props.target_y
  )

  console.log(direction)

  return (
    <div className="w-32 h-32 rounded-full border-2 border-gray-400 flex items-center justify-center relative bg-white">
      {/* Rotating Arrow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ rotate: direction }}
          transition={{ type: 'spring', stiffness: 200, damping: 30 }}
          className="origin-center flex items-center justify-center w-full h-full"
          style={{ transformOrigin: 'center center' }}
        >
          <div
            className="flex flex-col items-center"
            style={{ transform: 'translateY(-34px)' }}
          >
            {/* Triangle */}
            <div className="w-0 h-0 border-l-[16px] border-r-[16px] border-b-[30px] border-l-transparent border-r-transparent border-b-red-600" />
            {/* Small base line */}
            <div className="w-2 h-5 bg-red-600 mt-1 rounded" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Compass
