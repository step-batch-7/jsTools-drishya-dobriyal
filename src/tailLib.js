const getCountValue = function(value) {
  const posibleValues = { "-": value.slice(1) };
  return posibleValues[value[0]] || value;
};

const parseUserArgs = function(userArgs) {
  let upto = -10;
  let filePath = userArgs[1];
  if (userArgs[1] == "-n") {
    upto = getCountValue(userArgs[2]);
    if (!Number.isInteger(+userArgs[2])) {
      return {
        errorOccured: `tail: illegal offset -- ${upto}`,
        displayer: console.error
      };
    }
    filePath = userArgs[3];
    upto = -upto;
  }
  return { filePath, upto };
};

const readContent = function(reader, isFilePresent, filePath) {
  if (!isFilePresent(filePath))
    return {
      errorOccured: `tail: ${filePath}: No such file or directory`,
      displayer: console.error
    };
  return { content: reader(filePath, "utf8") };
};

const sortContent = function(content, upto) {
  return content
    .split("\n")
    .slice(upto)
    .join("\n");
};

const tailFunction = function(userArgs, fileOperation) {
  const parsedArgs = parseUserArgs(userArgs);
  if (parsedArgs.errorOccured)
    return { displayer: console.error, content: parsedArgs.errorOccured };
  const fileContent = readContent(
    fileOperation.reader,
    fileOperation.isFilePresent,
    parsedArgs.filePath
  );
  if (fileContent.errorOccured)
    return { displayer: console.error, content: fileContent.errorOccured };
  return {
    displayer: console.log,
    content: sortContent(fileContent.content, parsedArgs.upto)
  };
};

module.exports = {
  parseUserArgs,
  readContent,
  sortContent,
  tailFunction,
  getCountValue
};
