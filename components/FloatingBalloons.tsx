
import React, { useMemo } from 'react';
import { BALLOON_COLORS } from '../constants';

const FloatingBalloons: React.FC = () => {
  const balloons = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
      left: `${Math.random() * 90}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${15 + Math.random() * 10}s`,
      size: `${40 + Math.random() * 40}px`
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {balloons.map((b) => (
        <div
          key={b.id}
          className={`balloon ${b.color} opacity-60 absolute bottom-[-100px] animate-float`}
          style={{
            left: b.left,
            animationDelay: b.delay,
            animationDuration: b.duration,
            width: b.size,
            height: `calc(${b.size} * 1.33)`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingBalloons;
