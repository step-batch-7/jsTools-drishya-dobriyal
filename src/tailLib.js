const isInteger = function(countOption) {
  return Number.isInteger(+countOption);
};

const isPairValid = function(firstTerm, secondTerm) {
  return firstTerm.includes("-n") && isInteger(secondTerm);
};

const getDefaultOption = function(userArgs) {
  return {
    filePath: userArgs.slice(-1).join(""),
    numOfLines: "-10",
    errorOccurred: ""
  };
};

const parseUserArgs = function(userArgs) {
  const currentOption = getDefaultOption(userArgs);
  const [, optionFirst, optionSecond] = [...userArgs];

  if (!optionFirst.includes("-n")) {
    currentOption.errorOccurred = null;
    return currentOption;
  }

  currentOption.numOfLines = optionFirst.slice(2) || optionSecond;
  if (isPairValid(optionFirst, currentOption.numOfLines)) {
    currentOption.errorOccurred = null;
    return currentOption;
  }

  currentOption.errorOccurred = `tail: illegal offset -- ${currentOption.numOfLines}`;
  return currentOption;
};

const readContent = function(reader, isFilePresent, filePath) {
  if (!isFilePresent(filePath))
    return {
      errorOccurred: `tail: ${filePath}: No such file or directory`
    };
  return { content: reader(filePath, "utf8") };
};

const parseStartingLine = function(totalLength, givenLength) {
  let startingLine = givenLength;
  givenLength.includes("+") && (startingLine = totalLength - givenLength);
  givenLength.includes("-") && (startingLine = givenLength.slice(1));
  (givenLength == "+1" || givenLength == "+0") && (startingLine = totalLength);
  return startingLine;
};

const sortContent = function(content, numOfLines) {
  const arrayOfContent = content.split("\n");
  const startingLine = parseStartingLine(arrayOfContent.length, numOfLines);
  return arrayOfContent.slice(-startingLine).join("\n");
};

const performTail = function(userArgs, reader, isFilePresent) {
  const errorStream = "errorStream";

  const parsedArgs = parseUserArgs(userArgs);
  if (parsedArgs.errorOccurred)
    return { outputStreamName: errorStream, content: parsedArgs.errorOccurred };

  const fileContent = readContent(reader, isFilePresent, parsedArgs.filePath);
  if (fileContent.errorOccurred)
    return {
      outputStreamName: errorStream,
      content: fileContent.errorOccurred
    };

  return {
    outputStreamName: "outputStream",
    content: sortContent(fileContent.content, parsedArgs.numOfLines)
  };
};

module.exports = {
  parseUserArgs,
  readContent,
  sortContent,
  performTail
};
