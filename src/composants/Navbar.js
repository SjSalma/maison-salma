import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useFavoris } from '../context/FavorisContext';
import { usePanier } from '../context/PanierContext';
import { Heart, ShoppingCart, Search, Menu } from 'lucide-react';
import '../css/Navbar.css';

export default function Navbar() {
  const [isTop, setIsTop] = useState(true);
  const [recherche, setRecherche] = useState('');
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  const location = useLocation();

  const { favoris } = useFavoris();
  const { quantiteTotale } = usePanier();

  const isHome = location.pathname === '/';
  const isTransparentPage =
    isHome || location.pathname === '/inspiration' || location.pathname === '/apropos';
  const isTransparent = isTransparentPage && isTop;

  const handleRecherche = (e) => {
    e.preventDefault();
    if (recherche.trim() !== '') {
      navigate(`/produits?recherche=${encodeURIComponent(recherche.trim())}`);
      setRecherche('');
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsTop(window.scrollY === 0);
    const handleResize = () => setIsMobile(window.innerWidth <= 768);

    if (isTransparentPage) {
      handleScroll();
      window.addEventListener('scroll', handleScroll);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isTransparentPage]);

  return (
    <>
      <nav
        className={`navbar ${isTransparentPage ? 'navbar-home' : 'navbar-classique'} ${isTransparent ? 'transparent' : ''} ${isHome ? 'home-offset' : ''}`}
      >
        <div className="navbar-container">
          {isMobile && (
            <div className="navbar-mobile">
              <button className="menu-toggle" onClick={() => setMenuOuvert(!menuOuvert)}>
                <Menu />
              </button>

              <Link to="/" className="logo">MAISON SALMA</Link>

              <div className="nav-icons">
                <form onSubmit={handleRecherche} className="search-form">
                  <input
                    type="text"
                    placeholder="Recherche"
                    value={recherche}
                    onChange={(e) => setRecherche(e.target.value)}
                  />
                  <button type="submit" aria-label="Rechercher">
                    <Search size={18} strokeWidth={1.2} />
                  </button>
                </form>

                <Link to="/favoris" className="icon-link">
                  <Heart size={18} strokeWidth={1.2} />
                  <span className="compteur">{favoris.length}</span>
                </Link>

                <Link to="/panier" className="icon-link">
                  <ShoppingCart size={18} strokeWidth={1.2} />
                  <span className="compteur">{quantiteTotale}</span>
                </Link>
              </div>
            </div>
          )}

          {/* Version bureau uniquement */}
          {!isMobile && (
            <>
              {isTransparent ? (
                <>
                  <div className="navbar-top">
                    <Link to="/" className="logo">MAISON SALMA</Link>
                    <div className="nav-right">
                      <div className="nav-icons">
                        <form onSubmit={handleRecherche} className="search-form">
                          <input
                            type="text"
                            placeholder="Recherche"
                            value={recherche}
                            onChange={(e) => setRecherche(e.target.value)}
                          />
                          <button type="submit" aria-label="Rechercher">
                            <Search size={18} strokeWidth={1.2} />
                          </button>
                        </form>
                        <Link to="/favoris" className="icon-link">
                          <Heart size={18} strokeWidth={1.2} />
                          <span className="compteur">{favoris.length}</span>
                        </Link>
                        <Link to="/panier" className="icon-link">
                          <ShoppingCart size={18} strokeWidth={1.2} />
                          <span className="compteur">{quantiteTotale}</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <ul className="nav-links nav-links-centered">
                    <li><Link to="/produits">Produits</Link></li>
                    <li><Link to="/inspiration">Inspiration et conseils</Link></li>
                    <li><Link to="/apropos">À propos</Link></li>
                  </ul>
                </>
              ) : (
                <div className="navbar-top navbar-top-inline">
                  <Link to="/" className="logo">MAISON SALMA</Link>

                  <div className="nav-center">
                    <ul className="nav-links nav-links-inline">
                      <li><Link to="/produits">Produits</Link></li>
                      <li><Link to="/inspiration">Inspiration et conseils</Link></li>
                      <li><Link to="/apropos">À propos</Link></li>
                    </ul>
                  </div>

                  <div className="nav-right">
                    <form onSubmit={handleRecherche} className="search-form">
                      <input
                        type="text"
                        placeholder="Recherche"
                        value={recherche}
                        onChange={(e) => setRecherche(e.target.value)}
                      />
                      <button type="submit" aria-label="Rechercher">
                        <Search size={18} strokeWidth={1.2} />
                      </button>
                    </form>
                    <div className="nav-icons">
                      <Link to="/favoris" className="icon-link">
                        <Heart size={18} strokeWidth={1.2} />
                        <span className="compteur">{favoris.length}</span>
                      </Link>
                      <Link to="/panier" className="icon-link">
                        <ShoppingCart size={18} strokeWidth={1.2} />
                        <span className="compteur">{quantiteTotale}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </nav>

      {/* Panneau latéral mobile */}
      <div className={`mobile-menu ${menuOuvert ? 'ouvert' : ''} ${isHome ? 'home-offset' : ''}`}>
        <div className="mobile-menu-header">
          <button className="mobile-close" onClick={() => setMenuOuvert(false)} aria-label="Fermer le menu">✕</button>
          <Link to="/" className="mobile-logo" onClick={() => setMenuOuvert(false)}>MAISON SALMA</Link>
        </div>
        <Link to="/produits" onClick={() => setMenuOuvert(false)}>Produits</Link>
        <Link to="/inspiration" onClick={() => setMenuOuvert(false)}>Inspiration et conseils</Link>
        <Link to="/apropos" onClick={() => setMenuOuvert(false)}>À propos</Link>
        <Link to="/contact" onClick={() => setMenuOuvert(false)}>Contact</Link>
      </div>
    </>
  );
}
