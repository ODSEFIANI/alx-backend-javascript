const http = require('http');
const { readFile } = require('fs').promises;

const hostname = '127.0.0.1';
const port = 1245;

function countStudents(path) {
  return new Promise((resolve, reject) => {
    // Attempt to read the database file asynchronously
    readFile(path, 'utf8')
      .then((data) => {
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

        // Log the results to the console
        console.log(`Number of students: ${totalStudents}`);
        console.log(`Number of students in CS: ${csStudents}. List: ${csList.join(', ')}`);
        console.log(`Number of students in SWE: ${sweStudents}. List: ${sweList.join(', ')}`);

        // Resolve the promise
        resolve();
      })
      .catch((error) => {
        // Reject the promise with an error if the database is not available
        reject(new Error('Cannot load the database'));
      });
  });
}

const app = http.createServer(async (request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');

  if (request.url === '/') {
    response.write('Hello Holberton School!');
    response.end();
  } else if (request.url === '/students') {
    // Extract the filename from the query parameters
    const fileName = process.argv[2];

    response.write('This is the list of our students\n');
    try {
      await countStudents(fileName);
    } catch (error) {
      response.statusCode = 404;
      response.write('Cannot load the database');
    } finally {
      response.end();
    }
  } else {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.end('Not Found\n');
  }
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;
