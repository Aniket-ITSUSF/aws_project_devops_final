const express = require('express');
const pool = require('./db');
const app = express();
const port = process.env.PORT || 3000;

const color = process.env.COLOR || 'unknown';

app.get('/health', (req, res) => res.send('OK'));

app.get('/color', async (req, res) => {
  try {
    // Use '?' placeholders so mysql2/mysql driver will escape correctly
    await pool.query(
        'INSERT INTO hits (service, timestamp) VALUES (?, ?)',
        [color, new Date()]
    );
    res.json({ color });
  } catch (err) {
    console.error('DB error inserting hit:', err);
    res.status(500).json({ error: `DB error in ${color} service` });
  }
});

app.get('/', (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Image Service</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          text-align: center;
          margin: 50px;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
        }
        img {
          max-width: 100%;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Welcome to the Bird Image Service</h1>
        <p>Here's your requested image:</p>
        <img src="https://static.scientificamerican.com/sciam/cache/file/7A715AD8-449D-4B5A-ABA2C5D92D9B5A21_source.png?w=1350" alt="Sample Image">
      </div>
    </body>
    </html>
  `;

  res.send(html);
});
if (require.main === module) {
  app.listen(port, () =>
      console.log(`${color} service listening on port ${port}`)
  );
}

module.exports = app;
