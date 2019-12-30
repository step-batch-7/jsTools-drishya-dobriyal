const fs = require('fs');

const { performTail } = require('./src/tailLib.js');

const displayTailOutput = function(error, content) {
  process.stderr.write(error);
  process.stdout.write(content);
};

const main = function() {
  const [, , ...userArguments] = [...process.argv];
  performTail(userArguments, fs.readFile, displayTailOutput);
};

main();
