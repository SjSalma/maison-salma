import React, { useState } from 'react';
import ProduitCard from '../CarteProduit/ProduitCard';
import ProduitModal from '../CarteProduit/ProduitModal';
import '../../css/Produits/ListeProduits.css';
import { usePanier } from '../../context/PanierContext';
import { useFavoris } from '../../context/FavorisContext';

export default function ListeProduits({ produits }) {
  const [produitActif, setProduitActif] = useState(null);

  const { panier, ajouterProduit, changerQuantite } = usePanier();
  const { favoris, toggleFavori } = useFavoris();

  return (
    <div className="produits-container">
      {produits.length > 0 ? (
        produits.map(p => (
          <ProduitCard
            key={p.id}
            produit={p}
            ajouterAuPanier={ajouterProduit}
            estFavori={favoris.some(f => f.id === p.id)}
            toggleFavori={() => toggleFavori(p)}
            onVoirDetails={() => setProduitActif(p)}
          />
        ))
      ) : (
        <p>Aucun produit ne correspond à votre recherche.</p>
      )}

      {produitActif && (
        <ProduitModal
          produit={produitActif}
          onClose={() => setProduitActif(null)}
        />
      )}
    </div>
  );
}
