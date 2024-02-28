const express = require('express');
const { readFile } = require('fs').promises;

const app = express();
const port = 1245;

function countStudents(fileName) {
  const students = {};
  const fields = {};
  let length = 0;

  return new Promise(async (resolve, reject) => {
    try {
      const data = await readFile(fileName);
      let output = '';
      const lines = data.toString().split('\n');
      for (let i = 0; i < lines.length; i += 1) {
        if (lines[i]) {
          length += 1;
          const field = lines[i].toString().split(',');
          if (Object.prototype.hasOwnProperty.call(students, field[3])) {
            students[field[3]].push(field[0]);
          } else {
            students[field[3]] = [field[0]];
          }
          if (Object.prototype.hasOwnProperty.call(fields, field[3])) {
            fields[field[3]] += 1;
          } else {
            fields[field[3]] = 1;
          }
        }
      }
      const l = length - 1;
      output += `Number of students: ${l}\n`;
      for (const [key, value] of Object.entries(fields)) {
        if (key !== 'field') {
          output += `Number of students in ${key}: ${value}. `;
          output += `List: ${students[key].join(', ')}\n`;
        }
      }
      resolve(output);
    } catch (err) {
      reject(new Error('Cannot load the database'));
    }
  });
}

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  res.write('This is the list of our students\n');
  try {
    const output = await countStudents(process.argv[2].toString());
    res.end(output.slice(0, -1));
  } catch (error) {
    res.status(404).end('Cannot load the database');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

module.exports = app;
