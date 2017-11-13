const http = require('http');
const fs = require('fs');
const replace = require('stream-replace');

const hostname = '127.0.0.1';
const port = 3000;
const filename = 'index.html';
const pattern = '{message}';
const message = 'Hello, World!';


const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  fs.createReadStream(filename)
    .pipe(replace(pattern, message))
    .pipe(res);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
