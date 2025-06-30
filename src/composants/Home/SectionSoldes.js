import React from 'react';
import '../../css/Home/SectionSoldes.css';

export default function SectionSoldes({ produits }) {
  return (
    <div style={{ background: '#fff8e1', padding: '20px', marginTop: '30px' }}>
      <h2>🔥 Prix Mini (Top 4 rabais)</h2>
      {produits.length === 0 ? (
        <p>Aucun produit en solde.</p>
      ) : (
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {produits.map(produit => (
            <div
              key={produit.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '10px',
                padding: '10px',
                width: '200px',
                background: '#fff'
              }}
            >
              <img
                src={produit.image}
                alt={produit.nom}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/produits/image_defaut.jpg';
                }}
                style={{ width: '100%', borderRadius: '6px' }}
              />
              <div style={{ marginTop: '10px' }}>
                <p style={{ fontWeight: 'bold' }}>{produit.nom}</p>
                <p style={{ margin: 0 }}>Rabais : -{produit.solde}%</p>
                <p style={{ color: '#d32f2f' }}>CA${produit.prix.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
