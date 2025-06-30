const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3001;

app.use(cors());

const db = new sqlite3.Database('./maison_salma.db', (err) => {
  if (err) console.error('Erreur SQLite :', err.message);
  else console.log('✅ Connecté à maison_salma.db');
});

app.get('/api/produits', (req, res) => {
  const { type, style, piece, materiau, recherche } = req.query;
  let query = 'SELECT * FROM produits WHERE 1=1';
  const params = [];

  if (type) { query += ' AND type = ?'; params.push(type); }
  if (style) { query += ' AND style = ?'; params.push(style); }
  if (piece) { query += ' AND piece = ?'; params.push(piece); }
  if (materiau) { query += ' AND materiau = ?'; params.push(materiau); }
  if (recherche) {
    query += ' AND (nom LIKE ? OR description LIKE ?)';
    params.push(`%${recherche}%`, `%${recherche}%`);
  }

  db.all(query, params, (err, rows) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur en ligne sur http://localhost:${PORT}`);
});
