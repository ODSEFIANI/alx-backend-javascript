const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    // Attempt to read the database file asynchronously
    fs.readFile(path, 'utf8', (error, data) => {
      if (error) {
        // Reject the promise with an error if the database is not available
        reject(new Error('Cannot load the database'));
      } else {
        // Split the data into lines and filter out empty lines
        const lines = data.split('\n').filter(line => line.trim() !== '');

        // Initialize counters and lists for each field
        let totalStudents = 0;
        let csStudents = 0;
        let sweStudents = 0;
        const csList = [];
        const sweList = [];

        // Process each line and update counters and lists
        lines.forEach(line => {
          const [firstName, , , field] = line.split(',');
          if (field === 'CS') {
            csStudents++;
            csList.push(firstName);
            totalStudents++;
          } else if (field === 'SWE') {
            sweStudents++;
            sweList.push(firstName);
            totalStudents++;
          }
        });

        // Log the results to the console
        console.log(`Number of students: ${totalStudents}`);
        console.log(`Number of students in CS: ${csStudents}. List: ${csList.join(', ')}`);
        console.log(`Number of students in SWE: ${sweStudents}. List: ${sweList.join(', ')}`);

        // Resolve the promise
        resolve();
      }
    });
  });
}

module.exports = countStudents;
