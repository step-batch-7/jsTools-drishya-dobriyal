const getCountValue = function(value) {
  if (value[0] == "-") return value.slice(1);
  return value;
};

const parseUserArgs = function(userArgs) {
  let upto = -10;
  let filePath = userArgs[1];
  if (userArgs[1] == "-n") {
    upto = getCountValue(userArgs[2]);
    if (!Number.isInteger(+userArgs[2])) {
      return { errorOccured: `tail: illegal offset -- ${upto}` };
    }
    filePath = userArgs[3];
    upto = -upto;
  }
  return { filePath, upto };
};

const readContent = function(reader, isFilePresent, filePath) {
  if (!isFilePresent(filePath))
    return { errorOccured: `tail: ${filePath}: No such file or directory` };
  return { fileContent: reader(filePath, "utf8") };
};

const sortContent = function(content, upto) {
  return content
    .split("\n")
    .slice(upto)
    .join("\n");
};

const tailFunction = function(userArgs, fileOperation) {
  const parsedArgs = parseUserArgs(userArgs);
  if (parsedArgs.errorOccured) return parsedArgs;
  const content = readContent(
    fileOperation.reader,
    fileOperation.isFilePresent,
    parsedArgs.filePath
  );
  if (content.errorOccured) return content;
  return {
    sortedContent: sortContent(content.fileContent, parsedArgs.upto)
  };
};

module.exports = {
  parseUserArgs,
  readContent,
  sortContent,
  tailFunction
};
