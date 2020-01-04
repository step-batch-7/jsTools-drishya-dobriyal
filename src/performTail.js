const { parseUserArgs } = require('./parseUserArgs.js');
const { getLastNLines } = require('./getLastNLines.js');
const emptyString = '';

const performTail = function(
  userArgs,
  { createReadStream, stdin },
  onCompletion
) {
  const { filePath, numOfLines, errorOccurred } = parseUserArgs([...userArgs]);
  if (errorOccurred) {
    return onCompletion(errorOccurred, emptyString);
  }

  const readerStream = function(reader, numOfLines, onCompletion) {
    let content = '';
    reader.setEncoding('utf8');
    reader.on('data', data => {
      content += data;
    });
    reader.on('end', () => {
      onCompletion('', getLastNLines(content, numOfLines));
    });
    reader.on('error', () => {
      onCompletion(`tail: ${filePath}: No such file or directory`, emptyString);
    });
  };

  const reader = filePath
    ? () => readerStream(createReadStream(filePath), numOfLines, onCompletion)
    : () => readerStream(stdin, numOfLines, onCompletion);

  reader();
};

module.exports = {
  performTail
};
