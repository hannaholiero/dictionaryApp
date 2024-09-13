// src/main.tsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Byt från .jsx till .tsx, TypeScript hittar detta automatiskt
import '../src/styles/index.css';

// Lägg till en typkontroll för att se till att root-elementet finns
const rootElement = document.getElementById('root');

// Kontrollera att rootElement inte är null
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} else {
  console.error('Root element not found');
}
