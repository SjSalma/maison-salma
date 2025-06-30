import React from 'react';
import ProgressionAchat from '../../composants/Panier/ProgressionAchat';
import '../../css/Panier/Paiement.css';

export default function Paiement({ onSuivant }) {
  return (
    <div className="page-produits">
      <ProgressionAchat etape={2} />
      <h2>Paiement</h2>
      <form className="form-paiement" onSubmit={e => { e.preventDefault(); onSuivant(); }}>
        <input type="text" placeholder="Numéro de carte" required />
        <input type="text" placeholder="Date d'expiration" required />
        <input type="text" placeholder="CVC" required />
        <button type="submit">Confirmer le paiement</button>
      </form>
    </div>
  );
}