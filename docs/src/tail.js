const fsUtility = function() {
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
  return { content: reader(filePath) };
};

const tail = function(userArgs) {
  const parsedArgs = parseUserArgs(userArgs);
  const content = readContent(reader, IsFilePresent, filePath);
};

module.exports = { parseUserArgs, readContent };
