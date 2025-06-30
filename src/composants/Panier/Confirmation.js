import React from 'react';
import ProgressionAchat from '../../composants/Panier/ProgressionAchat';
import '../../css/Panier/Confirmation.css';

export default function Confirmation() {
  return (
    <div className="page-produits">
      <ProgressionAchat etape={3} />
      <h2>Merci pour votre achat !</h2>
      <p>Une confirmation a été envoyée par e-mail.</p>
    </div>
  );
}