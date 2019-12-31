const { parseUserArgs } = require('./parseUserArgs.js');
const { getLastNLines } = require('./getLastNLines.js');
const emptyString = '';

const readFromStdin = function(stdin, numOfLines, onCompletion) {
  let content = '';
  stdin.setEncoding('utf8');
  stdin.on('data', data => {
    content += data;
  });
  stdin.on('end', () => {
    onCompletion('', getLastNLines(content, numOfLines));
  });
};

const performTail = function(userArgs, readFile, stdin, onCompletion) {
  const { filePath, numOfLines, errorOccurred } = parseUserArgs([...userArgs]);
  if (errorOccurred) {
    return onCompletion(errorOccurred, emptyString);
  }

  const contentFromReadFile = function(error, content) {
    if (error) {
      onCompletion(`tail: ${filePath}: No such file or directory`, emptyString);
      return;
    }
    onCompletion(emptyString, getLastNLines(content, numOfLines));
  };

  const readerStream = filePath
    ? () => readFile(filePath, 'utf8', contentFromReadFile)
    : () => readFromStdin(stdin, numOfLines, onCompletion);

  readerStream();
};

module.exports = {
  performTail
};
