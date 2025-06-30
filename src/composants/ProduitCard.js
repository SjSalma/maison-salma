import React from 'react';
import '../css/ProduitCard.css';
import { useFavoris } from '../context/FavorisContext';
import { usePanier } from '../context/PanierContext'; // ✅ important

export default function ProduitCard({ produit }) {
  const { favoris, toggleFavori } = useFavoris();
  const { panier, ajouterProduit, changerQuantite } = usePanier();

  const estFavori = favoris.some(p => p.id === produit.id);
  const itemDansPanier = panier.find(p => p.id === produit.id);

  const imagePath = `/${produit.image}`;
  const fallback = '/images/produits/image_defaut.jpg';

  return (
    <div className="produit-card">
      <div className="produit-card-header">
        {produit.solde > 0 && <div className="solde-badge">-{produit.solde}%</div>}

        <button
          className={`favori-btn ${estFavori ? 'active' : ''}`}
          onClick={() => toggleFavori(produit)}
          aria-label="Ajouter aux favoris"
        >
          {estFavori ? '❤️' : '🤍'}
        </button>
      </div>

      <img
        src={imagePath}
        alt={produit.nom}
        onError={(e) => { e.target.onerror = null; e.target.src = fallback; }}
      />

      <h3>{produit.nom}</h3>
      <p>{produit.description}</p>
      <p>
        <strong>{(produit.prix * (1 - produit.solde / 100)).toFixed(2)} €</strong>
        {produit.solde > 0 && <span className="prix-original"> {produit.prix.toFixed(2)} €</span>}
      </p>

      {itemDansPanier ? (
        <div className="quantite-control">
          <button onClick={() => changerQuantite(produit.id, itemDansPanier.quantite - 1)}>-</button>
          <span>{itemDansPanier.quantite}</span>
          <button onClick={() => changerQuantite(produit.id, itemDansPanier.quantite + 1)}>+</button>
        </div>
      ) : (
        <button onClick={() => ajouterProduit(produit)}>Ajouter au panier</button>
      )}
    </div>
  );
}
