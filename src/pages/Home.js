// Home.jsx
import React, { useState, useEffect } from 'react';
import BandePromo from '../composants/Home/BandePromo';
import SectionCategorie from '../composants/Home/SectionCategorie';
import SectionSoldes from '../composants/Home/SectionSoldes';
import '../css/Home/Home.css';

export default function Home() {
  const [produitsSoldes, setProduitsSoldes] = useState([]);

  const styles = [
    { label: 'Bohème', image: 'boheme.jpg' },
    { label: 'Scandinave', image: 'scandinave.jpg' },
    { label: 'Minimaliste', image: 'minimaliste.jpg' },
    { label: 'Ethnique', image: 'ethnique.jpg' },
    { label: 'Classique', image: 'classique.jpg' },
    { label: 'Moderne', image: 'moderne.jpg' },
  ];

  const pieces = [
    { label: 'Salon', image: 'salon.jpg' },
    { label: 'Chambre', image: 'chambre.jpg' },
    { label: 'Cuisine', image: 'cuisine.jpg' },
    { label: 'Salle à manger', image: 'salle_a_manger.jpg' },
    { label: 'Entrée', image: 'entree.jpg' },
    { label: 'Bureau', image: 'bureau.jpg' },
    { label: 'Salle de bain', image: 'salle_de_bain.jpg' },
  ];

  useEffect(() => {
    fetch('http://localhost:3001/api/produits')
      .then(res => res.json())
      .then(data => {
        const soldes = data
          .filter(p => p.solde > 0)
          .sort((a, b) => b.solde - a.solde)
          .slice(0, 4);
        setProduitsSoldes(soldes);
      })
      .catch(err => console.error('Erreur chargement produits soldés :', err));
  }, []);

  return (
    <div className="home-page">
      <div className="home-banner">
        <img src={`${process.env.PUBLIC_URL}/images/Home/home_banniere.jpg`} alt="Bannière Maison Salma" />
      </div>

      {/* ✅ Wrapper qui remonte tout */}
      <div className="contenu-home">
        <SectionCategorie titre="Découvrez notre sélection par style" 
          data={styles} 
          filtre="style" />
        <SectionCategorie
          titre="Découvrez notre sélection par pièce"
          data={pieces}
          filtre="piece"
          className="avec-espace"
        />
        <SectionSoldes produits={produitsSoldes} />
      </div>
    </div>
  );
}
