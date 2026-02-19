import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { setup } from 'twind';
import { observe } from 'twind/observe';

// Initialize Twind as our NPM-based Tailwind alternative for runtime styling.
// This allows us to use all Tailwind classes dynamically while importing the engine as a module.
setup({
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        slate: {
          950: '#020617',
        }
      },
    },
  },
});

// Observe the document to inject styles for Tailwind classes automatically.
observe(document.documentElement);

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);