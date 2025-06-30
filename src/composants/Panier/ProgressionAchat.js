import React from 'react';
import '../../css/Panier/ProgressionAchat.css';

export default function ProgressionAchat({ etape }) {
  const etapes = ['Panier', 'Informations', 'Paiement', 'Confirmation'];

  return (
    <div className="progression-achat">
      {etapes.map((label, index) => (
        <div key={label} className={`etape ${index <= etape ? 'active' : ''}`}>
          <div className="numero">{index + 1}</div>
          <div className="label">{label}</div>
          {index < etapes.length - 1 && <div className="barre" />}
        </div>
      ))}
    </div>
  );
}
