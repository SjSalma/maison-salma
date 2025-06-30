import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useFavoris } from '../context/FavorisContext';
import { usePanier } from '../context/PanierContext';

import '../css/Navbar.css';

export default function Navbar() {
  const [recherche, setRecherche] = useState('');
  const navigate = useNavigate();
  const { favoris } = useFavoris(); // 🔥 ici
  const { quantiteTotale } = usePanier(); // Ajout

  const handleRecherche = (e) => {
    e.preventDefault();
    if (recherche.trim() !== '') {
      navigate(`/produits?recherche=${encodeURIComponent(recherche.trim())}`);
      setRecherche('');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">MAISON SALMA</Link>

        <ul className="nav-links">
          <li><Link to="/produits">Produits</Link></li>
          <li><Link to="/">Inspiration</Link></li>
          <li><Link to="/apropos">À propos de nous</Link></li>
        </ul>

        <div className="nav-icons">
          <form onSubmit={handleRecherche} className="search-form">
            <input
              type="text"
              placeholder="Recherche de produits"
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
            />
            <button type="submit">🔍</button>
          </form>

          <Link to="/favoris" aria-label="Favoris">
            🤍 <span className="compteur">{favoris.length}</span>
          </Link>
          <Link to="/panier" aria-label="Panier">
            🛒 <span className="compteur">{quantiteTotale}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
