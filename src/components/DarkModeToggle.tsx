"use client";
import { useDarkMode } from '@/hooks/useDarkMode';
import { HiSun, HiMoon } from 'react-icons/hi';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useDarkMode();

  const toggle = () => setIsDark(!isDark);

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <HiSun className="w-5 h-5" />
      ) : (
        <HiMoon className="w-5 h-5" />
      )}
    </button>
  );
} 