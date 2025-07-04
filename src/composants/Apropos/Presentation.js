import React from 'react';
import { Mail, MapPin } from 'lucide-react';
import '../../css/Apropos/Presentation.css';

export default function Presentation() {
  return (
    <section className="text-apropos">
      <div className="intro-text">
        <p>
          Transformez votre passion pour les beaux intérieurs en une aventure raffinée.<br />
          Maison Salma célèbre l’art de vivre à la française à travers une sélection élégante 
          d’objets de décoration. Inspirée par les ambiances feutrées et l’héritage du style intemporel, 
          la marque incarne une esthétique sobre et précieuse. 
          Découvrez notre histoire, nos valeurs, et la femme qui a imaginé cet univers.
        </p>
      </div>

      <div className="apropos-section">
        <div className="apropos-paraphraphe">
          <h2>Notre mission</h2>
          <p>
            Offrir à chacun la possibilité de composer un intérieur unique et raffiné, en sélectionnant des pièces 
            choisies avec soin pour leur qualité, leur âme et leur pouvoir d’évocation.
          </p>
        </div>

        <div className="apropos-paraphraphe">
          <h2>Nos valeurs</h2>
          <ul>
            <li><strong>Authenticité :</strong> Chaque objet raconte une histoire.</li>
            <li><strong>Élégance :</strong> Une esthétique noble et épurée.</li>
            <li><strong>Durabilité :</strong> Un engagement envers les matières nobles et pérennes.</li>
          </ul>
        </div>

        <div className="apropos-paraphraphe">
          <h2>Notre fondatrice</h2>
          <p>
            Salma, passionnée d’art, de mode et de décoration, imagine chaque collection comme une invitation 
            à explorer l’élégance discrète. À travers Maison Salma, elle propose une vision sensible du luxe, 
            inspirée des grandes maisons européennes.
          </p>
        </div>

        <div className="apropos-paraphraphe">
          <h2>Nous contacter</h2>
          <p className="contact-ligne">
            <Mail className="icon-apropos" />
            <span>contact@maisonsalma.com</span>
          </p>
          <p className="contact-ligne">
            <MapPin className="icon-apropos" />
            <span>123 rue du Rêve, Paris</span>
          </p>
        </div>
      </div>
    </section>
  );
}
