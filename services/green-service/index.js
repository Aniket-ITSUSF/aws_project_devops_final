const express = require('express');
const pool = require('./db');
const app = express();
const port = process.env.PORT || 3000;

app.get('/health', (req, res) => res.send('OK'));

app.get('/color', async (req, res) => {
  const color = 'green';
  try {
    await pool.query('INSERT INTO hits (service, timestamp) VALUES (?, ?)', [color, new Date()]);
    res.json({ color });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error fatal green' });
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
        <h1>Welcome to the Greenery Image Service</h1>
        <p>Here's your requested image:</p>
        <img src="https://preview.redd.it/beautiful-green-landscape-scenery-v0-59x72tt66wpa1.jpg?width=1080&crop=smart&auto=webp&s=02b7f78e8d8c6b37b3b0f588189fc4c7dee469fa" alt="Sample Image">
      </div>
    </body>
    </html>
  `;

  res.send(html);
});

if (require.main === module) app.listen(port, () => console.log(`${color} service listening on ${port}`));

module.exports = app;
