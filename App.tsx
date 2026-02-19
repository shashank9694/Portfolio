
import React, { useState, useCallback, useEffect } from 'react';
import { PageType, PortfolioData, Theme } from './types';
import { INITIAL_DATA } from './constants';
import Navigation from './components/Navigation';
import CanvasPage from './components/CanvasPage';
import InnovativePage from './components/InnovativePage';

const STORAGE_KEY = 'aurafolio_data';

const App: React.FC = () => {
  // Check if user is in Admin mode via URL: e.g., yoursite.com/?admin=true
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('innovative');
  const [theme, setTheme] = useState<Theme>('light');
  const [data, setData] = useState<PortfolioData>(INITIAL_DATA);

  // Initialize Admin status and Load Saved Data
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const adminMode = params.get('admin') === 'true';
    setIsAdmin(adminMode);
    
    // If admin, default to canvas, if visitor, default to innovative
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

  // Persist data to localStorage on every change
  const handleDataUpdate = useCallback((newData: Partial<PortfolioData>) => {
    setData(prev => {
      const updated = { ...prev, ...newData };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <div className={`antialiased font-sans transition-colors duration-500 min-h-screen ${
      theme === 'dark' ? 'bg-[#030712] text-slate-300' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Navigation only shown to Admin */}
      {isAdmin && (
        <Navigation 
          currentPage={currentPage} 
          onPageChange={setCurrentPage} 
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      )}

      {/* Public Theme Toggle (Visible to everyone if you want, or just admin) */}
      {!isAdmin && (
        <button
          onClick={toggleTheme}
          className={`fixed top-6 right-6 z-50 w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-500 shadow-lg backdrop-blur-md ${
            theme === 'dark' ? 'bg-slate-900/60 border-white/10 text-yellow-400' : 'bg-white/70 border-slate-200 text-slate-600'
          }`}
        >
          {theme === 'dark' ? '☼' : '☾'}
        </button>
      )}
      
      <main className="transition-all duration-700 ease-in-out">
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

      {/* Admin Status Indicator */}
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

      {/* Hidden Admin Entry Point (Very subtle footer link) */}
      {!isAdmin && (
        <footer className="py-8 text-center opacity-20 hover:opacity-100 transition-opacity">
          <a href="?admin=true" className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
            System Access
          </a>
        </footer>
      )}
    </div>
  );
};

export default App;
