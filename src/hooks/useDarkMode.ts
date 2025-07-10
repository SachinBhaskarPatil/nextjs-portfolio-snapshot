import { useEffect, useState } from 'react';

const DARK_MODE_KEY = 'user-portfolio-dark-mode';

export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(DARK_MODE_KEY);
      if (stored !== null) return stored === 'true';
      return false; // Always default to light mode
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(DARK_MODE_KEY, String(isDark));
  }, [isDark]);

  return [isDark, setIsDark] as const;
} 