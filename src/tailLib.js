const isInteger = function(countOption) {
  return Number.isInteger(+countOption);
};

const isPairValid = function(firstTerm, secondTerm) {
  return firstTerm.includes('-n') && isInteger(secondTerm);
};

const getDefaultOption = function(userArgs) {
  const lastArgsFinder = -1;
  return {
    filePath: userArgs.slice(lastArgsFinder).join(''),
    numOfLines: '-10',
    errorOccurred: null
  };
};

const stringifyErrorOffset = function(illegalOffset) {
  return `tail: illegal offset -- ${illegalOffset}`;
};

const parseUserArgs = function(userArgs) {
  const currentOption = getDefaultOption(userArgs);
  const [, optionFirst, optionSecond] = [...userArgs];

  if (!optionFirst.includes('-n')) {
    return currentOption;
  }

  const separateNumber = 2;
  currentOption.numOfLines = optionFirst.slice(separateNumber) || optionSecond;
  if (isPairValid(optionFirst, currentOption.numOfLines)) {
    return currentOption;
  }

  currentOption.errorOccurred = stringifyErrorOffset(currentOption.numOfLines);
  return currentOption;
};

const readContent = function(reader, isFilePresent, filePath) {
  if (!isFilePresent(filePath)) {
    return {
      errorOccurred: `tail: ${filePath}: No such file or directory`
    };
  }
  return { content: reader(filePath, 'utf8') };
};

const getStartingLineWithPlus = function(totalLength, givenLength) {
  if (givenLength === '+1' || givenLength === '+0') {
    return totalLength;
  }
  const toAddUpperMostLine = 1;
  return totalLength + toAddUpperMostLine - givenLength;
};

const parseStartingLine = function(totalLength, givenLength) {
  let startingLine = givenLength;

  if (givenLength.includes('+')) {
    startingLine = getStartingLineWithPlus(totalLength, givenLength);
  }
  if (givenLength.includes('-')) {
    startingLine = -givenLength;
  }

  return startingLine;
};

const sortContent = function(content, numOfLines) {
  const arrayOfContent = content.split('\n');
  const startingLine = parseStartingLine(arrayOfContent.length, numOfLines);
  return arrayOfContent.slice(-startingLine).join('\n');
};

const generateErrorObject = function(errorType) {
  return { outputStreamName: 'errorStream', content: errorType };
};

const performTail = function(userArgs, reader, isFilePresent) {
  const parsedArgs = parseUserArgs(userArgs);
  if (parsedArgs.errorOccurred) {
    return generateErrorObject(parsedArgs.errorOccurred);
  }

  const fileContent = readContent(reader, isFilePresent, parsedArgs.filePath);
  if (fileContent.errorOccurred) {
    return generateErrorObject(fileContent.errorOccurred);
  }

  return {
    outputStreamName: 'outputStream',
    content: sortContent(fileContent.content, parsedArgs.numOfLines)
  };
};

module.exports = {
  parseUserArgs,
  readContent,
  sortContent,
  performTail
};
