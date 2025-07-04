import React from 'react';
import '../../css/Produits/FiltresProduits.css';

export default function FiltresProduits({
  filtre,
  types,
  styles,
  pieces,
  materiaux,
  handleChange,
  resetFiltres,
  validerFiltres,
  afficherType,
  afficherStyle,
  afficherPiece,
  afficherMateriau,
  panneauOuvert,
  setPanneauOuvert
}) {
  return (
    <>
      {panneauOuvert && (
        <div
          className="filtre-overlay"
          onClick={() => setPanneauOuvert(false)}
        />
      )}

      <div className={`panneau-filtres ${panneauOuvert ? 'ouvert' : ''}`}>
        <div className="entete-filtres">
          <button
            className="fermer-filtres"
            onClick={() => setPanneauOuvert(false)}
          >
            ×
          </button>
        </div>

        <select
          name="type"
          value={filtre.type}
          onChange={handleChange}
          className={filtre.type ? 'selected' : ''}
        >
          <option value="">Type</option>
          {types.map(t => (
            <option key={t} value={t}>
              {afficherType(t)}
            </option>
          ))}
        </select>

        <select
          name="style"
          value={filtre.style}
          onChange={handleChange}
          className={filtre.style ? 'selected' : ''}
        >
          <option value="">Style</option>
          {styles.map(s => (
            <option key={s} value={s}>
              {afficherStyle(s)}
            </option>
          ))}
        </select>

        <select
          name="piece"
          value={filtre.piece}
          onChange={handleChange}
          className={filtre.piece ? 'selected' : ''}
        >
          <option value="">Pièce</option>
          {pieces.map(p => (
            <option key={p} value={p}>
              {afficherPiece(p)}
            </option>
          ))}
        </select>

        <select
          name="materiau"
          value={filtre.materiau}
          onChange={handleChange}
          className={filtre.materiau ? 'selected' : ''}
        >
          <option value="">Matériau</option>
          {materiaux.map(m => (
            <option key={m} value={m}>
              {afficherMateriau(m)}
            </option>
          ))}
        </select>

        <select
          name="tri"
          value={filtre.tri}
          onChange={handleChange}
          className={filtre.tri ? 'selected' : ''}
        >
          <option value="">Trier par</option>
          <option value="prixAsc">Prix ↑</option>
          <option value="prixDesc">Prix ↓</option>
          <option value="solde">Soldes %</option>
          <option value="nomAsc">Nom A → Z</option>
          <option value="nomDesc">Nom Z → A</option>
        </select>

        <div className="filtres-actions">
          <button className="btn-filtres1" onClick={validerFiltres}>Valider</button>
          <button className="btn-filtres2" onClick={resetFiltres}>Réinitialiser</button>
        </div>
      </div>
    </>
  );
}
