import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initDB } from './lib/IndexedDB/db.ts';

initDB().then((success) => {
  if (success) {
    console.log("IndexedDB initialized successfully!");
  } else {
    console.error("Failed to initialize IndexedDB.");
  }

  // Render the app only after IndexedDB is initialized
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
