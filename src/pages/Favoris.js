import React from 'react';
import ProduitCard from '../composants/ProduitCard';
import { useFavoris } from '../context/FavorisContext';
import '../css/Favoris/Favoris.css';

export default function Favoris({ ajouterAuPanier }) {
  const { favoris, toggleFavori } = useFavoris();

  return (
    <div className="page-produits">
      <h2>Vos produits favoris</h2>
      {favoris.length === 0 ? (
        <p>Aucun produit dans les favoris.</p>
      ) : (
        <div className="produits-container">
          {favoris.map(produit => (
            <ProduitCard
              key={produit.id}
              produit={produit}
              ajouterAuPanier={ajouterAuPanier}
              estFavori={true}
              toggleFavori={() => toggleFavori(produit)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
