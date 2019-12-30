const isInteger = function(countOption) {
  return Number.isInteger(+countOption);
};

const isPairValid = function(firstTerm, secondTerm) {
  return firstTerm.includes('-n') && isInteger(secondTerm);
};

const getDefaultOption = function(userArgs) {
  const lastArgsFinder = -1;
  return {
    filePath: userArgs.slice(lastArgsFinder).join(''),
    numOfLines: '-10',
    errorOccurred: null
  };
};

const stringifyErrorOffset = function(illegalOffset) {
  return `tail: illegal offset -- ${illegalOffset}`;
};

const parseUserArgs = function(userArgs) {
  const currentOption = getDefaultOption(userArgs);
  const [optionFirst, optionSecond] = [...userArgs];

  if (!optionFirst.includes('-n')) {
    return currentOption;
  }

  const separateOffset = 2;
  currentOption.numOfLines = optionFirst.slice(separateOffset) || optionSecond;
  if (isPairValid(optionFirst, currentOption.numOfLines)) {
    return currentOption;
  }

  currentOption.errorOccurred = stringifyErrorOffset(currentOption.numOfLines);
  return currentOption;
};

module.exports = { parseUserArgs };
