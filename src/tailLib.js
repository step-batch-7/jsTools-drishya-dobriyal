const isInteger = function(countOption) {
  return Number.isInteger(+countOption);
};

const isPairValid = function(firstTerm, secondTerm) {
  return firstTerm == "-n" && isInteger(secondTerm);
};

const validOption = function(userArgs) {
  const isFirstOptionValid = isPairValid(
    userArgs[1].slice(0, 2),
    userArgs[1].slice(2)
  );
  return isFirstOptionValid;
};

const parseUserArgs = function(userArgs) {
  const defaultOption = {
    filePath: userArgs.slice(-1).join(""),
    numOfLines: "-10",
    errorOccurred: ""
  };

  userArgs.length === 2 && (defaultOption.errorOccurred = null);

  if (userArgs.length === 3) {
    defaultOption.numOfLines = userArgs[1].slice(2);
    validOption([...userArgs]) && (defaultOption.errorOccurred = null);
  }

  if (userArgs.length === 4) {
    defaultOption.numOfLines = userArgs[2];
    isPairValid(userArgs[1], userArgs[2]) &&
      (defaultOption.errorOccurred = null);
  }

  if (defaultOption.errorOccurred != null)
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
