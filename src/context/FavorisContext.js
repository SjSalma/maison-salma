import React, { createContext, useContext, useState, useEffect } from 'react';

const FavorisContext = createContext();

export const FavorisProvider = ({ children }) => {
  const [favoris, setFavoris] = useState(() => {
    const saved = localStorage.getItem('favoris');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favoris', JSON.stringify(favoris));
  }, [favoris]);

  const toggleFavori = (produit) => {
    setFavoris(prev => {
      const existe = prev.some(p => p.id === produit.id);
      if (existe) {
        return prev.filter(p => p.id !== produit.id); // retirer
      } else {
        return [...prev, produit]; // ajouter
      }
    });
  };

  return (
    <FavorisContext.Provider value={{ favoris, toggleFavori }}>
      {children}
    </FavorisContext.Provider>
  );
};

export const useFavoris = () => useContext(FavorisContext);
