const express = require('express');
const pool = require('./db');
const app = express();
const port = process.env.PORT || 3000;

app.get('/health', (req, res) => res.send('OK'));

app.get('/color', async (req, res) => {
  const color = 'red';
  try {
    await pool.query('INSERT INTO hits (service, timestamp) VALUES (?, ?)', [color, new Date()]);
    res.json({ color });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error fatal red' });
  }
});

if (require.main === module) app.listen(port, () => console.log(`${color} service listening on ${port}`));

module.exports = app;
