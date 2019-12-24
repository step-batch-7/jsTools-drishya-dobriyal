const findError = function(userArgs, isFilePresent) {
  if (userArgs.includes("-n")) {
    if (!Number.isInteger(+userArgs[2])) {
      userArgs[2][0].includes("-")
        ? (illegalCount = userArgs[2].slice(1))
        : (illegalCount = userArgs[2]);
      return { errorOccured: `tail: illegal offset -- ${illegalCount}` };
    }
    if (isFilePresent(userArgs[3])) {
      return {};
    }
    return {
      errorOccured: `tail: ${userArgs[3]}: No such file or directory`
    };
  }
  if (!isFilePresent(userArgs[1])) {
    return {
      errorOccured: `tail: ${userArgs[1]}: No such file or directory`
    };
  }
  return {};
};

const parseUserArgs = function(userArgs) {
  let upto = -10;
  let filePath = userArgs[1];
  if (userArgs[1] == "-n") {
    userArgs[2].includes("-") ? (upto = +userArgs[2]) : (upto = -+userArgs[2]);
    filePath = userArgs[3];
  }
  return { filePath, upto };
};

const readContent = function(reader, filePath) {
  return { fileContent: reader(filePath, "utf8") };
};

const sortContent = function(content, upto) {
  return content
    .split("\n")
    .slice(upto)
    .join("\n");
};

const tailFunction = function(userArgs, fileOperation) {
  const stateError = findError(userArgs, fileOperation.isFilePresent);
  if (stateError.hasOwnProperty("errorOccured")) return stateError;
  const parsedArgs = parseUserArgs(userArgs);
  const filePath = parsedArgs.filePath;
  const content = readContent(fileOperation.reader, filePath);
  return {
    sortedContent: sortContent(content.fileContent, parsedArgs.upto)
  };
};

module.exports = {
  parseUserArgs,
  readContent,
  sortContent,
  tailFunction,
  findError
};
