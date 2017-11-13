const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;
const filename = 'index.html';
const message = 'Hello, World!';

const buffer = fs.readFileSync(filename);

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(buffer.toString().replace('{message}', message));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
