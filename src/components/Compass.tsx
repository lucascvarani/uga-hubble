import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import type { AladinInstance } from './Aladin';

type Props = {
  aladinInstance: AladinInstance | null;
  current_x: number;
  current_y: number;
  target_x: number;
  target_y: number;
};

function normalizeAngle(angle: number) {
  return (angle % 360 + 360) % 360;
}

function closestAngle(x: number, y: number): number {
    let d = ((y - x + 180) % 360) - 180;
    return x + d;
}

const getMapAngle = (aladin: AladinInstance, x1: number, y1: number, x2: number, y2: number) => {
  const screenCurrent = aladin.world2pix(x1, y1);
  const screenTarget = aladin.world2pix(x2, y2);
  const dx = screenTarget[0] - screenCurrent[0]; 
  const dy = screenCurrent[1] - screenTarget[1]; 
  return (Math.atan2(dx, dy) * 180) / Math.PI;
};

const Compass = (props: Props) => {
  const [prevDirection, setPrevDirection] = useState(0);
  const [displayDirection, setDisplayDirection] = useState(0);

  useEffect(() => {
    if (!props.aladinInstance) return;

    const direction = getMapAngle(
      props.aladinInstance,
      props.current_x,
      props.current_y,
      props.target_x,
      props.target_y
    );

    const newDirection = normalizeAngle(direction);
    const shortestDir = closestAngle(prevDirection, newDirection);

    setPrevDirection(shortestDir);
    setDisplayDirection(shortestDir);
  }, [
    props.aladinInstance,
    props.current_x,
    props.current_y,
    props.target_x,
    props.target_y,
    prevDirection
  ]);

  return (
    <div className="w-64 h-64 relative">
      <img src="down-compass.png" className="absolute h-full w-full" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ rotate: displayDirection }}
          transition={{ type: 'spring', stiffness: 200, damping: 30 }}
          className="origin-center flex items-center justify-center w-full h-full"
        >
          <div className="flex flex-col items-center" style={{ transform: 'translateY(-72px)' }}>
            <svg width="64" height="64" viewBox="0 0 64 64">
              <path d="M32 0 L68 50 Q32 30 0 50 Z" fill="black" />
            </svg>
          </div>
        </motion.div>
      </div>
      <img src="up-compass.png" className="absolute h-full w-full" />
    </div>
  );
};

export default Compass;
