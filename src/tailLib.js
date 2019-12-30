const { parseUserArgs } = require('./parseUserArgs.js');
const { getLastNLines } = require('./getLastNLines.js');
const emptyString = '';

const contentFromReadFile = function(
  error,
  content,
  { onCompletion, parsedArgs }
) {
  if (error) {
    onCompletion(
      `tail: ${parsedArgs.filePath}: No such file or directory`,
      emptyString
    );
    return;
  }
  onCompletion(emptyString, getLastNLines(content, parsedArgs.numOfLines));
};

const performTail = function(userArgs, reader, onCompletion) {
  const parsedArgs = parseUserArgs(userArgs);
  if (parsedArgs.errorOccurred) {
    return onCompletion(parsedArgs.errorOccurred, emptyString);
  }
  reader(parsedArgs.filePath, 'utf8', (error, content) =>
    contentFromReadFile(error, content, { onCompletion, parsedArgs })
  );
};

module.exports = {
  performTail
};
