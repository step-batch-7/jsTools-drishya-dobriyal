const { createReadStream } = require('fs');
const { stdin } = require('process');

const { performTail } = require('./src/performTail.js');

const displayTailOutput = function(error, content) {
  process.stderr.write(error);
  process.stdout.write(content);
};

const main = function() {
  const [, , ...userArguments] = [...process.argv];
  performTail(userArguments, { createReadStream, stdin }, displayTailOutput);
};

main();
