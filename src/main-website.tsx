import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppWebsite from './AppWebsite.tsx';

/**
 * Entry point for static website build (GitHub Pages)
 * Uses AppWebsite instead of full App with authentication
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWebsite />
  </StrictMode>
);

