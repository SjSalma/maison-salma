import React from 'react';
import ProduitCard from '../ProduitCard';
import '../../css/Produits/ListeProduits.css';

export default function ListeProduits({ produits, favoris, ajouterAuPanier, toggleFavori }) {
  return (
    <div className="produits-container">
      {produits.length > 0 ? (
        produits.map(p => (
          <ProduitCard
            key={p.id}
            produit={p}
            ajouterAuPanier={ajouterAuPanier}
            estFavori={favoris.includes(p.id)}
            toggleFavori={() => toggleFavori(p.id)}
          />
        ))
      ) : (
        <p>Aucun produit ne correspond à votre recherche.</p>
      )}
    </div>
  );
}
