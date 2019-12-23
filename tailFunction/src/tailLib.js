const parseUserArgs = function(userArgs) {
  const upto = -10;
  if (userArgs.includes("-n")) {
    upto = userArgs[userArgs.indexOf("-n") + 1];
  }
  const filePath = userArgs[1];
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
  const parsedArgs = parseUserArgs(userArgs);
  const filePath = parsedArgs.filePath;
  if (!fileOperation.isFilePresent(filePath)) {
    return { errorOccured: `tail: ${filePath}: No such file or directory` };
  }
  const content = readContent(fileOperation.reader, filePath);
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
