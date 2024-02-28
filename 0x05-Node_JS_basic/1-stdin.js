// 1-stdin-updated.js

const outputMessage = 'Welcome to Holberton School, what is your name?\n';
const closingMessage = 'This important software is now closing\n';

process.stdout.write(outputMessage);

if (process.stdin.isTTY) {
  process.stdin.on('data', (inputData) => {
    const enteredName = inputData.toString();
    process.stdout.write(`Your name is: ${enteredName}`);
    process.exit();
  });
} else {
  process.stdin.on('data', (inputData) => {
    const enteredName = inputData.toString();
    process.stdout.write(`Your name is: ${enteredName}`);
    process.exit();
  });

  process.on('exit', () => {
    process.stdout.write(closingMessage);
  });
}
