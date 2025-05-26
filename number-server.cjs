const http = require('http');
const fs = require('fs');
const PORT = 3001;

http.createServer((req, res) => {
  if (req.url === '/number') {
    fs.readFile('number.txt', 'utf8', (err, data) => {
      res.writeHead(200, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
      res.end(err ? 'N/A' : data.trim());
    });
  } else {
    res.writeHead(404);
    res.end();
  }
}).listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/number`);
});