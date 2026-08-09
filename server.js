const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const FIVEM_IP = '141.95.72.163';
const FIVEM_PORT = 33333;

// Statische Dateien aus /public ausliefern
app.use(express.static(path.join(__dirname, 'public')));

// Proxy-Endpoint: /api/players
app.get('/api/players', async (req, res) => {
  try {
    const response = await fetch(`http://${FIVEM_IP}:${FIVEM_PORT}/players.json`, {
      timeout: 5000
    });
    if (!response.ok) throw new Error('Server antwortete mit ' + response.status);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('[Proxy] Fehler:', err.message);
    res.status(502).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
