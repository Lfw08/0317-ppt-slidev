const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.get('/api/number', (req, res) => {
  try {
    const data = fs.readFileSync('number.txt', 'utf8');
    res.send(data);
  } catch (err) {
    console.error('Error reading file:', err);
    res.status(500).send('Error reading file');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});