import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FiltresProduits from '../composants/Produits/FiltresProduits';
import ListeProduits from '../composants/Produits/ListeProduits';
import { useFavoris } from '../context/FavorisContext';
import '../css/Produits/Produits.css';

export default function Produits() {
  const location = useLocation();
  const { favoris, toggleFavori } = useFavoris(); // 🔥 Utilise le contexte

  const [produits, setProduits] = useState([]);
  const [produitsFiltres, setProduitsFiltres] = useState([]);

  const [filtre, setFiltre] = useState({
    type: '', style: '', piece: '', materiau: '', recherche: '', tri: ''
  });

  const [types, setTypes] = useState([]);
  const [styles, setStyles] = useState([]);
  const [pieces, setPieces] = useState([]);
  const [materiaux, setMateriaux] = useState([]);

  const ajouterAuPanier = (produit) => alert(`${produit.nom} a été ajouté au panier.`);

  const afficherType = (type) => ({ objet: "Objet", miroir: "Miroir", vase: "Vase" }[type] || type);
  const afficherStyle = (s) => ({ boheme: "Bohème", scandinave: "Scandinave" }[s] || s);
  const afficherPiece = (p) => ({ salon: "Salon", chambre: "Chambre" }[p] || p);
  const afficherMateriau = (m) => ({ bois: "Bois", metal: "Métal" }[m] || m);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filtreFromUrl = {
      type: params.get('type')?.toLowerCase() || '',
      style: params.get('style')?.toLowerCase() || '',
      piece: params.get('piece')?.toLowerCase() || '',
      materiau: params.get('materiau')?.toLowerCase() || '',
      recherche: params.get('recherche')?.toLowerCase() || '',
      tri: params.get('tri') || ''
    };

    fetch('http://localhost:3001/api/produits')
      .then(res => res.json())
      .then(data => {
        const cleaned = data.map(p => ({
          ...p,
          type: p.type?.trim().toLowerCase(),
          style: p.style?.trim().toLowerCase(),
          piece: p.piece?.trim().toLowerCase(),
          materiau: p.materiau?.trim().toLowerCase()
        })).filter(p => p.type && p.style);

        setProduits(cleaned);
        setTypes([...new Set(cleaned.map(p => p.type))]);
        setStyles([...new Set(cleaned.map(p => p.style))]);
        setPieces([...new Set(cleaned.map(p => p.piece))]);
        setMateriaux([...new Set(cleaned.map(p => p.materiau))]);
        setFiltre(filtreFromUrl);
      });
  }, [location.search]);

  useEffect(() => {
    let resultat = [...produits];
    const { recherche, type, style, piece, materiau, tri } = filtre;

    if (recherche) resultat = resultat.filter(p => (p.nom + p.description).toLowerCase().includes(recherche));
    if (type) resultat = resultat.filter(p => p.type === type);
    if (style) resultat = resultat.filter(p => p.style === style);
    if (piece) resultat = resultat.filter(p => p.piece === piece);
    if (materiau) resultat = resultat.filter(p => p.materiau === materiau);

    if (tri === 'prixAsc') resultat.sort((a, b) => a.prix - b.prix);
    if (tri === 'prixDesc') resultat.sort((a, b) => b.prix - a.prix);
    if (tri === 'solde') resultat = resultat.filter(p => p.solde > 0).sort((a, b) => b.solde - a.solde);
    if (tri === 'nomAsc') resultat.sort((a, b) => a.nom.localeCompare(b.nom));
    if (tri === 'nomDesc') resultat.sort((a, b) => b.nom.localeCompare(a.nom));

    setProduitsFiltres(resultat);
  }, [filtre, produits]);

  const handleChange = e => {
    const { name, value } = e.target;
    const toLower = ['type', 'style', 'piece', 'materiau', 'recherche'];
    setFiltre({ ...filtre, [name]: toLower.includes(name) ? value.toLowerCase() : value });
  };

  return (
    <div className="page-produits">
      <h2>Nos produits</h2>
      <FiltresProduits
        filtre={filtre}
        types={types}
        styles={styles}
        pieces={pieces}
        materiaux={materiaux}
        handleChange={handleChange}
        resetFiltres={() => setFiltre({ type: '', style: '', piece: '', materiau: '', recherche: '', tri: '' })}
        afficherType={afficherType}
        afficherStyle={afficherStyle}
        afficherPiece={afficherPiece}
        afficherMateriau={afficherMateriau}
      />
      <ListeProduits
        produits={produitsFiltres}
        favoris={favoris.map(p => p.id)} // ids
        ajouterAuPanier={ajouterAuPanier}
        toggleFavori={(id) => {
          const produit = produits.find(p => p.id === id);
          if (produit) toggleFavori(produit);
        }}
      />
    </div>
  );
}
