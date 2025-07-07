import React, { useState } from 'react';
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
    if (!note) {
      alert("Veuillez sélectionner une note avant d'envoyer.");
      return;
    }

    // Simuler l'envoi du sondage
    console.log('📝 Sondage enregistré localement :', { note, commentaire });

    // Réinitialiser les champs
    setNote('');
    setCommentaire('');
    setEnvoye(true);

    // Optionnel : faire disparaître le message après quelques secondes
    setTimeout(() => setEnvoye(false), 4000);
  };

  const options = [
    { value: '😠', icon: <Angry size={28} strokeWidth={1.5} /> },
    { value: '😐', icon: <Meh size={28} strokeWidth={1.5} /> },
    { value: '🙂', icon: <Smile size={28} strokeWidth={1.5} /> },
    { value: '😊', icon: <Laugh size={28} strokeWidth={1.5} /> },
    { value: '🤩', icon: <Star size={28} strokeWidth={1.5} /> }
  ];

  if (envoye) {
    return (
      <div className="sondage-container">
        <p className="merci-message">Merci pour votre avis 🕊️</p>
      </div>
    );
  }

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
              checked={note === value}
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
