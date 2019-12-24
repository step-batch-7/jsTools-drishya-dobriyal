const getCountValue = function(value) {
  if (value[0] == "-") return value.slice(1);
  return value;
};

const findError = function(userArgs, isFilePresent) {
  if (userArgs.includes("-n") && !Number.isInteger(+userArgs[2])) {
    illegalCount = getCountValue(userArgs[2]);
    return { errorOccured: `tail: illegal offset -- ${illegalCount}` };
  }
  if (userArgs.includes("-n") && !isFilePresent(userArgs[3]))
    return {
      errorOccured: `tail: ${userArgs[3]}: No such file or directory`
    };
  if (!userArgs.includes("-n") && !isFilePresent(userArgs[1])) {
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
    upto = -getCountValue(userArgs[2]);
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
  const content = readContent(fileOperation.reader, parsedArgs.filePath);
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
