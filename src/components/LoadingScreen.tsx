import React from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  React.useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-tech-dark">
      <div className="text-center">
        <div className="mb-8 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full tech-gradient flex items-center justify-center text-white font-bold text-2xl loading-pulse logo-glow">
            PS
          </div>
        </div>
        <div className="text-white text-4xl font-bold mb-2 animate-pulse">
          PALLESI SRAVYA
        </div>
        <div className="text-primary-glow text-lg">
          Digital Marketing Professional • Content Creator
        </div>
        <div className="mt-8 flex justify-center">
          <div className="w-12 h-1 bg-primary-glow rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;