import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './css/index.css';
import { FavorisProvider } from './context/FavorisContext';
import { PanierProvider } from './context/PanierContext'; // ✅ à importer

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FavorisProvider>
      <PanierProvider> {/* ✅ on entoure aussi avec PanierProvider */}
        <App />
      </PanierProvider>
    </FavorisProvider>
  </React.StrictMode>
);
