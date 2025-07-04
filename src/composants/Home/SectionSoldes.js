import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProduitCard from '../CarteProduit/ProduitCard';
import ProduitModal from '../CarteProduit/ProduitModal';
import '../../css/Home/SectionSoldes.css';

export default function SectionSoldes({ produits }) {
  const [produitActif, setProduitActif] = useState(null);

  const handleVoirDetails = (produit) => {
    setProduitActif(produit);
  };

  const fermerModal = () => {
    setProduitActif(null);
  };

  return (
    <div className="section-soldes">
      <div className="soldes-header">
        <h2 className="soldes-titre">Top 4 rabais</h2>
        <Link to="/produits?filtre=solde" className="lien-solde">
          Découvrir maintenant
        </Link>
      </div>

      {produits.length === 0 ? (
        <p className="soldes-vide">Aucun produit en solde.</p>
      ) : (
        <div className="soldes-grille">
          {produits.map(produit => (
            <ProduitCard
              key={produit.id}
              produit={produit}
              onVoirDetails={() => handleVoirDetails(produit)}
              className="carte-soldes produit-card"
            />
          ))}
        </div>
      )}

      {produitActif && (
        <ProduitModal
          produit={produitActif}
          onClose={fermerModal}
        />
      )}
    </div>
  );
}
