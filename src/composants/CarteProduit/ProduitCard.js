import React from 'react';
import '../../css/CarteProduit/ProduitCard.css';
import { useFavoris } from '../../context/FavorisContext';
import { Heart } from 'lucide-react';

export default function ProduitCard({ produit, onVoirDetails, className }) {
  const { favoris, toggleFavori } = useFavoris();
  const estFavori = favoris.some(p => p.id === produit.id);

  // ✅ Chemins d'image compatibles GitHub Pages et local
  const imagePath = `${process.env.PUBLIC_URL}/images/produits/${produit.id}.jpg`;
  const fallback = `${process.env.PUBLIC_URL}/images/produits/image_defaut.jpg`;

  return (
    <div className={`produit-card ${className || ''}`}>
      {produit.solde > 0 && <span className="solde-badge">-{produit.solde}%</span>}

      <div className="image-container">
        <img
          src={imagePath}
          alt={produit.nom}
          loading="lazy"
          onClick={onVoirDetails}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallback;
          }}
        />
      </div>

      <div className="titre-favori">
        <h3>{produit.nom}</h3>
        <button
          className={`favori-btn ${estFavori ? 'active' : ''}`}
          onClick={() => toggleFavori(produit)}
          aria-label="Ajouter aux favoris"
        >
          <Heart size={18} strokeWidth={1.2} fill={estFavori ? '#a51c1c' : 'none'} />
        </button>
      </div>

      <p>{produit.description}</p>
      <p>
        <strong>{(produit.prix * (1 - produit.solde / 100)).toFixed(2)} €</strong>
        {produit.solde > 0 && (
          <span className="prix-original"> {produit.prix.toFixed(2)} €</span>
        )}
      </p>
    </div>
  );
}
