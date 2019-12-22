const parseUserArgs = function(userArgs) {
  const filePath = userArgs[1];
  return { filePath };
};

const readContent = function(reader, filePresent, filePath) {
  if (!filePresent) return `tail: ${filePath}: No such file or directory`;
  return reader(filePath);
};

const tail = function(userArgs) {
  const parsedArgs = parseUserArgs(userArgs);
};

module.exports = { parseUserArgs, readContent };
