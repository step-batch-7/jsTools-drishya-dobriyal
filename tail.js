const { performTail } = require('./src/tailLib.js');

const displayTailOutput = function(error, content) {
  process.stderr.write(error);
  process.stdout.write(content);
};

const main = function() {
  const separatedRequiredArgs = 1;
  const userArguments = process.argv.slice(separatedRequiredArgs);
  performTail(userArguments, displayTailOutput);
};

main();
