import React, { useEffect } from 'react';
import ProgressionAchat from '../../composants/Panier/ProgressionAchat';
import '../../css/Panier/Confirmation.css';
import { sendConfirmationEmail } from '../../utils/email';

export default function Confirmation() {
  useEffect(() => {
    const emailDejaEnvoye = localStorage.getItem('emailEnvoye');
    if (emailDejaEnvoye === 'true') return;

    const infosClient = JSON.parse(localStorage.getItem('infosClient'));
    const panier = JSON.parse(localStorage.getItem('panier'));
    const commandeId = localStorage.getItem('commandeId');
    const total = localStorage.getItem('total');

    if (infosClient && panier && commandeId && total) {
      const lignesTableau = Array.isArray(panier)
        ? panier.map((item, i) =>
            `<tr>
              <td style="padding: 8px 0;">${item.id}</td>
              <td style="padding: 8px 0;">${item.nom}</td>
              <td align="center">${item.quantite}</td>
              <td align="right">${item.prix_total} €</td>
            </tr>`
          ).join('') +
          `<tr>
            <td colspan="4" style="text-align: right; font-size: 13px; padding-top: 10px; color: #666;">
              Taxes incluses dans le montant total.
            </td>
          </tr>`
        : '';

      const formData = {
        nom: infosClient?.nom || '',
        prenom: infosClient?.prenom || '',
        email: infosClient?.email || '',
        numero_commande: commandeId || '',
        adresse_rue: infosClient?.adresse || '',
        ville: infosClient?.ville || '',
        province: infosClient?.province || '',
        code_postal: infosClient?.codePostal || '',
        pays: infosClient?.pays || '',
        total: total || '',
        tableau_produits_html: lignesTableau
      };

      console.log('✅ Données envoyées à EmailJS :', formData);

      sendConfirmationEmail(formData)
        .then(() => {
          console.log('📧 Email envoyé !');
          localStorage.setItem('emailEnvoye', 'true');
          setTimeout(() => {
            const favoris = localStorage.getItem('favoris');
            localStorage.clear();
            if (favoris) localStorage.setItem('favoris', favoris);
          }, 10000);
        })
        .catch((err) => console.error('❌ Erreur envoi email :', err));
    }
  }, []);

  return (
    <div className="page-confirmation">
      <ProgressionAchat etape={3} />
        <div><h2>Merci pour votre achat !</h2></div>
        <div><p>Une confirmation a été envoyée par e-mail.</p></div>
      <button onClick={() => window.location.href = '/'} className="btn-retour">
        Retour à l'accueil
      </button>
    </div>
  );
}
