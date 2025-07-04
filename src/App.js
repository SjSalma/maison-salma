import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from 'react-router-dom';

import Navbar from './composants/Navbar';
import BandePromo from './composants/Home/BandePromo';
import Footer from './composants/Footer';

import Home from './pages/Home';
import Produits from './pages/Produits';
import InspirationsConseils from './pages/InspirationConseil';
import Apropos from './pages/Apropos';
import Favoris from './pages/Favoris';
import Panier from './pages/Panier';
import Informations from './composants/Panier/Informations';
import Paiement from './composants/Panier/Paiement';
import Confirmation from './composants/Panier/Confirmation';

import { useFavoris } from './context/FavorisContext';
import { usePanier } from './context/PanierContext';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppRoutes() {
  const navigate = useNavigate();
  const { favoris, toggleFavori } = useFavoris();
  const { panier, ajouterProduit: ajouterAuPanier, retirerProduit: retirerDuPanier } = usePanier();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/produits"
        element={
          <Produits
            favoris={favoris}
            toggleFavori={toggleFavori}
            ajouterAuPanier={ajouterAuPanier}
          />
        }
      />
      <Route path="/inspiration" element={<InspirationsConseils />} />
      <Route path="/apropos" element={<Apropos />} />
      <Route
        path="/favoris"
        element={
          <Favoris
            favoris={favoris}
            toggleFavori={toggleFavori}
            ajouterAuPanier={ajouterAuPanier}
          />
        }
      />
      <Route
        path="/panier"
        element={<Panier panier={panier} retirerDuPanier={retirerDuPanier} />}
      />
      <Route
        path="/achat/informations"
        element={<Informations onSuivant={() => navigate('/achat/paiement')} />}
      />
      <Route
        path="/achat/paiement"
        element={<Paiement onSuivant={() => navigate('/achat/confirmation')} />}
      />
      <Route path="/achat/confirmation" element={<Confirmation />} />

      {/* ✅ Redirection des routes inconnues vers la Home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function AppWrapper() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      document.body.classList.add('page-decalee');
      document.body.classList.remove('page-inspiration-decalee');
    } else if (location.pathname === '/inspiration') {
      document.body.classList.remove('page-decalee');
      document.body.classList.add('page-inspiration-decalee');
    } else {
      document.body.classList.remove('page-decalee');
      document.body.classList.remove('page-inspiration-decalee');
    }
  }, [location.pathname]);

  return (
    <>
      {location.pathname === '/' && <BandePromo />}
      <Navbar />
      <ScrollToTop />
      <AppRoutes />
      <Footer />
    </>
  );
}

// ✅ GitHub Pages en prod, sinon local
const basename = process.env.NODE_ENV === 'production' ? '/maison-salma' : '/';

export default function App() {
  return (
    <Router basename={basename}>
      <AppWrapper />
    </Router>
  );
}
