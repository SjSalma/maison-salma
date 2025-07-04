import React from 'react';
import '../../css/InspirationConseil/IntroInspirationConseil.css';

export default function IntroInspiration() {
  return (
    <section className="intro-inspiration">
      <div className="inspiration-banner">
        <img
          src="/images/InspirationConseil/inspirationConseil_banniere.jpg"
          alt="Bannière Inspiration & Conseils"
        />
      </div>

      <div className="intro-contenu">
        <div><h1>Inspiration & Conseils</h1></div>
        <div><p>Des idées, des ambiances et des astuces déco pour sublimer votre intérieur.</p></div>
      </div>
    </section>
  );
}
