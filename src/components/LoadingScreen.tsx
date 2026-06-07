import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out slightly before completion
    const fadeTimer = setTimeout(() => setFadeOut(true), 2500);
    const completeTimer = setTimeout(onComplete, 3000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030209] transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="relative flex items-center justify-center">
        {/* Outer rotating glow ring */}
        <div className="absolute w-36 h-36 rounded-full border-2 border-dashed border-primary/30 animate-[spin_12s_linear_infinite]" />
        
        {/* Inner rotating gradient ring */}
        <div className="absolute w-[130px] h-[130px] rounded-full border-2 border-t-primary border-r-transparent border-b-secondary border-l-transparent animate-[spin_3s_linear_infinite]" />
        
        {/* Glowing pulse aura */}
        <div className="absolute w-[110px] h-[110px] rounded-full bg-primary/10 blur-xl animate-pulse" />
        
        {/* Core circle */}
        <div className="w-[110px] h-[110px] rounded-full tech-gradient flex flex-col items-center justify-center text-white font-bold text-[36px] tracking-widest shadow-2xl relative z-10 border border-white/10 animate-[pulse_2s_ease-in-out_infinite] logo-glow">
          <span className="text-glow-white select-none">PS</span>
        </div>
      </div>
      
      {/* Loading text */}
      <div className="mt-8 text-center">
        <p className="text-xs tracking-[0.25em] text-muted-foreground/60 uppercase font-semibold animate-pulse">
          Loading Portfolio
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;