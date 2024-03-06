const http = require('http');
const { readFile } = require('fs').promises;

const hostname = '127.0.0.1';
const port = 1245;

async function countStudents(path) {
  try {
    const data = await readFile(path, 'utf8');
    const lines = data.split('\n').filter((line) => line.trim() !== '');

    let totalStudents = 0;
    let csStudents = 0;
    let sweStudents = 0;
    const csList = [];
    const sweList = [];

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

    // Return the results as an object
    return {
      totalStudents,
      csStudents,
      sweStudents,
      csList,
      sweList,
    };
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

const app = http.createServer(async (request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');

  if (request.url === '/') {
    response.write('Hello Holberton School!');
    response.end();
  } else if (request.url === '/students') {
    const fileName = process.argv[2];

    response.write('This is the list of our students\n');
    try {
      const result = await countStudents(fileName);

      // Send the data to the client
      response.write(`Number of students: ${result.totalStudents}\n`);
      response.write(`Number of students in CS: ${result.csStudents}. List: ${result.csList.join(', ')}\n`);
      response.write(`Number of students in SWE: ${result.sweStudents}. List: ${result.sweList.join(', ')}\n`);
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
