const parseUserArgs = function(userArgs) {
  const filePath = userArgs[1];
  return { filePath };
};

const readContent = function(reader, isFilePresent, filePath) {
  if (!isFilePresent(filePath)) {
    throw new Error(`tail: ${filePath}: No such file or directory`);
  }
  return { fileContent: reader(filePath, "utf8") };
};

const sortContent = function(content) {
  return content
    .split("\n")
    .slice(-10)
    .join("\n");
};

const tailFunction = function(userArgs, fs) {
  const parsedArgs = parseUserArgs(userArgs);
  const filePath = parsedArgs.filePath;
  const content = readContent(fs().reader, fs().isFilePresent, filePath);
  const sortedContent = sortContent(content.fileContent);
  return sortedContent;
};

module.exports = {
  parseUserArgs,
  readContent,
  sortContent,
  tail: tailFunction
};
