const http = require('http');
const fs = require('fs');
const replace = require('stream-replace');

const hostname = '127.0.0.1';
const port = 3000;


const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.statusCode = 200;
  req.pipe(res);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
