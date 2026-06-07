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
            transform: translateY(-105vh) translateX(-30px) rotate(0deg);
            opacity: 0.1;
          }
          50% {
            transform: translateY(-40vh) translateX(30px) rotate(90deg);
            opacity: 0.8;
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
              animation: 'fall-and-sway 2.2s ease-in-out forwards' 
            }} 
          />
        </div>

        {/* Logo Phase Container */}
        <div className={`absolute transition-all duration-700 transform flex items-center justify-center ${
          phase === 'logo' ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
        }`}>
          <span className="text-pink-500 font-extrabold text-[54px] tracking-widest drop-shadow-[0_0_15px_rgba(244,63,94,0.8)] select-none">
            PS
          </span>
        </div>

      </div>

    </div>
  );
};

export default LoadingScreen;