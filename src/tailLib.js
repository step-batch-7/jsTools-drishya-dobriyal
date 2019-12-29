const { parseUserArgs } = require('./parseUserArgs.js');
const { sortContent } = require('./sortContent.js');
const fs = require('fs');

const callbackReadFile = function(error, content) {
  if (error) {
    return this.displayTailOutput(
      `tail: ${this.parsedArgs.filePath}: No such file or directory`,
      ''
    );
  }
  return this.displayTailOutput(
    '',
    sortContent(content, this.parsedArgs.numOfLines)
  );
};

const performTail = function(userArgs, displayTailOutput) {
  const parsedArgs = parseUserArgs(userArgs);
  if (parsedArgs.errorOccurred) {
    return displayTailOutput(parsedArgs.errorOccurred, '');
  }
  fs.readFile(
    parsedArgs.filePath,
    'utf8',
    callbackReadFile.bind({ displayTailOutput, parsedArgs })
  );
};

module.exports = {
  sortContent,
  performTail
};
