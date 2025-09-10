import { useState, useEffect } from 'react';

type ScrollMode = 'vertical' | 'horizontal';

export function useScrollMode() {
  const [scrollMode, setScrollMode] = useState<ScrollMode>('vertical');

  useEffect(() => {
    const savedMode = localStorage.getItem('portfolio-scroll-mode') as ScrollMode | null;
    const isDesktop = window.innerWidth >= 1024;
    
    if (savedMode) {
      setScrollMode(savedMode);
    } else if (isDesktop) {
      setScrollMode('horizontal');
    } else {
      setScrollMode('vertical');
    }
  }, []);

  const toggleScrollMode = () => {
    const newMode = scrollMode === 'vertical' ? 'horizontal' : 'vertical';
    setScrollMode(newMode);
    localStorage.setItem('portfolio-scroll-mode', newMode);
  };

  return { scrollMode, toggleScrollMode };
}