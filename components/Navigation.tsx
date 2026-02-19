
import React from 'react';
import { PageType, Theme } from '../types';

interface NavigationProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
  theme: Theme;
  onToggleTheme: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange, theme, onToggleTheme }) => {
  const isDark = theme === 'dark';

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4">
      <div className={`px-2 py-1.5 rounded-full flex items-center gap-1 shadow-2xl backdrop-blur-xl border transition-all duration-500 ${
        isDark ? 'bg-slate-900/80 border-white/10' : 'bg-white/80 border-slate-200'
      }`}>
        <button
          onClick={() => onPageChange('canvas')}
          className={`px-5 py-2 rounded-full transition-all duration-300 font-bold text-[11px] uppercase tracking-wider ${
            currentPage === 'canvas' 
            ? (isDark ? 'bg-emerald-500 text-white shadow-lg' : 'bg-emerald-600 text-white shadow-lg') 
            : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900')
          }`}
        >
          Editor
        </button>
        <button
          onClick={() => onPageChange('innovative')}
          className={`px-5 py-2 rounded-full transition-all duration-300 font-bold text-[11px] uppercase tracking-wider ${
            currentPage === 'innovative' 
            ? (isDark ? 'bg-indigo-500 text-white shadow-lg' : 'bg-indigo-600 text-white shadow-lg') 
            : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900')
          }`}
        >
          View Live
        </button>
      </div>

      <button
        onClick={onToggleTheme}
        className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-500 shadow-xl backdrop-blur-md ${
          isDark 
          ? 'bg-slate-900/80 border-white/10 text-yellow-400 hover:scale-110' 
          : 'bg-white/80 border-slate-200 text-slate-600 hover:scale-110'
        }`}
        title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {isDark ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>

      {/* Logout/Exit Admin */}
      <a
        href={window.location.pathname}
        className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-500 shadow-xl backdrop-blur-md ${
          isDark 
          ? 'bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white' 
          : 'bg-red-50 border-red-100 text-red-600 hover:bg-red-600 hover:text-white'
        }`}
        title="Exit Admin Mode"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      </a>
    </nav>
  );
};

export default Navigation;
