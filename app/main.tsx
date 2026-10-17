import React from 'react';
import { createRoot } from 'react-dom/client';
import Home from './page';
import './globals.css';
import './density.css';
import './catalog-structure.css';
import './brandbook.css';
import './wedding-warmth.css';
createRoot(document.getElementById('root')!).render(<React.StrictMode><Home /></React.StrictMode>);
