import React from 'react';
import '../../css/Apropos/IntroApropos.css';

export default function Presentation() {
  return (
    <section className="page-apropos">
      <div className="apropos-banner">
        <img
          src={`${process.env.PUBLIC_URL}/images/Apropos/apropos_banniere.jpg`}
          alt="Bannière Inspiration & Conseils"
        />
      </div>

      <div className="intro-apropos">
        <div><h1 className="titre-encadre">Rejoignez l'univers Maison Salma</h1></div>
        <div><p className="texte-encadre">Nous souhaitons faire partie de votre univers.</p></div>
      </div>
    </section>
  );
}
