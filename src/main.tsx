import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { loadDesignSystem } from './ds';
import App from './App';

loadDesignSystem().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
