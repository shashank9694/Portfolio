import React, { useState, useCallback, useEffect } from 'react';
import { PageType, PortfolioData, Theme } from './types';
import { INITIAL_DATA } from './constants';
import Navigation from './components/Navigation';
import CanvasPage from './components/CanvasPage';
import InnovativePage from './components/InnovativePage';

const STORAGE_KEY = 'aurafolio_data';

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('innovative');
  const [theme, setTheme] = useState<Theme>('dark');
  const [data, setData] = useState<PortfolioData>(INITIAL_DATA);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const adminMode = params.get('admin') === 'true';
    setIsAdmin(adminMode);
    
    if (adminMode) {
      setCurrentPage('canvas');
    } else {
      setCurrentPage('innovative');
    }

    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to parse saved data", e);
      }
    }
  }, []);

  // Update HTML class for Twind selectors like .dark
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleDataUpdate = useCallback((newData: Partial<PortfolioData>) => {
    setData(prev => {
      const updated = { ...prev, ...newData };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <div className={`antialiased font-sans transition-colors duration-700 min-h-screen ${
      theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'
    }`}>
      
      {isAdmin && (
        <Navigation 
          currentPage={currentPage} 
          onPageChange={setCurrentPage} 
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      )}

      {!isAdmin && (
        <button
          onClick={toggleTheme}
          className={`fixed top-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-500 shadow-xl backdrop-blur-md ${
            theme === 'dark' ? 'bg-slate-900/80 border-white/10 text-yellow-400' : 'bg-white/80 border-slate-200 text-slate-600'
          }`}
        >
          {theme === 'dark' ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
          )}
        </button>
      )}
      
      <main className="transition-all duration-500 min-h-screen">
        {isAdmin && currentPage === 'canvas' ? (
          <CanvasPage 
            data={data} 
            onDataUpdate={handleDataUpdate}
            theme={theme}
          />
        ) : (
          <InnovativePage 
            data={data} 
            theme={theme}
          />
        )}
      </main>

      {isAdmin && (
        <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3">
           <div className={`px-4 py-2 rounded-full text-[10px] font-mono uppercase tracking-widest flex items-center gap-2 backdrop-blur-md border ${
             theme === 'dark' ? 'bg-slate-900/60 border-white/10 text-emerald-500' : 'bg-white/60 border-slate-200 text-emerald-600'
           } shadow-xl`}>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Admin Mode Active
           </div>
        </div>
      )}

      {!isAdmin && (
        <footer className="py-12 text-center opacity-40 hover:opacity-100 transition-opacity">
          <a href="?admin=true" className={`text-[10px] font-mono uppercase tracking-widest ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
            System Access
          </a>
        </footer>
      )}
    </div>
  );
};

export default App;