const fs = require('fs');

function countStudents(path) {
    try {
        const data = fs.readFileSync(path, 'utf8');

        // Split the data into lines and filter out empty lines
        const lines = data.split('\n').filter(line => line.trim() !== '');

        // Initialize counters and lists for each field
        let totalStudents = 0;
        let csStudents = 0;
        let sweStudents = 0;
        let csList = [];
        let sweList = [];

        // Process each line and update counters and lists
        lines.forEach(line => {
            const [firstName, lastName, age, field] = line.split(',');
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
    } catch (error) {
        // Handle the error if the database is not available
        throw new Error('Cannot load the database');
    }
}

module.exports = countStudents;