import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'


import { initDB } from './lib/IndexedDB/db';

// Initialize the database
initDB().then((success) => {
  if (success) {
    console.log('Database initialized successfully');
  } else {
    console.error('Failed to initialize database');
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
