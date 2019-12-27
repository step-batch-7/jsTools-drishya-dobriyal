const isInteger = function(countOption) {
  return Number.isInteger(+countOption);
};

const isPairValid = function(firstTerm, secondTerm) {
  return firstTerm.includes("-n") && isInteger(secondTerm);
};

const parseUserArgs = function(userArgs) {
  const defaultOption = {
    filePath: userArgs.slice(-1).join(""),
    numOfLines: "-10",
    errorOccurred: ""
  };
  const [, optionFirst, optionSecond] = [...userArgs];
  if (!optionFirst.includes("-n")) {
    defaultOption.errorOccurred = null;
    return defaultOption;
  }

  defaultOption.numOfLines = optionFirst.slice(2) || optionSecond;
  if (isPairValid(optionFirst, defaultOption.numOfLines)) {
    defaultOption.errorOccurred = null;
    return defaultOption;
  }
  defaultOption.errorOccurred = `tail: illegal offset -- ${defaultOption.numOfLines}`;
  return defaultOption;
};

const readContent = function(reader, isFilePresent, filePath) {
  if (!isFilePresent(filePath))
    return {
      errorOccurred: `tail: ${filePath}: No such file or directory`
    };
  return { content: reader(filePath, "utf8") };
};

const sortContent = function(content, numOfLines) {
  return content
    .split("\n")
    .slice(numOfLines)
    .join("\n");
};

const performTail = function(userArgs, reader, isFilePresent) {
  const parsedArgs = parseUserArgs(userArgs);

  if (parsedArgs.errorOccurred)
    return { stream: "errorStream", content: parsedArgs.errorOccurred };

  const fileContent = readContent(reader, isFilePresent, parsedArgs.filePath);

  if (fileContent.errorOccurred)
    return { stream: "errorStream", content: fileContent.errorOccurred };

  return {
    stream: "outputStream",
    content: sortContent(fileContent.content, parsedArgs.numOfLines)
  };
};

module.exports = {
  parseUserArgs,
  readContent,
  sortContent,
  performTail
};
