
import React, { useState, useCallback, useRef } from 'react';
import { CakeState } from '../types';
import { Sparkles, Stars } from 'lucide-react';

interface BirthdayCakeProps {
  onBlow: () => void;
  imageUrl?: string;
  videoUrl?: string;
}

const BirthdayCake: React.FC<BirthdayCakeProps> = ({ onBlow, imageUrl, videoUrl }) => {
  const [state, setState] = useState<CakeState>(CakeState.LIT);
  const [showSmoke, setShowSmoke] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<{ text: string, x: number, y: number } | null>(null);
  const tooltipTimeoutRef = useRef<number | null>(null);

  const playMagicalSound = useCallback(() => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
      oscillator.frequency.exponentialRampToValueAtTime(1320, audioCtx.currentTime + 0.1); // E6

      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.3);
    } catch (e) {
      console.warn("Audio Context not allowed or supported", e);
    }
  }, []);

  const handleBlow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (state === CakeState.LIT) {
      setState(CakeState.BLOWN);
      setShowSmoke(true);
      onBlow();
      playMagicalSound();
      setTimeout(() => setShowSmoke(false), 2000);
    }
  };

  const handleLayerClick = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    setIsBouncing(true);
    playMagicalSound();
    
    // Position tooltip relative to the click or the layer center
    // Using simple offset from click for now
    setActiveTooltip({ 
      text, 
      x: e.nativeEvent.offsetX, 
      y: e.nativeEvent.offsetY 
    });

    if (tooltipTimeoutRef.current) window.clearTimeout(tooltipTimeoutRef.current);
    
    tooltipTimeoutRef.current = window.setTimeout(() => {
      setIsBouncing(false);
      setActiveTooltip(null);
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 select-none">
      <div className="relative group">
        
        {/* Magical Sparkles Background when blown */}
        {state === CakeState.BLOWN && (
          <div className="absolute -inset-20 pointer-events-none flex items-center justify-center">
            <Sparkles className="text-yellow-400 absolute top-0 left-0 animate-sparkle-float opacity-40" size={32} />
            <Sparkles className="text-pink-400 absolute bottom-10 right-0 animate-sparkle-float delay-500 opacity-40" size={24} />
            <Stars className="text-purple-400 absolute top-20 right-10 animate-pulse opacity-30" size={40} />
          </div>
        )}

        {/* Candles Area - Click here to blow */}
        <div 
          className="flex gap-6 justify-center absolute -top-12 left-0 right-0 z-20 cursor-pointer"
          onClick={handleBlow}
        >
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-2.5 h-12 bg-gradient-to-b from-yellow-100 to-yellow-300 rounded-t-full relative shadow-sm">
              {/* Flame */}
              {state === CakeState.LIT && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-5 h-8 animate-flicker">
                  <div className="absolute inset-0 bg-orange-500 rounded-full blur-[4px] opacity-60" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-6 bg-orange-400 rounded-full shadow-[0_0_15px_rgba(251,146,60,0.9)]">
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-4 bg-yellow-200 rounded-full" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-300/60 rounded-full blur-[1px]" />
                  </div>
                </div>
              )}
              
              {showSmoke && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-6 h-6 bg-gray-300/40 rounded-full blur-md animate-smoke" 
                     style={{ animationDelay: `${i * 0.1}s` }} />
              )}
              
              <div className="absolute inset-x-0 top-2 h-1 bg-pink-400/20" />
              <div className="absolute inset-x-0 top-5 h-1 bg-pink-400/20" />
              <div className="absolute inset-x-0 top-8 h-1 bg-pink-400/20" />
            </div>
          ))}
        </div>

        {/* Cake Layers Area */}
        <div 
          className={`relative transition-all duration-700 ${state === CakeState.BLOWN ? 'scale-[1.02]' : ''} ${isBouncing ? 'animate-bounce-click' : ''}`}
        >
          {/* Tooltip Popup */}
          {activeTooltip && (
            <div 
              className="absolute z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full mb-4 animate-in zoom-in fade-in duration-300"
              style={{ left: activeTooltip.x, top: activeTooltip.y }}
            >
              <div className="bg-white/90 backdrop-blur-sm border border-pink-200 px-3 py-1.5 rounded-full shadow-lg text-pink-600 font-bold text-xs whitespace-nowrap">
                {activeTooltip.text}
              </div>
              <div className="w-2 h-2 bg-white rotate-45 border-r border-b border-pink-200 mx-auto -mt-1.5"></div>
            </div>
          )}
          
          {/* Top Layer */}
          <div 
            className="w-48 h-12 bg-pink-100 rounded-t-xl border-b-4 border-pink-200 flex items-center justify-center relative z-10 shadow-[inset_0_2px_4px_rgba(255,255,255,0.8)] cursor-pointer hover:brightness-105 transition-all"
            onClick={(e) => handleLayerClick(e, 'Vanilla Bean Frosting')}
          >
            <span className="text-pink-300 text-[10px] tracking-[0.2em] font-bold drop-shadow-sm">HAPPY BIRTHDAY</span>
          </div>
          
          {/* Middle Layer with Media */}
          <div 
            className="w-56 h-28 bg-pink-200 rounded-t-xl border-b-4 border-pink-300 shadow-inner flex flex-col items-center justify-center overflow-hidden relative cursor-pointer hover:brightness-105 transition-all"
            onClick={(e) => handleLayerClick(e, 'Strawberry Cream Filling')}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
            
            {videoUrl ? (
              <div className="w-24 h-24 rounded-full border-4 border-white shadow-2xl overflow-hidden relative z-10 animate-magic-pop">
                <video 
                  src={videoUrl} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-pink-500/10 pointer-events-none" />
              </div>
            ) : imageUrl ? (
              <div className="w-24 h-24 rounded-full border-4 border-white shadow-2xl overflow-hidden relative z-10 animate-magic-pop">
                <img src={imageUrl} alt="Birthday Star" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-pink-500/10" />
              </div>
            ) : (
              <div className="flex flex-col items-center animate-magic-pop">
                <HeartIcon className="text-white/60 mb-1 animate-pulse" size={24} />
                <span className="text-white font-cursive text-4xl drop-shadow-md">Khushi</span>
              </div>
            )}
            
            {(imageUrl || videoUrl) && (
              <span className="text-white font-cursive text-lg mt-1 z-10 drop-shadow-md">Khushi</span>
            )}
            
            <div className="absolute bottom-2 left-6 w-3 h-3 rounded-full bg-white opacity-40" />
            <div className="absolute top-4 right-8 w-4 h-4 rounded-full bg-white opacity-20" />
          </div>
          
          {/* Bottom Layer */}
          <div 
            className="w-64 h-24 bg-pink-300 rounded-b-xl shadow-xl relative overflow-hidden cursor-pointer hover:brightness-105 transition-all"
            onClick={(e) => handleLayerClick(e, 'Chocolate Fudge Base')}
          >
            <div className="absolute top-0 left-0 right-0 flex justify-around">
               {[...Array(8)].map((_, i) => (
                 <div key={i} className="w-6 h-4 bg-pink-200 rounded-b-full shadow-sm" />
               ))}
            </div>
            <div className="absolute inset-0 opacity-20 flex flex-wrap gap-6 p-4">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          </div>
        </div>
        
        {/* Plate / Stand */}
        <div className="relative mt-1">
          <div className="w-72 h-4 bg-gray-200 rounded-full mx-auto shadow-md border-b-4 border-gray-300" />
          <div className="w-32 h-6 bg-gray-300 rounded-b-2xl mx-auto shadow-lg" />
        </div>
      </div>

      <div className="mt-12 text-center transition-all duration-500 transform">
        {state === CakeState.LIT ? (
          <div className="space-y-2">
            <p className="text-pink-600 font-bold text-xl animate-bounce">
              Blow the candles, Khushi! 🕯️✨
            </p>
            <p className="text-pink-400 text-sm italic opacity-70">
              (Tap the candles to blow, or the cake to see flavors!)
            </p>
          </div>
        ) : (
          <div className="animate-magic-pop flex flex-col items-center gap-2">
            <div className="flex gap-2">
              <Sparkles className="text-yellow-500 animate-spin" size={24} />
              <p className="text-purple-600 font-cursive text-3xl font-bold">
                Wish Granted! 💫
              </p>
              <Sparkles className="text-yellow-500 animate-spin" size={24} />
            </div>
            <p className="text-pink-500 font-medium">Have a magical year ahead!</p>
          </div>
        )}
      </div>
    </div>
  );
};

const HeartIcon = ({ className, size }: { className?: string, size?: number }) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    stroke="none"
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.51 4.05 3 5.5l7 7Z" />
  </svg>
);

export default BirthdayCake;
