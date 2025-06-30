import React from 'react';
import ProgressionAchat from '../../composants/Panier/ProgressionAchat';
import '../../css/Panier/Informations.css';

export default function Informations({ onSuivant }) {
  return (
    <div className="page-produits">
      <ProgressionAchat etape={1} />
      <h2>Informations personnelles</h2>
      <form className="form-infos" onSubmit={e => { e.preventDefault(); onSuivant(); }}>
        <input type="text" placeholder="Nom complet" required />
        <input type="email" placeholder="Adresse e-mail" required />
        <input type="text" placeholder="Adresse" required />
        <button type="submit">Continuer vers le paiement</button>
      </form>
    </div>
  );
}