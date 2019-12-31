const getStartingLineWithPlus = function(totalLength, givenLength) {
  if (givenLength === '+1' || givenLength === '+0') {
    return totalLength;
  }
  const stabilizeCountBy = 1;
  return totalLength - givenLength + stabilizeCountBy;
};

const parseStartingLine = function(totalLength, givenLength) {
  let startingLineFromEnd = givenLength;

  if (givenLength.includes('+')) {
    startingLineFromEnd = getStartingLineWithPlus(totalLength, givenLength);
  }
  if (givenLength.includes('-')) {
    startingLineFromEnd = -givenLength;
  }
  return +startingLineFromEnd;
};

const getLastNLines = function(content, numOfLines) {
  const arrayOfContent = content.split('\n');
  const eliminateCountFrom1 = 1;
  const lastIndex = arrayOfContent.length - eliminateCountFrom1;
  if (!arrayOfContent[lastIndex]) {
    arrayOfContent.pop();
  }
  const numOfLinesFromEnd = parseStartingLine(
    arrayOfContent.length,
    numOfLines
  );
  return arrayOfContent.slice(-numOfLinesFromEnd).join('\n');
};

module.exports = { getLastNLines };
