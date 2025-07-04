import { createContext, useContext, useState } from 'react';

const PanierContext = createContext();

export function PanierProvider({ children }) {
  const [panier, setPanier] = useState(() => {
    const saved = localStorage.getItem('panier');
    return saved ? JSON.parse(saved) : [];
  });

  const savePanier = (data) => {
    setPanier(data);
    localStorage.setItem('panier', JSON.stringify(data));
  };

  const ajouterProduit = (produit) => {
    const existant = panier.find(p => p.id === produit.id);
    if (existant) {
      const maj = panier.map(p =>
        p.id === produit.id ? { ...p, quantite: p.quantite + 1 } : p
      );
      savePanier(maj);
    } else {
      savePanier([...panier, { ...produit, quantite: 1 }]);
    }
  };

  const changerQuantite = (id, quantite) => {
    if (quantite <= 0) {
      const confirmation = window.confirm("Voulez-vous retirer ce produit du panier ?");
      if (!confirmation) return;
      savePanier(panier.filter(p => p.id !== id));
    } else {
      savePanier(panier.map(p =>
        p.id === id ? { ...p, quantite } : p
      ));
    }
  };

  const viderPanier = () => {
    savePanier([]);
  };

  const quantiteTotale = panier.reduce((total, p) => total + p.quantite, 0);

  return (
    <PanierContext.Provider
      value={{ panier, ajouterProduit, changerQuantite, quantiteTotale, viderPanier }}
    >
      {children}
    </PanierContext.Provider>
  );
}

export const usePanier = () => useContext(PanierContext);
