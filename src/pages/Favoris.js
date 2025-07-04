import React, { useState } from 'react';
import ProduitCard from '../composants/CarteProduit/ProduitCard';
import ProduitModal from '../composants/CarteProduit/ProduitModal';
import { useFavoris } from '../context/FavorisContext';
import '../css/Favoris/Favoris.css';

export default function Favoris({ ajouterAuPanier }) {
  const { favoris } = useFavoris();
  const [produitActif, setProduitActif] = useState(null);

  const ouvrirModal = (produit) => {
    setProduitActif(produit);
  };

  const fermerModal = () => {
    setProduitActif(null);
  };

  return (
    <div className="page-produits">
      <h2>Vos produits favoris</h2>
      {favoris.length === 0 ? (
        <p className="intro-produits">Aucun produit dans les favoris.</p>
      ) : (
        <div className="produits-container">
          {favoris.map(produit => (
            <ProduitCard
              key={produit.id}
              produit={produit}
              onVoirDetails={() => ouvrirModal(produit)}
            />
          ))}
        </div>
      )}

      {produitActif && (
        <ProduitModal
          produit={produitActif}
          onClose={fermerModal}
          ajouterAuPanier={ajouterAuPanier}
        />
      )}
    </div>
  );
}
