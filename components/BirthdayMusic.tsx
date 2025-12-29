
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Music2, Volume2, Volume1, VolumeX } from 'lucide-react';

const BirthdayMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioContextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const nextNoteTimeRef = useRef(0);
  const notesRef = useRef<number>(0);
  const timerIDRef = useRef<number | null>(null);
  const hasStartedRef = useRef(false);

  // Frequencies for the "Happy Birthday" song
  const melody = [
    { freq: 392.00, duration: 0.4 }, // G4
    { freq: 392.00, duration: 0.1 }, // G4
    { freq: 440.00, duration: 0.5 }, // A4
    { freq: 392.00, duration: 0.5 }, // G4
    { freq: 523.25, duration: 0.5 }, // C5
    { freq: 493.88, duration: 1.0 }, // B4
    
    { freq: 392.00, duration: 0.4 }, // G4
    { freq: 392.00, duration: 0.1 }, // G4
    { freq: 440.00, duration: 0.5 }, // A4
    { freq: 392.00, duration: 0.5 }, // G4
    { freq: 587.33, duration: 0.5 }, // D5
    { freq: 523.25, duration: 1.0 }, // C5
    
    { freq: 392.00, duration: 0.4 }, // G4
    { freq: 392.00, duration: 0.1 }, // G4
    { freq: 783.99, duration: 0.5 }, // G5
    { freq: 659.25, duration: 0.5 }, // E5
    { freq: 523.25, duration: 0.5 }, // C5
    { freq: 493.88, duration: 0.5 }, // B4
    { freq: 440.00, duration: 1.0 }, // A4
    
    { freq: 698.46, duration: 0.4 }, // F5
    { freq: 698.46, duration: 0.1 }, // F5
    { freq: 659.25, duration: 0.5 }, // E5
    { freq: 523.25, duration: 0.5 }, // C5
    { freq: 587.33, duration: 0.5 }, // D5
    { freq: 523.25, duration: 1.5 }, // C5
  ];

  const playNote = (freq: number, startTime: number, duration: number) => {
    if (!audioContextRef.current || !masterGainRef.current) return;
    
    const osc = audioContextRef.current.createOscillator();
    const noteGain = audioContextRef.current.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, startTime);
    
    noteGain.gain.setValueAtTime(0, startTime);
    noteGain.gain.linearRampToValueAtTime(0.3, startTime + 0.05); // Internal note peak
    noteGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    
    osc.connect(noteGain);
    noteGain.connect(masterGainRef.current);
    
    osc.start(startTime);
    osc.stop(startTime + duration);
  };

  const scheduler = useCallback(() => {
    if (!audioContextRef.current || !isPlaying) return;
    
    while (nextNoteTimeRef.current < audioContextRef.current.currentTime + 0.1) {
      const note = melody[notesRef.current];
      playNote(note.freq, nextNoteTimeRef.current, note.duration);
      
      nextNoteTimeRef.current += note.duration + 0.05;
      notesRef.current = (notesRef.current + 1) % melody.length;
    }
    timerIDRef.current = window.setTimeout(scheduler, 25);
  }, [isPlaying]);

  const initAudio = useCallback(() => {
    if (!audioContextRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioContextClass();
      
      masterGainRef.current = audioContextRef.current.createGain();
      masterGainRef.current.gain.setValueAtTime(volume, audioContextRef.current.currentTime);
      masterGainRef.current.connect(audioContextRef.current.destination);
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  }, [volume]);

  useEffect(() => {
    if (masterGainRef.current && audioContextRef.current) {
      masterGainRef.current.gain.setTargetAtTime(volume, audioContextRef.current.currentTime, 0.05);
    }
  }, [volume]);

  const startPlaying = useCallback(() => {
    if (hasStartedRef.current) return;
    initAudio();
    nextNoteTimeRef.current = audioContextRef.current!.currentTime;
    setIsPlaying(true);
    hasStartedRef.current = true;
  }, [initAudio]);

  const toggleMusic = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    initAudio();
    
    if (isPlaying) {
      if (timerIDRef.current) clearTimeout(timerIDRef.current);
      setIsPlaying(false);
    } else {
      nextNoteTimeRef.current = audioContextRef.current!.currentTime;
      setIsPlaying(true);
      hasStartedRef.current = true;
    }
  };

  useEffect(() => {
    const handleFirstInteraction = () => {
      startPlaying();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      if (timerIDRef.current) clearTimeout(timerIDRef.current);
    };
  }, [startPlaying]);

  useEffect(() => {
    if (isPlaying) {
      scheduler();
    }
  }, [isPlaying, scheduler]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 group">
      {isPlaying && (
        <div className="bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-pink-100 flex flex-col gap-3 animate-in slide-in-from-bottom-4 fade-in duration-300 w-48 overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 h-4 min-w-[20px]">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-1 bg-pink-500 rounded-full animate-music-bar"
                  style={{
                    height: '100%',
                    animationDelay: `${i * 0.15}s`,
                  }}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-pink-600 uppercase tracking-tighter truncate">Birthday Tune</span>
          </div>
          
          <div className="flex items-center gap-2">
            {volume === 0 ? <VolumeX size={14} className="text-gray-400" /> : 
             volume < 0.5 ? <Volume1 size={14} className="text-pink-400" /> : 
             <Volume2 size={14} className="text-pink-500" />}
            <input 
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="flex-1 h-1 bg-pink-100 rounded-lg appearance-none cursor-pointer accent-pink-500"
            />
          </div>
        </div>
      )}
      
      <button
        onClick={toggleMusic}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all active:scale-95 relative overflow-hidden ${
          isPlaying 
            ? 'bg-pink-500 text-white animate-pulse' 
            : 'bg-white text-pink-500 hover:bg-pink-50'
        }`}
        aria-label={isPlaying ? "Stop Music" : "Play Music"}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
        {isPlaying ? <Volume2 size={24} /> : <Music2 size={24} />}
        
        {!isPlaying && (
          <div className="absolute inset-0 rounded-full border-2 border-pink-100 animate-ping opacity-20 pointer-events-none" />
        )}
      </button>
    </div>
  );
};

export default BirthdayMusic;
