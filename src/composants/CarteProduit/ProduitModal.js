import React from 'react';
import '../../css/CarteProduit/ProduitModal.css';
import { usePanier } from '../../context/PanierContext';
import { useFavoris } from '../../context/FavorisContext';

export default function ProduitModal({ produit, onClose }) {
  const { panier, ajouterProduit, changerQuantite } = usePanier();
  const { favoris, toggleFavori } = useFavoris();

  const itemDansPanier = panier.find(p => p.id === produit?.id);
  const estFavori = favoris.some(p => p.id === produit?.id);

  if (!produit) return null;

  // ✅ Chemins d’image adaptables pour GitHub Pages et local
  const imagePath = `${process.env.PUBLIC_URL}/images/produits/${produit.id}.jpg`;
  const fallback = `${process.env.PUBLIC_URL}/images/produits/image_defaut.jpg`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-contenu modal-flex" onClick={(e) => e.stopPropagation()}>
        <button className="btn-fermer" onClick={onClose}>✕</button>

        <div className="modal-image">
          <img
            src={imagePath}
            alt={produit.nom}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = fallback;
            }}
          />
          <button
            className={`favori-btn ${estFavori ? 'active' : ''}`}
            onClick={() => toggleFavori(produit)}
            aria-label="Ajouter aux favoris"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="26"
              height="26"
              fill={estFavori ? '#a51818' : 'none'}
              stroke="#2f2a28"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>

        <div className="modal-info">
          <h2>{produit.nom.toUpperCase()}</h2>
          <p className="modal-description">{produit.description}</p>
          <p className="modal-id">#{produit.id}</p>
          <p className="modal-prix">
            <strong>{(produit.prix * (1 - produit.solde / 100)).toFixed(2)} €</strong>
            {produit.solde > 0 && (
              <span className="prix-original">
                {produit.prix.toFixed(2)} €</span>
            )}
          </p>

          <div className="btn-row">
            {itemDansPanier ? (
              <div className="quantite-control-modal">
                <button onClick={() => changerQuantite(produit.id, itemDansPanier.quantite - 1)}>-</button>
                <span>{itemDansPanier.quantite}</span>
                <button onClick={() => changerQuantite(produit.id, itemDansPanier.quantite + 1)}>+</button>
              </div>
            ) : (
              <button className="ajouter-panier" onClick={() => ajouterProduit(produit)}>
                Ajouter au panier
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
