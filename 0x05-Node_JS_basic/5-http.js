// 5-http.js

const http = require('http');
const url = require('url');

const serverHostname = '127.0.0.1';
const serverPort = 1245;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === '/status' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'up and running' }));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(serverPort, serverHostname, () => {
  console.log(`Server running at http://${serverHostname}:${serverPort}/`);
});

module.exports = server;
