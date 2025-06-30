import ProgressionAchat from '../composants/Panier/ProgressionAchat';
import { usePanier } from '../context/PanierContext';
import { useNavigate } from 'react-router-dom';

export default function Panier() {
  const { panier, changerQuantite } = usePanier();
  const navigate = useNavigate();

  const total = panier.reduce((acc, produit) => {
    const prixSolde = produit.prix * (1 - (produit.solde || 0) / 100);
    return acc + prixSolde * produit.quantite;
  }, 0);

  return (
    <div className="page-produits">
      <ProgressionAchat etape={0} />

      <h2>Mon panier</h2>
      {panier.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          <div className="produits-container">
            {panier.map(produit => (
              <div key={produit.id} className="produit-card">
                <img
                  src={`/${produit.image}`}
                  alt={produit.nom}
                  onError={(e) => { e.target.onerror = null; e.target.src = "/images/produits/image_defaut.jpg"; }}
                />
                <h3>{produit.nom}</h3>
                <p>{(produit.prix * (1 - (produit.solde || 0) / 100)).toFixed(2)} €</p>
                <div className="quantite-control">
                  <button onClick={() => changerQuantite(produit.id, produit.quantite - 1)}>-</button>
                  <span>{produit.quantite}</span>
                  <button onClick={() => changerQuantite(produit.id, produit.quantite + 1)}>+</button>
                </div>
              </div>
            ))}
          </div>
          <div className="total">
            <h3>Total : {total.toFixed(2)} €</h3>
          </div>
          <div className="btn-panier">
            <button onClick={() => navigate('/achat/informations')}>
              Procéder à l’achat
            </button>
          </div>
        </>
      )}
    </div>
  );
}
