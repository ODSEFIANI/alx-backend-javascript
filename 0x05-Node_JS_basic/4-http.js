const http = require('http');

const host_name = '127.0.0.1';
const lis_port = 1245;

const app = http.createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  response.end('Hello Holberton School!');
});

app.listen(lis_port, host_name, () => {
});

module.exports = app;