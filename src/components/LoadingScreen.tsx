import React, { useState, useEffect } from 'react';
import { Leaf } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'leaf' | 'logo' | 'fade'>('leaf');

  useEffect(() => {
    // Phase 1: Leaf is falling. Lasts for 2.2 seconds.
    // Phase 2: Logo appears. Starts at 2.2s, lasts for 2 seconds.
    const logoTimer = setTimeout(() => {
      setPhase('logo');
    }, 2200);

    // Phase 3: Loading screen fades out. Starts at 4.2s.
    const fadeTimer = setTimeout(() => {
      setPhase('fade');
    }, 4200);

    // Phase 4: Loading screen is complete. Starts at 4.7s.
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 4700);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030209] transition-opacity duration-500 ${phase === 'fade' ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* Inline styles for custom keyframe animations */}
      <style>{`
        @keyframes fall-and-sway {
          0% {
            transform: translateY(-105vh) translateX(-50px) rotate(0deg);
            opacity: 0.2;
          }
          15% {
            transform: translateY(-75vh) translateX(50px) rotate(45deg);
            opacity: 0.8;
          }
          40% {
            transform: translateY(-45vh) translateX(-40px) rotate(90deg);
            opacity: 1;
          }
          65% {
            transform: translateY(-20vh) translateX(40px) rotate(135deg);
          }
          85% {
            transform: translateY(-8vh) translateX(-20px) rotate(160deg);
          }
          100% {
            transform: translateY(0) translateX(0) rotate(180deg);
            opacity: 1;
          }
        }
      `}</style>

      <div className="relative flex items-center justify-center w-48 h-48">
        
        {/* Leaf Phase Container */}
        <div className={`transition-opacity duration-300 flex items-center justify-center ${
          phase === 'leaf' ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
        }`}>
          <Leaf 
            className="w-16 h-16 text-pink-500 drop-shadow-[0_0_15px_rgba(244,63,94,0.75)]" 
            style={{ 
              animation: 'fall-and-sway 2.2s cubic-bezier(0.25, 1, 0.5, 1) forwards' 
            }} 
          />
        </div>

        {/* Logo Phase Container */}
        <div className={`absolute transition-all duration-700 transform flex items-center justify-center ${
          phase === 'logo' ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
        }`}>
          <div className="relative flex items-center justify-center">
            {/* Outer rotating glow ring */}
            <div className="absolute w-36 h-36 rounded-full border-2 border-dashed border-primary/30 animate-[spin_12s_linear_infinite]" />
            
            {/* Inner rotating gradient ring */}
            <div className="absolute w-[130px] h-[130px] rounded-full border-2 border-t-primary border-r-transparent border-b-secondary border-l-transparent animate-[spin_3s_linear_infinite]" />
            
            {/* Glowing pulse aura */}
            <div className="absolute w-[110px] h-[110px] rounded-full bg-primary/10 blur-xl animate-pulse" />
            
            {/* Core circle */}
            <div className="w-[110px] h-[110px] rounded-full tech-gradient flex flex-col items-center justify-center text-white font-bold text-[36px] tracking-widest shadow-2xl relative z-10 border border-white/10 logo-glow">
              <span className="text-glow-white select-none">PS</span>
            </div>
          </div>
        </div>

      </div>

      {/* Loading text */}
      <div className="mt-8 text-center">
        <p className="text-xs tracking-[0.25em] text-muted-foreground/60 uppercase font-semibold animate-pulse select-none">
          {phase === 'leaf' ? 'Catching details...' : 'Loading Portfolio'}
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;