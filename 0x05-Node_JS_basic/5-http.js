const http = require('http');
const url = require('url');
const fs = require('fs');
const countStudents = require('./3-read_file_async'); // Update with the correct path

const port = 1245;

const app = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === '/') {
    // Handle root path
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!\n');
  } else if (parsedUrl.pathname === '/students') {
    // Handle /students path
    const databasePath = './path/to/your/database.csv'; // Update with the correct path
    countStudents(databasePath)
      .then(() => {
        // Read the contents of the database file and send it in the response
        fs.readFile(databasePath, 'utf8', (error, data) => {
          if (error) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error\n');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`This is the list of our students\n${data}`);
          }
        });
      })
      .catch((error) => {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Error: ${error.message}\n`);
      });
  } else {
    // Handle other paths
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found\n');
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

module.exports = app;
