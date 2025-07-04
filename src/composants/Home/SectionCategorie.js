import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/Home/SectionCategorie.css';

// Fonction utilitaire pour nettoyer les labels
const slugify = (str) =>
  str
    .toLowerCase()
    .normalize('NFD') // décompose les accents
    .replace(/[\u0300-\u036f]/g, '') // enlève les accents
    .replace(/\s+/g, '_'); // remplace les espaces par _

export default function SectionCategorie({ titre, data, filtre, className = '' }) {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [activeDot, setActiveDot] = useState(1);

  const navigateToFilter = (key, value) => {
    if (!scrollRef.current.classList.contains('dragging')) {
      navigate(`/produits?${key}=${encodeURIComponent(value)}`);
    }
  };

  const scrollToStep = (step) => {
    const container = scrollRef.current;
    if (!container) return;

    const totalScrollWidth = container.scrollWidth - container.clientWidth;
    const stepCount = 3;
    const scrollPerStep = totalScrollWidth / (stepCount - 1);

    container.scrollTo({
      left: scrollPerStep * (step - 1),
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    const handlePointerDown = (e) => {
      if (e.button !== 0) return;
      isDragging = true;
      el.classList.add('dragging');
      startX = e.pageX;
      scrollLeft = el.scrollLeft;
    };

    const handlePointerMove = (e) => {
      if (!isDragging || e.buttons !== 1) return;
      const x = e.pageX;
      const walk = (x - startX) * 1.5;
      el.scrollLeft = scrollLeft - walk;
    };

    const handlePointerUp = () => {
      isDragging = false;
      el.classList.remove('dragging');
    };

    const handleScroll = () => {
      const percent = el.scrollLeft / (el.scrollWidth - el.clientWidth);
      if (percent < 0.33) setActiveDot(1);
      else if (percent < 0.66) setActiveDot(2);
      else setActiveDot(3);
    };

    el.addEventListener('pointerdown', handlePointerDown);
    el.addEventListener('pointermove', handlePointerMove);
    el.addEventListener('pointerup', handlePointerUp);
    el.addEventListener('pointerleave', handlePointerUp);
    el.addEventListener('pointercancel', handlePointerUp);
    el.addEventListener('scroll', handleScroll);

    return () => {
      el.removeEventListener('pointerdown', handlePointerDown);
      el.removeEventListener('pointermove', handlePointerMove);
      el.removeEventListener('pointerup', handlePointerUp);
      el.removeEventListener('pointerleave', handlePointerUp);
      el.removeEventListener('pointercancel', handlePointerUp);
      el.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`filter-section ${className}`}>
      <div className="filter-header">
        <div className="filter-title-wrapper">
          <h2 className="filter-title">{titre}</h2>
          <div className="scroll-indicator-wrapper">
            <div className="scroll-indicator">
              <span
                className={activeDot >= 1 ? 'dot active' : 'dot'}
                onClick={() => scrollToStep(1)}
              >•</span>
              <span
                className={activeDot >= 2 ? 'dot active' : 'dot'}
                onClick={() => scrollToStep(2)}
              >•</span>
              <span
                className={activeDot >= 3 ? 'dot active' : 'dot'}
                onClick={() => scrollToStep(3)}
              >•</span>
            </div>
          </div>
        </div>
      </div>

      <div className="cat-grid" ref={scrollRef}>
        {data.map(({ label }) => {
          const imageName = slugify(label) + '.jpg';
          const imagePath = `${process.env.PUBLIC_URL}/images/cathégories/${imageName}`;
          const fallback = `${process.env.PUBLIC_URL}/images/cathégories/image_defaut.jpg`;

          return (
            <div
              key={label}
              className="cat-card"
              onClick={() => navigateToFilter(filtre, label)}
            >
              <img
                src={imagePath}
                alt={label}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = fallback;
                }}
              />
              <p>{label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
