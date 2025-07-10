"use client";
import { useState, useRef, useEffect } from 'react';
import { HiChevronDown } from 'react-icons/hi';

interface DateDropdownProps {
  dates: readonly string[];
  selected: string;
  onChange: (date: string) => void;
}

export default function DateDropdown({ dates, selected, onChange }: DateDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors duration-200 min-w-0"
      >
        <span className="truncate">{formatDate(selected)}</span>
        <HiChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full min-w-[120px] sm:min-w-[140px] md:min-w-[160px] lg:min-w-[180px] max-w-[200px] sm:max-w-[220px] md:max-w-[240px] lg:max-w-[260px] bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600 rounded-lg shadow-lg z-10">
          {dates.map((date) => (
            <button
              key={date}
              onClick={() => {
                onChange(date);
                setIsOpen(false);
              }}
              className={`w-full text-left px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors duration-200 whitespace-nowrap ${
                date === selected
                  ? 'bg-primary text-white'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {formatDate(date)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 