
import React, { useEffect, useCallback } from 'react';

declare const confetti: any;

interface ConfettiProps {
  trigger?: number;
}

const Confetti: React.FC<ConfettiProps> = ({ trigger = 0 }) => {
  const fire = useCallback(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff69b4', '#ff1493', '#8a2be2', '#ffd700']
    });
  }, []);

  useEffect(() => {
    if (trigger > 0) {
      fire();
    }
  }, [trigger, fire]);

  return null;
};

export default Confetti;
