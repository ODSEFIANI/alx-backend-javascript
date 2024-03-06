const http = require('http');
const { readFile } = require('fs').promises;

const hostname = '127.0.0.1';
const port = 1245;

async function countStudents(fileName) {
  const students = {};
  const fields = {};
  let totalStudents = 0;
  let csStudents = 0;
  let sweStudents = 0;
  const csList = [];
  const sweList = [];

  try {
    const data = await readFile(fileName, 'utf8');
    const lines = data.split('\n').filter((line) => line.trim() !== '');

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

    return {
      totalStudents,
      csStudents,
      sweStudents,
      csList,
      sweList
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
    // Extract the filename from the query parameters
    const urlParts = new URL(request.url, `http://${request.headers.host}`);
    const fileName = urlParts.searchParams.get('file');

    if (!fileName) {
      response.statusCode = 400;
      response.end('Missing file parameter');
      return;
    }

    response.write('This is the list of our students\n');
    try {
      const output = await countStudents(fileName);
      const outString = `Number of students: ${output.totalStudents}\n` +
                        `Number of students in CS: ${output.csStudents}. List: ${output.csList.join(', ')}\n` +
                        `Number of students in SWE: ${output.sweStudents}. List: ${output.sweList.join(', ')}\n`;
      response.end(outString);
    } catch (error) {
      response.statusCode = 404;
      response.end('Cannot load the database');
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
