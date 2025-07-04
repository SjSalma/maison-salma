import React, { useState } from 'react';
import ProgressionAchat from '../../composants/Panier/ProgressionAchat';
import '../../css/Panier/Informations.css';

export default function Informations({ onSuivant }) {
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    email: '',
    adresse: '',
    ville: '',
    province: '',
    codePostal: '',
    pays: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('infosClient', JSON.stringify(form));
    onSuivant();
  };

  return (
    <div className="page-produits">
      <ProgressionAchat etape={1} />
      <h2>Informations personnelles</h2>
      <form className="form-infos" onSubmit={handleSubmit}>
        <input type="text" name="nom" placeholder="Nom" value={form.nom} onChange={handleChange} required />
        <input type="text" name="prenom" placeholder="Prénom" value={form.prenom} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Adresse e-mail" value={form.email} onChange={handleChange} required />
        <input type="text" name="adresse" placeholder="Adresse" value={form.adresse} onChange={handleChange} required />
        <input type="text" name="ville" placeholder="Ville" value={form.ville} onChange={handleChange} required />
        <input type="text" name="province" placeholder="Province" value={form.province} onChange={handleChange} required />
        <input type="text" name="codePostal" placeholder="Code postal" value={form.codePostal} onChange={handleChange} required />
        <input type="text" name="pays" placeholder="Pays" value={form.pays} onChange={handleChange} required />
        <button type="submit">Continuer vers le paiement</button>
      </form>
    </div>
  );
}
