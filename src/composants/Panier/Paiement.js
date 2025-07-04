import React from 'react';
import { usePanier } from '../../context/PanierContext';
import ProgressionAchat from '../../composants/Panier/ProgressionAchat';
import '../../css/Panier/Paiement.css';

export default function Paiement({ onSuivant }) {
  const { viderPanier } = usePanier();

  const handlePaiement = (e) => {
    e.preventDefault();

    const numeroCommande = '#' + Math.floor(100000 + Math.random() * 900000);
    localStorage.setItem('commandeId', numeroCommande);

    const panier = JSON.parse(localStorage.getItem('panier')) || [];

    const panierAvecTotaux = panier.map(item => ({
      ...item,
      prix_total: item.prix_total || (item.prix * item.quantite)
    }));

    // ✅ ENREGISTRER LE PANIER FINAL POUR CONFIRMATION
    localStorage.setItem('panier_final', JSON.stringify(panierAvecTotaux));

    // ✅ CALCUL TOTAL
    const total = panierAvecTotaux.reduce((acc, item) => acc + item.prix_total, 0).toFixed(2);
    localStorage.setItem('total', total);

    // ✅ VIDER LE PANIER
    localStorage.setItem('panier', JSON.stringify([])); // vider localStorage
    viderPanier(); // vider le contexte React

    localStorage.removeItem('emailEnvoye'); // reset flag
    onSuivant(); // aller à confirmation
  };

  return (
    <div className="page-paiement">
      <ProgressionAchat etape={2} />
      <h2>Paiement</h2>
      <form className="form-paiement" onSubmit={handlePaiement}>
        <input type="text" placeholder="Numéro de carte" required />
        <input type="text" placeholder="Date d'expiration" required />
        <input type="text" placeholder="CVC" required />
        <button type="submit">Confirmer le paiement</button>
      </form>
    </div>
  );
}
