const parseUserArgs = function(userArgs) {
  const filePath = userArgs[1];
  return { filePath };
};

const readContent = function(reader, filePath) {
  return reader(filePath);
};

const tail = function(userArgs) {
  const parsedArgs = parseUserArgs(userArgs);
};

module.exports = { parseUserArgs, readContent };
