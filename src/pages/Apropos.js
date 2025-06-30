import React from 'react';
import '../css/Apropos.css';

export default function Apropos() {
  return (
    <div className="page-apropos">
      <h1>À propos de Maison Salma</h1>
      <section className="intro">
        <p>
          <strong>Maison Salma</strong> est une marque fictive dédiée à l’art de vivre et à la décoration intérieure. 
          Fondée avec passion, elle incarne une vision : offrir à chacun un univers esthétique, chaleureux et raffiné, où chaque objet a une âme.
        </p>
      </section>

      <section className="mission">
        <h2>Notre mission</h2>
        <p>
          Créer une expérience unique pour les amoureux de décoration, en proposant une sélection d’objets soigneusement choisis 
          pour leur beauté, leur qualité, et leur pouvoir d’évoquer des émotions.
        </p>
      </section>

      <section className="valeurs">
        <h2>Nos valeurs</h2>
        <ul>
          <li><strong>Authenticité :</strong> Des pièces qui racontent une histoire.</li>
          <li><strong>Élégance :</strong> Un style intemporel, inspiré par le charme de l’esthétique « old money ».</li>
          <li><strong>Accessibilité :</strong> Une beauté qui reste à portée de main.</li>
          <li><strong>Durabilité :</strong> Favoriser des matériaux nobles et durables.</li>
        </ul>
      </section>

      <section className="fondatrice">
        <h2>Notre fondatrice</h2>
        <p>
          Salma, passionnée par l’art, les ambiances luxueuses et les intérieurs raffinés, a imaginé cette maison fictive comme 
          une ode au bon goût. Chaque collection est pensée pour évoquer un univers : tantôt bohème, tantôt classique, toujours élégant.
        </p>
      </section>

      <section className="contact">
        <h2>Nous contacter</h2>
        <p>📧 contact@maisonsalma.com (adresse fictive)</p>
        <p>📍 123 rue du Rêve, Paris — Une adresse imaginaire pour une marque qui fait rêver.</p>
      </section>
    </div>
  );
}
