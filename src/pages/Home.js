import React, { useEffect, useState } from 'react';
import BandePromo from '../composants/Home/BandePromo';
import SectionCategorie from '../composants/Home/SectionCategorie';
import SectionSoldes from '../composants/Home/SectionSoldes';
import '../css/Home/Home.css';
import donneesProduits from '../donnees/donneesProduits'; // ✅ ici

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
    const soldes = donneesProduits
      .filter(p => p.solde > 0)
      .sort((a, b) => b.solde - a.solde)
      .slice(0, 4);
    setProduitsSoldes(soldes);
  }, []);

  return (
    <div className="home-page">
      <div className="home-banner">
        <img
          src={`${process.env.PUBLIC_URL}/images/Home/home_banniere.jpg`}
          alt="Bannière Maison Salma"
        />
      </div>

      <div className="contenu-home">
        <SectionCategorie titre="Découvrez notre sélection par style" data={styles} filtre="style" />
        <SectionCategorie titre="Découvrez notre sélection par pièce" data={pieces} filtre="piece" className="avec-espace" />
        <SectionSoldes produits={produitsSoldes} />
      </div>
    </div>
  );
}
