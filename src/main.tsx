import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n' // Import i18n configuration
import './index.css'
import App from './App.tsx'
import { initDB } from './lib/IndexedDB/db.ts';

initDB().then((success) => {
  if (success) {
    console.log("IndexedDB initialized successfully!");
  } else {
    console.error("Failed to initialize IndexedDB.");
  }

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
