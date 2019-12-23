const fs = function() {
  const fs = require("fs");
  const reader = fs.readFileSync;
  const isFilePresent = fs.existsSync;
  return { reader, isFilePresent };
};

const parseUserArgs = function(userArgs) {
  const filePath = userArgs[1];
  return { filePath };
};

const readContent = function(reader, isFilePresent, filePath) {
  if (!isFilePresent(filePath)) {
    return { error: `tail: ${filePath}: No such file or directory` };
  }
  return { fileContent: reader(filePath, "utf8") };
};

const sortContent = function(content) {
  return content
    .split("\n")
    .slice(-10)
    .join("\n");
};

const tail = function(userArgs) {
  const parsedArgs = parseUserArgs(userArgs);
  const filePath = parsedArgs.filePath;
  const content = readContent(fs().reader, fs().isFilePresent, filePath);
  const sortedContent = sortContent(content.fileContent);
  return sortedContent;
};

module.exports = { parseUserArgs, readContent, sortContent, tail };
