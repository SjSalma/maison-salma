import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './css/index.css';
import { FavorisProvider } from './context/FavorisContext';
import { PanierProvider } from './context/PanierContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FavorisProvider>
    <PanierProvider>
      <App />
    </PanierProvider>
  </FavorisProvider>
);
