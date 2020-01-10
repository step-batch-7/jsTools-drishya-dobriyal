const { createReadStream } = require('fs');
const { stdin } = require('process');

const { performTail } = require('./src/performTail.js');
const StreamPicker = require('./src/streamPicker.js');

const displayTailOutput = function (error, content) {
  process.stderr.write(error);
  process.stdout.write(content);
};

const main = function () {
  const [, , ...userArguments] = [...process.argv];
  const streamPicker = new StreamPicker(stdin, createReadStream);
  performTail(userArguments, streamPicker, displayTailOutput);
};

main();
