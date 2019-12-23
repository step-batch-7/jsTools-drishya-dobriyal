const parseUserArgs = function(userArgs) {
  const filePath = userArgs[1];
  return { filePath };
};

const readContent = function(reader, filePath) {
  return { fileContent: reader(filePath, "utf8") };
};

const sortContent = function(content) {
  return content
    .split("\n")
    .slice(-10)
    .join("\n");
};

const tailFunction = function(userArgs, fileOperation) {
  const parsedArgs = parseUserArgs(userArgs);
  const filePath = parsedArgs.filePath;
  if (!fileOperation.isFilePresent(filePath)) {
    return { errorOccured: `tail: ${filePath}: No such file or directory` };
  }
  const content = readContent(fileOperation.reader, filePath);
  return { sortedContent: sortContent(content.fileContent) };
};

module.exports = {
  parseUserArgs,
  readContent,
  sortContent,
  tailFunction
};
