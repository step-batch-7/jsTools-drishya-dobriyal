const fs = require('fs');
const { performTail } = require('./src/tailLib.js');

const getOutputStream = function(outputStreamName) {
  if (outputStreamName === 'errorStream') {
    return console.error;
  }
  return console.log;
};

const main = function() {
  const separatedRequiredArgs = 1;
  const userArguments = process.argv.slice(separatedRequiredArgs);
  const { outputStreamName, content } = performTail(
    userArguments,
    fs.readFileSync,
    fs.existsSync
  );
  const outputStream = getOutputStream(outputStreamName);
  outputStream(content);
};

main();
