import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h3>Liens utiles</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/produits">Produits</Link></li>
            <li><Link to="/inspiration">Inspiration & Conseils</Link></li>
            <li><Link to="/apropos">À propos</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: contact@maisonsalma.ca</p>
          <p>Téléphone: +1 (123) 456-7890</p>
          <p>Adresse: 123 rue Belle-image-, Montréal, QC</p>
        </div>

        <div className="footer-section">
          <h3>Maison Salma</h3>
          <p>Élégance intemporelle & qualité artisanale.</p>
          <p>© {new Date().getFullYear()} Maison Salma. Tous droits réservés.</p>
        </div>

      </div>
    </footer>
  );
}
