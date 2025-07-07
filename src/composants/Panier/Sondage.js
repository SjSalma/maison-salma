import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import '../../css/Panier/Sondage.css';

import {
  Angry,
  Meh,
  Smile,
  Laugh,
  Star,
} from 'lucide-react';

export default function Sondage() {
  const [envoye, setEnvoye] = useState(false);
  const [note, setNote] = useState('');
  const [commentaire, setCommentaire] = useState('');

  const handleSubmit = () => {
    const infosClient = JSON.parse(localStorage.getItem('infosClient'));

    const formData = {
      note,
      commentaire,
      nom: infosClient?.nom || 'Inconnu',
      email: infosClient?.email || 'non fourni'
    };

    emailjs.send('service_xxx', 'template_sondage', formData, 'user_xxx')
      .then(() => setEnvoye(true))
      .catch((err) => console.error('Erreur envoi sondage :', err));
  };

  if (envoye) {
    return (
      <div className="sondage-container">
        <p className="merci-message">Merci pour votre avis 🕊️</p>
      </div>
    );
  }

  const options = [
    { value: '😠', icon: <Angry size={24} strokeWidth={1.5} /> },
    { value: '😐', icon: <Meh size={24} strokeWidth={1.5} /> },
    { value: '🙂', icon: <Smile size={24} strokeWidth={1.5} /> },
    { value: '😊', icon: <Laugh size={24} strokeWidth={1.5} /> },
    { value: '🤩', icon: <Star size={24} strokeWidth={1.5} /> }
  ];

  return (
    <div className="sondage-container">
      <h3>Comment s’est passée votre expérience ?</h3>

      <div className="emoji-options">
        {options.map(({ value, icon }) => (
          <label key={value}>
            <input
              type="radio"
              name="note"
              value={value}
              onChange={(e) => setNote(e.target.value)}
            />
            <span>{icon}</span>
          </label>
        ))}
      </div>

      <textarea
        placeholder="Un commentaire ? (facultatif)"
        value={commentaire}
        onChange={(e) => setCommentaire(e.target.value)}
      ></textarea>

      <button onClick={handleSubmit}>Envoyer</button>
    </div>
  );
}