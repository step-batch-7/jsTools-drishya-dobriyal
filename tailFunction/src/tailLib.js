const parseUserArgs = function(userArgs) {
  let upto = -10;
  let filePath = userArgs[1];
  if (userArgs[1] == "-n") {
    upto = +userArgs[2];
    if (!Number.isInteger(upto))
      return { errorOccured: `tail: illegal offset -- $` };
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
  const parsedArgs = parseUserArgs(userArgs);
  if (parsedArgs.hasOwnProperty("errorOccured")) {
    return parsedArgs;
  }
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
