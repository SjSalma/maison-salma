import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FiltresProduits from '../composants/Produits/FiltresProduits';
import ListeProduits from '../composants/Produits/ListeProduits';
import { useFavoris } from '../context/FavorisContext';
import { SlidersHorizontal, Search } from 'lucide-react';
import '../css/Produits/Produits.css';
import donneesProduits from '../donnees/donneesProduits'; // ✅ nouveau

export default function Produits() {
  const location = useLocation();
  const { favoris, toggleFavori } = useFavoris();
  const [produits, setProduits] = useState([]);
  const [produitsFiltres, setProduitsFiltres] = useState([]);
  const [panneauOuvert, setPanneauOuvert] = useState(false);
  const [filtreActifCount, setFiltreActifCount] = useState(0);

  const [filtre, setFiltre] = useState({
    type: '', style: '', piece: '', materiau: '', recherche: '', tri: ''
  });
  const [filtreTemp, setFiltreTemp] = useState({ ...filtre });

  const [termeRecherche, setTermeRecherche] = useState('');

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
    const isReload =
      performance?.navigation.type === 1 ||
      performance?.getEntriesByType('navigation')[0]?.type === 'reload';

    if (isReload) {
      const url = new URL(window.location.href);
      url.search = '';
      window.history.replaceState({}, '', url);
      const vide = { type: '', style: '', piece: '', materiau: '', recherche: '', tri: '' };
      setFiltre(vide);
      setFiltreTemp(vide);
      setTermeRecherche('');
    }
  }, []);

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
    if (params.get('filtre') === 'solde') filtreFromUrl.tri = 'solde';

    const cleaned = donneesProduits.map(p => ({
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
    setFiltreTemp(filtreFromUrl);
    setTermeRecherche(filtreFromUrl.recherche);
  }, [location.search]);

  useEffect(() => {
    let resultat = [...produits];
    const { recherche, type, style, piece, materiau, tri } = filtre;

    if (recherche) {
      const lower = recherche.toLowerCase();
      resultat = resultat.filter(p =>
        (p.nom + p.description).toLowerCase().includes(lower) ||
        p.id.toString().includes(lower)
      );
    }
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

  useEffect(() => {
    const count = Object.values(filtre).filter(v => v !== '').length;
    setFiltreActifCount(count);
  }, [filtre]);

  const handleChange = e => {
    const { name, value } = e.target;
    const toLower = ['type', 'style', 'piece', 'materiau'];
    setFiltreTemp({ ...filtreTemp, [name]: toLower.includes(name) ? value.toLowerCase() : value });
  };

  const validerFiltres = () => {
    setFiltre(filtreTemp);
    setPanneauOuvert(false);
  };

  const resetFiltres = () => {
    const vide = { type: '', style: '', piece: '', materiau: '', recherche: '', tri: '' };
    setFiltre(vide);
    setFiltreTemp(vide);
    setTermeRecherche('');
  };

  const handleRechercheSubmit = (e) => {
    e.preventDefault();
    setFiltre({ ...filtre, recherche: termeRecherche });
    setFiltreTemp({ ...filtre, recherche: termeRecherche });
  };

  return (
    <div className="page-produits">
      <div className="barre-superieure">
        <h2>Nos produits</h2>
        <div className="recherche-et-filtre">
          <form className="search-form-produits" onSubmit={handleRechercheSubmit}>
            <input
              type="text"
              name="recherche"
              placeholder="Recherche de produits"
              value={termeRecherche}
              onChange={(e) => setTermeRecherche(e.target.value)}
              className="champ-recherche-style"
            />
            <button type="submit" className="bouton-recherche" aria-label="Rechercher">
              <Search size={18} strokeWidth={1.2} />
            </button>
          </form>
          <button className="bouton-filtre" onClick={() => setPanneauOuvert(true)}>
            <span>FILTRE</span>
            <SlidersHorizontal size={18} />
            {filtreActifCount > 0 && (
              <span className="badge-filtres">{filtreActifCount}</span>
            )}
          </button>
          <button className="reset-btn" onClick={resetFiltres}>Réinitialiser</button>
        </div>
      </div>

      <FiltresProduits
        filtre={filtreTemp}
        types={types}
        styles={styles}
        pieces={pieces}
        materiaux={materiaux}
        handleChange={handleChange}
        resetFiltres={resetFiltres}
        validerFiltres={validerFiltres}
        afficherType={afficherType}
        afficherStyle={afficherStyle}
        afficherPiece={afficherPiece}
        afficherMateriau={afficherMateriau}
        panneauOuvert={panneauOuvert}
        setPanneauOuvert={setPanneauOuvert}
      />

      {panneauOuvert && (
        <div className="overlay-filtre" onClick={() => setPanneauOuvert(false)} />
      )}

      <ListeProduits
        produits={produitsFiltres}
        favoris={favoris.map(p => p.id)}
        ajouterAuPanier={ajouterAuPanier}
        toggleFavori={(id) => {
          const produit = produits.find(p => p.id === id);
          if (produit) toggleFavori(produit);
        }}
      />
    </div>
  );
}
