'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress((scrollTop / docHeight) * 100);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-card-border/30">
        <div
            className="h-full bg-gradient-to-r from-accent to-accent-hover shadow-glow transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
        />
      </div>
  );
}
