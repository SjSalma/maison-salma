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
  afficherType,
  afficherStyle,
  afficherPiece,
  afficherMateriau
}) {
  return (
    <div className="filtres">
      <input type="text" name="recherche" placeholder="Rechercher..." value={filtre.recherche} onChange={handleChange} />

      <select name="type" value={filtre.type} onChange={handleChange}>
        <option value="">Type</option>
        {types.map(t => <option key={t} value={t}>{afficherType(t)}</option>)}
      </select>

      <select name="style" value={filtre.style} onChange={handleChange}>
        <option value="">Style</option>
        {styles.map(s => <option key={s} value={s}>{afficherStyle(s)}</option>)}
      </select>

      <select name="piece" value={filtre.piece} onChange={handleChange}>
        <option value="">Pièce</option>
        {pieces.map(p => <option key={p} value={p}>{afficherPiece(p)}</option>)}
      </select>

      <select name="materiau" value={filtre.materiau} onChange={handleChange}>
        <option value="">Matériau</option>
        {materiaux.map(m => <option key={m} value={m}>{afficherMateriau(m)}</option>)}
      </select>

      <select name="tri" value={filtre.tri} onChange={handleChange}>
        <option value="">Trier par</option>
        <option value="prixAsc">Prix ↑</option>
        <option value="prixDesc">Prix ↓</option>
        <option value="solde">Soldes %</option>
        <option value="nomAsc">Nom A → Z</option>
        <option value="nomDesc">Nom Z → A</option>
      </select>

      <button onClick={resetFiltres}>Réinitialiser</button>
    </div>
  );
}
