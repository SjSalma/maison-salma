import React from 'react';
import { usePanier } from '../context/PanierContext';
import { useNavigate } from 'react-router-dom';
import ProgressionAchat from '../composants/Panier/ProgressionAchat';
import '../css/Panier/Panier.css';
import { Trash2 } from 'lucide-react';

export default function Panier() {
  const { panier, changerQuantite } = usePanier();
  const navigate = useNavigate();

  const TAXE_TAUX = 0.14975;

  const sousTotal = panier.reduce((acc, produit) => {
    const prixSolde = produit.prix * (1 - (produit.solde || 0) / 100);
    return acc + prixSolde * produit.quantite;
  }, 0);

  const taxes = sousTotal * TAXE_TAUX;
  const total = sousTotal + taxes;

  const handleAchat = () => {
    localStorage.setItem('total', total.toFixed(2));
    navigate('/achat/informations');
  };

  return (
    <div className="panier-wrapper">
      <ProgressionAchat etape={0} />
      <h2>Mon panier</h2>

      {panier.length === 0 ? (
        <p className="panier-vide">Votre panier est vide.</p>
      ) : (
        <div className="panier-grid">
          {/* Section gauche - Produits */}
          <div className="panier-produits">
            <div className="ligne-entete">
              <span>Produit</span>
              <span>Prix</span>
              <span>Quantité</span>
              <span>Sous-total</span>
              <span></span>
            </div>

            {panier.map((produit) => {
              const prixUnitaire = produit.prix * (1 - (produit.solde || 0) / 100);
              const sousTotal = prixUnitaire * produit.quantite;
              const imagePath = `${process.env.PUBLIC_URL}/images/produits/${produit.id}.jpg`;
              const fallback = `${process.env.PUBLIC_URL}/images/produits/image_defaut.jpg`;

              return (
                <div className="ligne-produit" key={produit.id}>
                  <div className="cellule-produit">
                    <img
                      src={imagePath}
                      alt={produit.nom}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = fallback;
                      }}
                    />
                    <span>{produit.nom}</span>
                  </div>
                  <span>{prixUnitaire.toFixed(2)} €</span>
                  <div className="quantite-control quantite-panier">
                    <button
                      onClick={() => changerQuantite(produit.id, produit.quantite - 1)}
                      style={{ visibility: produit.quantite > 1 ? 'visible' : 'hidden' }}
                    >
                      -
                    </button>
                    <span>{produit.quantite}</span>
                    <button onClick={() => changerQuantite(produit.id, produit.quantite + 1)}>+</button>
                  </div>
                  <span>{sousTotal.toFixed(2)} €</span>
                  <button
                    onClick={() => changerQuantite(produit.id, 0)}
                    className="btn-supprimer"
                    aria-label="Supprimer du panier"
                  >
                    <Trash2 size={18} strokeWidth={1.2} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Section droite - Récapitulatif */}
          <div className="panier-total">
            <h3>Récapitulatif</h3>
            <p><span>Sous-total :</span> <span>{sousTotal.toFixed(2)} €</span></p>
            <p><span>Taxes :</span> <span>{taxes.toFixed(2)} €</span></p>
            <h4><span>Total TTC :</span> <span>{total.toFixed(2)} €</span></h4>
            <button onClick={handleAchat} className="btn-checkout">Procéder à l’achat</button>
          </div>
        </div>
      )}
    </div>
  );
}
