const http = require('http');
const url = require('url');
const fs = require('fs');

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

    fs.readFile(databasePath, 'utf8', (error, data) => {
      if (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error\n');
      } else {
        // Split the data into lines and filter out empty lines
        const lines = data.split('\n').filter((line) => line.trim() !== '');

        // Initialize counters and lists for each field
        let totalStudents = 0;
        let csStudents = 0;
        let sweStudents = 0;
        const csList = [];
        const sweList = [];

        // Process each line and update counters and lists
        lines.forEach((line) => {
          const [firstName, , , field] = line.split(',');
          if (field === 'CS') {
            csStudents += 1;
            csList.push(firstName);
            totalStudents += 1;
          } else if (field === 'SWE') {
            sweStudents += 1;
            sweList.push(firstName);
            totalStudents += 1;
          }
        });

        // Send the response with the student information
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Number of students: ${totalStudents}\nNumber of students in CS: ${csStudents}. List: ${csList.join(', ')}\nNumber of students in SWE: ${sweStudents}. List: ${sweList.join(', ')}\n`);
      }
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
