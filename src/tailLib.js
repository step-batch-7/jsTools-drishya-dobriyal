const { parseUserArgs } = require('./parseUserArgs.js');
const { getLastNLines } = require('./getLastNLines.js');
const emptyString = '';

const contentFromReadFile = function(error, content) {
  if (error) {
    return this.displayTailOutput(
      `tail: ${this.parsedArgs.filePath}: No such file or directory`,
      emptyString
    );
  }
  return this.displayTailOutput(
    emptyString,
    getLastNLines(content, this.parsedArgs.numOfLines)
  );
};

const performTail = function(userArgs, fs, displayTailOutput) {
  const parsedArgs = parseUserArgs(userArgs);
  if (parsedArgs.errorOccurred) {
    return displayTailOutput(parsedArgs.errorOccurred, emptyString);
  }
  fs.readFile(
    parsedArgs.filePath,
    'utf8',
    contentFromReadFile.bind({ displayTailOutput, parsedArgs })
  );
};

module.exports = {
  performTail
};
