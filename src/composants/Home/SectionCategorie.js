import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/Home/SectionCategorie.css';

export default function SectionCategorie({ titre, data, filtre }) {
  const navigate = useNavigate();

  const navigateToFilter = (key, value) => {
    navigate(`/produits?${key}=${encodeURIComponent(value)}`);
  };

  return (
    <div className="filter-section">
      <h2>{titre}</h2>
      <div className="cat-grid">
        {data.map(({ label, image }) => (
          <div
            key={label}
            className="cat-card"
            onClick={() => navigateToFilter(filtre, label)}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={`/images/filters/${image}`}
              alt={label}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/cathégories/image_defaut.jpg';
              }}
            />
            <p>{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
