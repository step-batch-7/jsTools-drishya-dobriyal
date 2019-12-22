const parseUserArgs = function(userArgs) {
  const filePath = userArgs[1];
  return { filePath };
};

const tail = function(userArgs) {
  const parsedArgs = parseUserArgs(userArgs);
};

exports.parseUserArgs = parseUserArgs;
