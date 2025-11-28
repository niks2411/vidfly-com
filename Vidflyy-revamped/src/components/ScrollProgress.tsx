import { useState, useEffect } from 'react';

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / scrollHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress(); // Initial call

    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Progress Bar - increased height for better visibility */}
      <div className="w-full bg-gray-200 h-2">
        <div 
          className="bg-red-600 h-full transition-all duration-300 ease-out will-change-transform"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>
      
      {/* Percentage Indicator - moved to left corner */}
      <div className="absolute bottom-3 left-4">
        <div className="bg-red-600 text-white px-3 py-1 rounded-full shadow-lg font-semibold text-sm">
          {Math.round(scrollProgress)}%
        </div>
      </div>
    </div>
  );
};

export default ScrollProgress;