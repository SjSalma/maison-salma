import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './composants/Navbar';
import Home from './pages/Home';
import Produits from './pages/Produits';
import Apropos from './pages/Apropos';
import Favoris from './pages/Favoris';
import Panier from './pages/Panier';
import Informations from './composants/Panier/Informations';
import Paiement from './composants/Panier/Paiement';
import Confirmation from './composants/Panier/Confirmation';

function AppRoutes({ favoris, toggleFavori, panier, ajouterAuPanier, retirerDuPanier }) {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/produits" element={
        <Produits
          favoris={favoris}
          toggleFavori={toggleFavori}
          ajouterAuPanier={ajouterAuPanier}
        />
      } />
      <Route path="/apropos" element={<Apropos />} />
      <Route path="/favoris" element={
        <Favoris
          favoris={favoris}
          toggleFavori={toggleFavori}
          ajouterAuPanier={ajouterAuPanier}
        />
      } />
      <Route path="/panier" element={
        <Panier
          panier={panier}
          retirerDuPanier={retirerDuPanier}
        />
      } />
      <Route path="/achat/informations" element={<Informations onSuivant={() => navigate("/achat/paiement")} />} />
      <Route path="/achat/paiement" element={<Paiement onSuivant={() => navigate("/achat/confirmation")} />} />
      <Route path="/achat/confirmation" element={<Confirmation />} />
    </Routes>
  );
}

export default function App() {
  const [favoris, setFavoris] = useState([]);
  const [panier, setPanier] = useState([]);

  const toggleFavori = (produit) => {
    setFavoris(prev =>
      prev.some(p => p.id === produit.id)
        ? prev.filter(p => p.id !== produit.id)
        : [...prev, produit]
    );
  };

  const ajouterAuPanier = (produit) => {
    setPanier(prev => [...prev, produit]);
  };

  const retirerDuPanier = (produitId) => {
    setPanier(prev => prev.filter(p => p.id !== produitId));
  };

  return (
    <Router>
      <Navbar />
      <AppRoutes
        favoris={favoris}
        toggleFavori={toggleFavori}
        panier={panier}
        ajouterAuPanier={ajouterAuPanier}
        retirerDuPanier={retirerDuPanier}
      />
    </Router>
  );
}
